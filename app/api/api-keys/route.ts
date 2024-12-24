import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

const createApiKeySchema = z.object({
  name: z.string().min(1),
})

// Get all API keys for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      apiKeys: apiKeys.map((key) => ({
        id: key.id,
        name: key.name,
        key: key.key,
        createdAt: key.createdAt,
      })),
    })
  } catch (error) {
    console.error("Error fetching API keys:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// Create a new API key
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log("🚀 ~ POST ~ session:", session)

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const json = await req.json()
    const body = createApiKeySchema.parse(json)

    // Generate a unique API key
    const apiKey = `sk_${uuidv4().replace(/-/g, "")}`

    const newKey = await prisma.apiKey.create({
      data: {
        key: apiKey,
        name: body.name,
        userId: session.user.id,
        chains: [], // Default empty chains array
      },
    })

    return NextResponse.json({
      apiKey: {
        id: newKey.id,
        name: newKey.name,
        key: newKey.key,
        createdAt: newKey.createdAt,
      },
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 422 }
      )
    }

    console.error("Error creating API key:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 