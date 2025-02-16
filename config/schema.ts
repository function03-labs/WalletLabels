import { z } from "zod"

export const AccountFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Please enter a valid email address"),
  organizationSlug: z.string().min(2).max(50),
})

export const ApiKeySchema = z.object({
  name: z.string().min(2).max(50),
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

export const uploadFileSchema = z.object({
  files: z
    .array(
      z.any().refine((file) => file.size < 25 * 1024 * 1024, {
        message: "File size must be less than 25MB",
      })
    )
    .max(1, {
      message: "Only one file can be uploaded",
    }),
})

export const communityLabelSchema = z.object({
  address: z.string().or(z.string().array()).optional(),
  labelType: z.string().or(z.string().array()).optional(),
  addressName: z.string().or(z.string().array()).optional(),
  labelSubType: z.string().or(z.string().array()).optional(),
  label: z.string().or(z.string().array()).optional(),
})

export type LabelSchema = z.infer<typeof communityLabelSchema>
