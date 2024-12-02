"use server"

import { cookies } from "next/headers"
import { Subscription, User } from "@prisma/client"
import { getIronSession } from "iron-session"

import { prisma } from "@/lib/prisma"
import { SERVER_SESSION_SETTINGS, SessionData } from "@/lib/session"
import { getCurrentSubscription } from "./actions"

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

export async function getUser(userId: string): Promise<User & { subscriptions?: Subscription[] }> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) {
    throw new Error("User not found")
  }

  const subscription = await getCurrentSubscription(userId)
  return {
    ...user,
    subscriptions: subscription ? [subscription] : []
  }
}

export async function createUser(data: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
  return await prisma.user.create({
    data,
  })
}