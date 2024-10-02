import { env } from "@/env.mjs"
import { getIronSession } from "iron-session"
import { SiweMessage } from "siwe"
import { z } from "zod"

import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"
import { getUser, updateUser, createUser } from '@/lib/app/user-profile'
import { createAirwallexCustomer } from "@/integrations/airwallex"

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
      const user = await handleUserCreation(fields.address, `user-${fields.address.slice(0, 6)}`, null);

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

async function handleUserCreation(address: string, name: string, email: string | null) {
  try {
    let user = await getUser(address);

    // If user exists, check for Airwallex customer ID
    if (user) {
      if (!user.airwallexCustomerId) {
        // User exists but doesn't have an Airwallex customer ID, create one
        const airwallexCustomer = await createAirwallexCustomer(address);
        user = await updateUser(address, { airwallexCustomerId: airwallexCustomer.id });
      }
    } else {
      // User doesn't exist, create new user and Airwallex customer
      const airwallexCustomer = await createAirwallexCustomer(address);
      user = await createUser({
        id: address,
        name,
        email,
        avatar: `https://avatars.jakerunzer.com/${address}`,
        airwallexCustomerId: airwallexCustomer.id,
        organizationSlug: null,
      });
    }

    return user;
  } catch (error) {
    console.error('Error in handleUserCreation:', error);
    throw error;
  }
}