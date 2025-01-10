import { Request, Response } from "express";
import { prisma, User } from "@repo/db/client";

import { onRampSchema } from "../schemas/onRampSchema";
export const onRampTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = Math.random().toString(); //simulating token from bank
    const parsedBody = onRampSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        success: false,
        message:
          "Validation error: " +
          parsedBody.error.errors.map((err) => `${err.path[0]} ${err.message}`),
      });
      return;
    }
    const { amount, provider } = parsedBody.data;
    await prisma.onRampTransaction.create({
      data: {
        userId: Number((req.user as User).id),
        status: "PROCESSING",
        startTime: new Date(),
        token,
        provider,
        amount: amount * 100,
      },
    });
    res.status(200).json({
      success: true,
      message: "onramp transaction added successfully",
    });
    return;
  } catch (error: unknown | any) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
    return;
  }
};
