import { cookies } from "next/headers"
import { env } from "@/env.mjs"
import { User } from "@prisma/client"
import { getIronSession, SessionOptions } from "iron-session"
import { getSession as getNextAuthSession } from "next-auth/react"

import { siteConfig } from "@/config/site"

declare module "iron-session" {
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
    user: User
  }
}

export interface SessionData {
  nonce: string
  siwe: SiweMessage
  user: User
}

export const NEXTAUTH_SECRET = env.NEXTAUTH_SECRET

export const SERVER_SESSION_SETTINGS: SessionOptions = {
  cookieName: siteConfig.name,
  password:
    NEXTAUTH_SECRET ?? "UPDATE_TO_complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: env.NODE_ENV == "production",
  },
}

export async function getSession() {
  const session = await getNextAuthSession()
  if (session) {
    return session
  }

  const ironSession = await getIronSession<SessionData>(
    cookies(),
    SERVER_SESSION_SETTINGS
  )

  return ironSession
}
