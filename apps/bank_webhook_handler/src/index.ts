import express, { json, Request, Response } from "express";
import { prisma } from "@repo/db/client";
import { webhookSchema } from "./schema/webHookSchema";
const port = 3001;
const app = express();
app.use(json());

app.post("/webhook", async (req: Request, res: Response) => {
  const body = webhookSchema.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({
      success: false,
      message:
        "Validation error: " +
        body.error.errors.map((err) => `${err.path[0]} ${err.message}`),
    });
    return;
  }
  const { token, userIdentifier, amount } = body.data;
  //todo: use schema for body data validation
  //todo: only do if status is processing

  //transactions either both happen or none of them happen
  try {
    const transaction = await prisma.onRampTransaction.findFirst({
      where: {
        token: token,
      },
    });
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    if (transaction?.status === "SUCCESS") {
      res.status(400).json({
        message: "Transaction already processed",
      });
      return;
    }
    await prisma.$transaction([
      prisma.balance.upsert({
        create: {
          userId: Number(userIdentifier),
          amount: transaction?.amount || 0,
          locked: 0,
        },
        where: { userId: Number(userIdentifier) },
        update: {
          amount: {
            increment: Number(transaction.amount),
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: { token },
        data: {
          status: "SUCCESS",
        },
      }),
    ]);
    res.status(200).json({
      message: "Payment captured",
    });
    //if status 200 is not sent to bank than bank will refund the money to user
  } catch (error) {
    console.error("Error processing webhook:", error);
    await prisma.onRampTransaction.update({
      where: { token },
      data: {
        status: "FAILURE",
      },
    });
    res.status(500).json({
      message: "Error while processing webhook ",
      error: (error as Error).message,
    });
  }
  return;
});

app.listen(port, () => console.log(`Server running on port ${port}`));
