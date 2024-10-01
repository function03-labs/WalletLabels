import { env } from "@/env.mjs"
import { getIronSession } from "iron-session"
import { SiweMessage } from "siwe"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"
import { createAirwallexCustomer } from "@/integrations/airwallex" // Import the Airwallex function

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
      const user = await createUser(fields); // Use the createUser function

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

const createUser = async (fields: SiweMessage) => {
  if (env.DATABASE_URL_SUPABASE) {
    try {
      // Create Airwallex customer 
      const airwallexCustomer = await createAirwallexCustomer(fields.address);

      const user = await prisma.user.upsert({
        where: { id: fields.address },
        update: {
          id: fields.address,
          airwallexCustomerId: airwallexCustomer.id,
        },
        create: {
          id: fields.address,
          name: `user-${fields.address.slice(0, 6)}`,
          organizationSlug: null,
          avatar: `https://avatars.jakerunzer.com/${fields.address}`,
          airwallexCustomerId: airwallexCustomer.id,
        },
        include: { apiKeys: true },
      });

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};
