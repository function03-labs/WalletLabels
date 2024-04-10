import { env } from "@/env.mjs"
import { IronSessionOptions } from "iron-session"
import type { SiweMessage } from "siwe"

import { siteConfig } from "@/config/site"

declare module "iron-session" {
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
    isAdmin: boolean
  }
}

export const NEXTAUTH_SECRET = env.NEXTAUTH_SECRET

export const SERVER_SESSION_SETTINGS: IronSessionOptions = {
  cookieName: siteConfig.name,
  password:
    NEXTAUTH_SECRET ?? "UPDATE_TO_complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV == "production",
  },
}
