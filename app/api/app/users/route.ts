import { env } from "@/env.mjs"

import { prisma } from "@/lib/prisma"

export type Users = Awaited<ReturnType<typeof prisma.user.findMany>>

export async function GET(req: Request) {
  try {
    let users: Users = []
    if (env.DATABASE_URL) {
      users = await prisma.user.findMany()
    }
    return new Response(JSON.stringify({ users, object: "Users" }))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(errorMessage, { status: 500 })
  }
}
