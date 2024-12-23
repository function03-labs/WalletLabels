import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({
        isLoggedIn: false,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  return new Response(
    JSON.stringify({
      user,
      isLoggedIn: true,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  )
}
