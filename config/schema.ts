import { z } from "zod"

export const AccountFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().optional(),
  organizationSlug: z.string().min(2).max(50),
})

export const ApiKeySchema = z.object({
  name: z.string().min(2).max(50),
  chain: z.array(z.string()).nonempty("Please select at least one chain"),
})

export const TableApiKeysSchema = z.object({
  name: z.string().min(2).max(50),
})

export const addressLabelSchema = z.object({
  blockchain: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  addressName: z.string().min(2).max(50),
  labelType: z.string().min(2).max(50),
  labelSubType: z.string().min(2).max(50),
  label: z.string().min(2).max(50),
})
