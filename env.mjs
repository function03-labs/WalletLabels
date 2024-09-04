import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    NEXTAUTH_SECRET: z.string().min(32),
    DATABASE_URL_SUPABASE: z.string().url(),
    DATABASE_URL_ACCELERATE: z.string().url(),
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_REGION: z.string().min(1),
    AWS_INVOKE_URL: z.string().url(),
    ORIGIN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_PROD_NETWORKS_DEV: z.enum(["true", "false"]),
    NEXT_PUBLIC_USE_PUBLIC_PROVIDER: z.enum(["true", "false"]),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_HOST: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_PORT: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_PROTOCOL: z.enum(["http", "https"]),
    NEXT_PUBLIC_TYPESENSE_HOST_ETH: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_PORT_ETH: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_PROTOCOL_ETH: z.enum(["http", "https"]),
    NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL_SUPABASE: process.env.DATABASE_URL_SUPABASE,
    DATABASE_URL_ACCELERATE: process.env.DATABASE_URL_ACCELERATE,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_INVOKE_URL: process.env.AWS_INVOKE_URL,
    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PROD_NETWORKS_DEV: process.env.NEXT_PUBLIC_PROD_NETWORKS_DEV,
    NEXT_PUBLIC_USE_PUBLIC_PROVIDER:
      process.env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_TYPESENSE_HOST: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
    NEXT_PUBLIC_TYPESENSE_PORT: process.env.NEXT_PUBLIC_TYPESENSE_PORT,
    NEXT_PUBLIC_TYPESENSE_PROTOCOL: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
    NEXT_PUBLIC_TYPESENSE_HOST_ETH: process.env.NEXT_PUBLIC_TYPESENSE_HOST_ETH,
    NEXT_PUBLIC_TYPESENSE_PORT_ETH: process.env.NEXT_PUBLIC_TYPESENSE_PORT_ETH,
    NEXT_PUBLIC_TYPESENSE_PROTOCOL_ETH:
      process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL_ETH,
    NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY:
      process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY,
    ORIGIN: process.env.ORIGIN,
  },
})
