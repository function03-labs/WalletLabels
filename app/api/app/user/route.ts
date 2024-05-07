import { getIronSession } from "iron-session"

import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"

export async function GET(req: Request) {
  const res = new Response()
  const session = await getIronSession<SessionData>(
    req,
    res,
    SERVER_SESSION_SETTINGS
  )
  if (session.siwe) {
    return new Response(
      JSON.stringify({
        address: session.siwe.address,
        isLoggedIn: true,
        user: session.user,
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
