import { getIronSession } from "iron-session"

import { prisma } from "@/lib/prisma"
import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"

export async function GET(req: Request) {
  const res = new Response()
  const session = await getIronSession<SessionData>(
    req,
    res,
    SERVER_SESSION_SETTINGS
  )
  const user = await prisma.user.findUnique({
    where: { id: session.siwe.address },
  })

  if (user) {
    return new Response(
      JSON.stringify({
        user,
        isLoggedIn: true,
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
