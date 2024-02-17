
import {
  APIGatewayClient,
  APIGatewayClientConfig,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand,
} from "@aws-sdk/client-api-gateway";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from 'next'
import { createCipheriv } from 'crypto';
import { supabase } from "../../../../../../packages/app-config/src";


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Ensure this is 32 bytes for AES-256-CBC
const IV = process.env.IV; // Ensure this is 16 bytes for AES-256-CBC

// Helper function to encrypt a message
function encrypt(text: string) {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is undefined')
  }

  if (!IV) {
    throw new Error('IV is undefined')
  }

  const cipher = createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(IV, "hex"),
  );
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}


// Updated request body schema
const requestBodySchema = z.object({
  usagePlanId: z.string().optional(),
  name: z.string(),
  orgId: z.number(),
  description: z.string().optional(),
  customerId: z.string().optional(),
  tags: z.record(z.string()).optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Validate request body
  let parsedBody;
  try {
    parsedBody = requestBodySchema.parse(req.body);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request body', error: error.errors });
  }

  // Destructure the validated body to extract all fields
  const { usagePlanId = "5qsdg9", name, description, customerId, tags } = parsedBody;

  const config = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  } as APIGatewayClientConfig;

  const client = new APIGatewayClient(config);

  try {
    // Create API Key with additional fields
    const apiKeyParams = {
      name,
      description,
      enabled: true,
      generateDistinctId: true,
      customerId,
      tags,
    };

    const createApiKeyCommand = new CreateApiKeyCommand(apiKeyParams);
    const apiKeyResponse = await client.send(createApiKeyCommand);

    if (!apiKeyResponse.id) {
      throw new Error("API key creation failed");
    }

    const { data: org } = await supabase
      .from('organizations')
      .select()
      .eq('id', req.user.orgId)

    // Associate API Key with Usage Plan
    const createUsagePlanKeyCommand = new CreateUsagePlanKeyCommand({
      keyId: apiKeyResponse.id,
      keyType: "API_KEY",
      usagePlanId: usagePlanId,
    });
    const usagePlanKeyResponse = await client.send(createUsagePlanKeyCommand);
    if (!usagePlanKeyResponse.id) {
      throw new Error("Usage plan key creation failed");
    }

    // Encrypt the API Key
    const encryptedApiKey = encrypt(apiKeyResponse.value);


    return res.status(200).json({
      message: "API key and usage plan key created successfully",
      apiKeyDetails: apiKeyResponse,
      usagePlanKeyDetails: usagePlanKeyResponse,
    });
  } catch (error) {
    console.error("Error:", error);

    // AWS SDK errors handling
    if (error.name === 'ResourceNotFoundException') {
      return res.status(404).json({ message: "Resource not found", error: error.message });
    }

    // General error handling
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
