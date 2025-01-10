import express, { json, Request, Response } from "express";
import { prisma } from "@repo/db/client";
const port = 3001;
const app = express();
app.use(json());

app.post("/webhook", async (req: Request, res: Response) => {
  const { token, userIdentifier, amount } = req.body;
  //todo: use schema for body data validation
  const paymentInformation = {
    token: token,
    userId: userIdentifier,
    amount: amount,
  };
  //transactions either both happen or none of them happen
  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: Number(paymentInformation.userId) },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: { token: paymentInformation.token },
        data: {
          status: "SUCCESS",
        },
      }),
    ]);
    res.status(200).json({
      message: "payment captured",
    });
    //if status 200 is not sent to bank than bank will refund the money to user
  } catch (error) {
    console.log(error);
    await prisma.onRampTransaction.update({
      where: { token: paymentInformation.token },
      data: {
        status: "FAILURE",
      },
    });
    res.status(411).json({
      message: "Error while processing webhook ",
    });
  }
  return;
});

app.listen(port, () => console.log(`Server running on port ${port}`));
