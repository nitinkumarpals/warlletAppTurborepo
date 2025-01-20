import { prisma, User } from "@repo/db/client";
import { Request, Response } from "express";
import { p2pSchema } from "../schemas/p2pSchema";

export const p2pTransfer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedBody = p2pSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        success: false,
        message:
          "Validation error: " +
          parsedBody.error.errors.map((err) => `${err.path[0]} ${err.message}`),
      });
      return;
    }
    const { to } = parsedBody.data;
    const amount = parsedBody.data.amount * 100;
    const from = (req.user as User).id;
    const toUser = await prisma.user.findFirst({
      where: {
        email: to,
      },
    });
    if (!toUser) {
      res.status(404).json({
        success: false,
        message: "Recipient user not found",
      });
      return;
    }
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
      const fromBalance = await tx.balance.findFirst({
        where: {
          userId: from,
        },
      });
      console.log("before sleep");
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("after sleep");
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient balance");
      }
      await tx.balance.update({
        where: { userId: from },
        data: { amount: { decrement: amount } },
      });
      await tx.balance.update({
        where: { userId: toUser?.id },
        data: { amount: { increment: amount } },
      });
      await tx.p2pTransfer.create({
        data: {
          amount: amount,
          timestamp: new Date(),
          fromUserId: from,
          toUserId: toUser?.id ?? 0,
        },
      });
    });
    res.status(200).json({
      success: true,
      message: "Transfer completed successfully",
      transfer: {
        amount,
        from,
        to: toUser?.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
