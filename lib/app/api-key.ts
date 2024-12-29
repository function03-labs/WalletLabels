"use server"

import { env } from "@/env.mjs"
import { ApiKey } from "@prisma/client"
import { ApigeeClient } from "@/lib/utils/api"
import { prisma } from "@/lib/prisma"
import { ApiKeyRequest } from "@/lib/types/api"
import { getCurrentSubscription } from "./actions"
import { getUser } from "./user-profile"
import crypto from "crypto"

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
  data: ApiKeyRequest,
  userId: string,
  userEmail: string
): Promise<ApiKey> {
  const keys = await getApiKeys(userId)
  if (keys.length >= 3) {
    throw new Error("You can only have 3 API keys")
  }

  const user = await getUser(userId)

  // Map subscription to API Product
  let apiProduct
  const subscription = user?.id
    ? await getCurrentSubscription(user.id)
    : null

  if (subscription?.planId && subscription?.planId in [1, 2, 3]) {
    apiProduct = 'basic-tier-product'
  } else if (subscription?.planId && subscription?.planId in [4, 5, 6]) {
    apiProduct = 'pro-tier-product'
  } else if (subscription?.planId && subscription?.planId == 7) {
    apiProduct = 'enterprise-tier-product'
  }



  const apigee = new ApigeeClient(
    env.APIGEE_ORG_NAME,
    env.GOOGLE_SERVICE_ACCOUNT_KEY
  )

  try {
    // Try to get existing developer or create a new one
    let developer
    try {
      developer = await apigee.getDeveloper(userEmail)
    } catch (error: any) {
      if (error.message?.includes('PERMISSION_DENIED')) {
        throw new Error(`Service account lacks permissions for Apigee organization "${env.APIGEE_ORG_NAME}". Please ensure the service account has the "Apigee Developer Admin" role.`)
      }

      // If not found, create new developer
      try {
        developer = await apigee.createDeveloper({
          email: userEmail,
          firstName: userEmail.split('@')[0],
          lastName: 'User',
          userName: userEmail.split('@')[0],
          attributes: [
            { name: 'user_id', value: userId }
          ]
        })
      } catch (createError: any) {
        throw new Error(`Failed to create developer: ${createError.message}`)
      }
    }

    // Generate a unique ID first
    const uniqueId = crypto.randomUUID()
    const appName = uniqueId // Use the ID directly as the app name

    const app = await apigee.createDeveloperApp(
      developer.email,
      {
        name: appName,
        apiProducts: [apiProduct as string],
        keyExpiresIn: '-1',
        status: 'approved'
      },
    )

    if (!app.apiKey) {
      throw new Error("API key creation failed")
    }

    return await prisma.apiKey.create({
      data: {
        id: uniqueId,
        key: app.apiSecret,
        name: data.name,
        userId,
      },
    })
  } catch (error) {
    console.error('Error creating Apigee API key:', error)
    throw error instanceof Error ? error : new Error("Failed to create API key")
  }
}

export async function deleteApiKey(
  id: string,
  key: string,
  userId: string,
  userEmail: string
): Promise<ApiKey> {
  const apigee = new ApigeeClient(
    env.APIGEE_ORG_NAME,
    env.GOOGLE_SERVICE_ACCOUNT_KEY
  )
  try {

    await apigee.deleteDeveloperApp(userEmail, id)

    return await prisma.apiKey.delete({
      where: {
        id,
        userId,
      },
    })
  } catch (error) {
    console.error('Error deleting Apigee API key:', error)
    throw new Error("Failed to delete API key")
  }
}

export async function updateApiKey(
  data: ApiKeyRequest,
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
