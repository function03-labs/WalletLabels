import {
  APIGatewayClient,
  GetApiKeyCommand,
  UpdateApiKeyCommand,
  DeleteApiKeyCommand,
  CreateUsagePlanKeyCommand,
  DeleteUsagePlanKeyCommand,
  APIGatewayClientConfig,
} from "@aws-sdk/client-api-gateway";
import { NextApiRequest, NextApiResponse } from 'next';


const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as APIGatewayClientConfig;
const client = new APIGatewayClient(config);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const {
  query: { apiKeyId },
  method,
} = req;

switch (method) {
  case 'PATCH': 
  try {
    const { newName } = req.body; 
    if (!newName) {
      return res.status(400).json({ message: "New name is required" });
    }

    const updateApiKeyCommand = new UpdateApiKeyCommand({
      apiKey: apiKeyId as string,
      patchOperations: [
        {
          op: 'replace',
          path: '/name',
          value: newName,
        },
      ],
    });

    const updateResponse = await client.send(updateApiKeyCommand);
    console.log(updateResponse);
    res.status(200).json({ message: "API key name updated successfully", details: updateResponse });
  } catch (error: any) {
    if (error.name === 'NotFoundException') {
      res.status(404).json({ message: "API Key not found", error: error.message });
    } else {
      console.error("Error updating API key name:", error);
      res.status(500).json({ message: "Failed to update API key name", error: error.message });
    }
  }
  break;
  case 'GET':
    try {
      const getApiKeyCommand = new GetApiKeyCommand({ apiKey: apiKeyId as string, includeValue: true });
      const apiKeyDetails = await client.send(getApiKeyCommand);
      // apiKeyDetails.value = randomizeMiddle(apiKeyDetails.value); // return randomized API key value
      res.status(200).json(apiKeyDetails);
    } catch (error: any) {
      if (error.name === 'NotFoundException') {
        res.status(404).json({ message: "API Key not found", error: error.message });
      } else {
        console.error("Error retrieving API key:", error);
        res.status(500).json({ message: "Failed to retrieve API key", error: error.message });
      }
    }
    break;

    case 'PUT':
      try {
        const { newUsagePlanId, currentUsagePlanId } = req.body;

        // Optionally, remove the API key from its current usage plan
        // This step assumes you know the currentUsagePlanId and that the API key is attached to it
        if (currentUsagePlanId) {
          const deleteUsagePlanKeyCommand = new DeleteUsagePlanKeyCommand({
            usagePlanId: currentUsagePlanId,
            keyId: apiKeyId as string,
          });
          await client.send(deleteUsagePlanKeyCommand);
        }
        

        // Add the API key to the new usage plan
        const createUsagePlanKeyCommand = new CreateUsagePlanKeyCommand({
          usagePlanId: newUsagePlanId,
          keyId: apiKeyId as string,
          keyType: "API_KEY",
        });
        const usagePlanKeyResponse = await client.send(createUsagePlanKeyCommand);

        res.status(200).json({ message: "API key usage plan updated successfully", details: usagePlanKeyResponse });
      } catch (error: any) {
        console.error("Error updating API key:", error);
        if (error.name === 'NotFoundException') {
          res.status(404).json({ message: "API Key or Usage Plan not found", error: error.message });
        } else {
          res.status(500).json({ message: "Failed to update API key", error: error.message });
        }
      }
      break;

  case 'DELETE':
    try {
      const deleteApiKeyCommand = new DeleteApiKeyCommand({ apiKey: apiKeyId as string });
      const deleteResp = await client.send(deleteApiKeyCommand);
      console.log(deleteResp)
      res.status(204).json( {message:'The Key has been sucessfully deleted'});
    } catch (error: any) {
      if (error.name === 'NotFoundException') {
        res.status(404).json({ message: "API Key not found", error: error.message });
      } else {
        console.error("Error deleting API key:", error);
        res.status(500).json({ message: "Failed to delete API key", error: error.message });
      }
    }
    break;

  default:
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
}
