// pages/api/apiKeys/add.ts

import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../../packages/app-config";


const requestBodySchema = z.object({
    orgId: z.number(),
    apiKeys: z.array(z.string()).optional()
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  let parsedBody
  try {
    parsedBody = requestBodySchema.parse(req.body)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Invalid request body', error: error.errors })
  }
  const { apiKeys, orgId } = parsedBody

  try {
    const { data, error } = await supabase
      .from('organizations')
      .update({ api_keys: apiKeys })
      .eq('id', orgId)
      .select()
    if (error) {
      throw error
    }
    if (data.length === 0) {
      return res.status(404).json({ message: 'Organization not found' })
    }
    res.status(200).json({ message: 'API key added to the organization' })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding API key to Organization',
      error: error.message,
    })
  }
}




