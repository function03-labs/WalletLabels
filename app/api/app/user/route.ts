/* eslint-disable @typescript-eslint/no-unsafe-call */

import { getIronSession } from "iron-session"
import { getCurrentSubscription } from "@/lib/app/actions"
import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"

export async function GET(req: Request) {
  const res = new Response()
  const session = await getIronSession<SessionData>(
    req,
    res,
    SERVER_SESSION_SETTINGS
  )
  if (session.siwe) {
    const subscription = session.user?.id
      ? await getCurrentSubscription(session.user.id)
      : null

    return new Response(
      JSON.stringify({
        address: session.siwe.address,
        isLoggedIn: true,
        user: session.user,
        subscription
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } else {
    return new Response(
      JSON.stringify({
        isLoggedIn: false,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  }
}