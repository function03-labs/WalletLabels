"use server"

import { cookies } from "next/headers"
import { User } from "@prisma/client"
import { getIronSession } from "iron-session"

import { prisma } from "@/lib/prisma"
import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"

export async function Logout() {
  const session = await getIronSession<SessionData>(
    cookies(),
    SERVER_SESSION_SETTINGS
  )
  session.destroy()
}

export async function updateUser(
  userId: string,
  data: Partial<User>
): Promise<User> {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  })
}

export async function deleteUser(userId: string): Promise<User> {
  await Logout()

  await prisma.apiKey.deleteMany({
    where: {
      userId,
    },
  })

  return await prisma.user.delete({
    where: {
      id: userId,
    },
  })
}

export async function getUser(userId: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) {
    throw new Error("User not found")
  }
  return user
}
