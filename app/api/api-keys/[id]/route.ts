import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    console.log("🚀 ~ session:", session)

    if (!session?.user?.email) {
      console.log("🚀 ~ session?.user?.email:", session?.user?.email)
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if the API key exists and belongs to the user
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: params.id },
    })

    if (!apiKey) {
      return NextResponse.json(
        { message: "API key not found" },
        { status: 404 }
      )
    }

    if (apiKey.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      )
    }

    // Delete the API key
    await prisma.apiKey.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "API key deleted" })
  } catch (error) {
    console.error("Error deleting API key:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 