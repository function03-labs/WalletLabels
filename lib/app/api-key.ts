"use server"

import { ApiKey } from "@prisma/client"

import { prisma } from "@/lib/prisma"

import { ApiKey as AwsApiKey } from "@/types/api"

export async function getApiKey(id: string): Promise<ApiKey> {
  return (await prisma.apiKey.findUnique({
    where: {
      id,
    },
  })) as ApiKey
}

export async function getApiKeys(userId: string): Promise<ApiKey[]> {
  return await prisma.apiKey.findMany({
    where: {
      userId,
    },
  })
}

export async function createApiKey(
  data: AwsApiKey,
  userId: string
): Promise<ApiKey> {
  const keys = await getApiKeys(userId)
  if (keys.length >= 3) {
    throw new Error("You can only have 3 API keys")
  }

  return await prisma.apiKey.create({
    data: {
      id: data.id,
      key: data.key,
      name: data.name,
      chains: data.chains,
      userId,
    },
  })
}

export async function deleteApiKey(
  id: string,
  userId: string
): Promise<ApiKey> {
  return await prisma.apiKey.delete({
    where: {
      id,
      userId,
    },
  })
}

export async function updateApiKey(
  data: AwsApiKey,
  userId: string
): Promise<ApiKey> {
  return await prisma.apiKey.update({
    where: {
      id: data.id,
      userId,
    },
    data: {
      name: data.name,
    },
  })
}
