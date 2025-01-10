import { z } from "zod";
export const onRampSchema = z.object({
  amount: z.coerce.number().min(1,"Amount should not be less than 1"),
  provider: z.string().min(1,"Provider should have some value")
});
