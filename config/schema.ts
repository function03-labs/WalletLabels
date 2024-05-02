import { z } from "zod"

export const AccountFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
})

export const ApiKeySchema = z.object({
  name: z.string().min(2).max(50),
  chain: z.array(z.string()).nonempty("Please select at least one chain"),
})

export const TableApiKeysSchema = z.object({
  name: z.string().min(2).max(50),
})
