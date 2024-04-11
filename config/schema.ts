import { z } from "zod"

export const AccountFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
})
