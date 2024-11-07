import { env } from "@/env.mjs"
import { getIronSession } from "iron-session"
import { SiweMessage } from "siwe"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"
import { getCurrentSubscription } from "@/lib/app/actions"


const verifySchema = z.object({
  signature: z.string(),
  message: z.object({
    domain: z.string(),
    address: z.string(),
    statement: z.string(),
    uri: z.string(),
    version: z.string(),
    chainId: z.number(),
    nonce: z.string(),
    issuedAt: z.string(),
  }),
})

export async function POST(req: Request) {
  try {
    const res = new Response(JSON.stringify({ ok: true }))
    const session = await getIronSession<SessionData>(
      req,
      res,
      SERVER_SESSION_SETTINGS
    )
    const { message, signature } = verifySchema.parse(await req.json())
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.validate(signature)
    if (fields.nonce !== session.nonce)
      return new Response(JSON.stringify({ message: "Invalid nonce." }), {
        status: 422,
      })
    session.siwe = fields
    await session.save()

    if (env.DATABASE_URL_SUPABASE) {
      const tempEmail = `${fields.address.toLowerCase()}@temporary.com`
      const user = await handleUserCreation(
        fields.address,
        `user-${fields.address.slice(0, 6)}`,
        tempEmail
      );

      if (user) {
        session.user = user
        await session.save()
      } else {
        throw new Error("User not found")
      }
    }

    return res
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return new Response(JSON.stringify({ ok: false }))
  }
}

async function handleUserCreation(address: string, name: string, email: string) {
  try {
    let user = await prisma.user.findUnique({ where: { id: address } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: address,
          name,
          email,
          avatar: `https://avatars.jakerunzer.com/${address}`,
        },
      });
    }

    return user;
  } catch (error) {
    console.error('Error in handleUserCreation:', {
      address,
      name,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}


