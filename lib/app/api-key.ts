"use server"

import { env } from "@/env.mjs"
import { ApiKey } from "@prisma/client"
import { ApigeeClient } from "@/lib/utils/api"
import { prisma } from "@/lib/prisma"
import { ApiKeyRequest } from "@/lib/types/api"
import { getCurrentSubscription } from "./actions"
import { getUser } from "./user-profile"

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

  // Get user's subscription tier
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
      console.log("developer", developer)
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

    const appName = [data.name, userId].join('-')
    const app = await apigee.createDeveloperApp(
      developer.email,
      {
        name: appName,
        apiProducts: [apiProduct as string], // Ensure apiProduct is a string
        keyExpiresIn: '-1',
        status: 'approved'
      },
    )


    if (!app.apiKey) {
      throw new Error("API key creation failed")
    }

    // Store in database
    return await prisma.apiKey.create({
      data: {
        id: app.apiKey,
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
  const apigee = new ApigeeClient(env.APIGEE_ORG_NAME)

  try {
    // Get the API key to get its name
    const apiKey = await getApiKey(id)
    if (!apiKey) {
      throw new Error("API key not found")
    }

    const appName = [apiKey.name, userId].join('-')
    // Delete the app from Apigee
    await apigee.deleteDeveloperApp(userEmail, appName)

    // Delete the API key from the database
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
