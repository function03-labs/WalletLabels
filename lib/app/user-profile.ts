"use server"
import { User } from "@prisma/client"
import { prisma } from "@/lib/prisma"


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
export async function createUser(data: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
  return await prisma.user.create({
    data,
  })
}