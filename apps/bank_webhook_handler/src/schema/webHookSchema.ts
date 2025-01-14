import { z } from "zod";
export const webhookSchema = z.object({
  token: z.string().nonempty("Token is required"),
  userIdentifier: z.string().nonempty("User ID is required"),
  amount: z.number().positive("Amount must be a positive number"),
});
