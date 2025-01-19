import { PrismaClient, User, OnRampTransaction } from "@prisma/client";
export const prisma = new PrismaClient();
export type { User, OnRampTransaction };
