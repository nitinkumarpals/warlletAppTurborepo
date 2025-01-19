import { z } from "zod";
export const p2pSchema = z.object({
  amount: z.coerce.number().min(1, "Amount should not be less than 1"),
  to: z.string(),
});
