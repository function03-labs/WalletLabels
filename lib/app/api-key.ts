"use server"

import { env } from "@/env.mjs"
import {
  APIGatewayClient,
  APIGatewayClientConfig,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand,
  DeleteApiKeyCommand,
} from "@aws-sdk/client-api-gateway"
import { ApiKey } from "@prisma/client"
import { z } from "zod"

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

  const config = {
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  } as APIGatewayClientConfig

  const client = new APIGatewayClient(config)

  const apiKeyParams = {
    name: data.name,
    description: data.name,
    enabled: true,
    generateDistinctId: true,
    customerId: data.id,
    tags: data.chains.reduce((acc, tag) => ({ ...acc, [tag]: tag }), {}),
  }

  const createApiKeyCommand = new CreateApiKeyCommand(apiKeyParams)
  const apiKeyResponse = await client.send(createApiKeyCommand)

  if (!apiKeyResponse.id) {
    throw new Error("API key creation failed")
  }

  const createUsagePlanKeyCommand = new CreateUsagePlanKeyCommand({
    keyId: apiKeyResponse.id,
    keyType: "API_KEY",
    usagePlanId: "5qsdg9",
  })

  const usagePlanKeyResponse = await client.send(createUsagePlanKeyCommand)
  if (!usagePlanKeyResponse.id) {
    throw new Error("Usage plan key creation failed")
  }

  return await prisma.apiKey.create({
    data: {
      id: data.id,
      key: usagePlanKeyResponse.value as string,
      name: data.name,
      chains: data.chains,
      userId,
    },
  })
}

export async function deleteApiKey(
  id: string,
  key: string,
  userId: string
): Promise<ApiKey> {
  // TODO; Delete the API key from AWS
  /*   const config = {
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  } as APIGatewayClientConfig

  const client = new APIGatewayClient(config)

  const deleteApiKeyCommand = new DeleteApiKeyCommand({ apiKey: key })
  const deleteResp = await client.send(deleteApiKeyCommand)
  console.log(deleteResp)

  if (deleteResp.$metadata.httpStatusCode !== 204) {
    throw new Error("API key deletion failed")
  }

  console.log(deleteResp) */

  // Delete the API key from the database
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
