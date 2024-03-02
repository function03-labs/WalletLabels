// pages/api/users/[userId].ts

import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "../../../../../../packages/app-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Extract the userId from the query parameters
  const userId = req.query.userId as string

  // Validate that userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  try {
    const { data, error } = await supabase.auth.admin.getUserById(userId)
    console.log(data,error)

    if (error) {
      throw error
    }

    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(data.user.email)
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching user data',
      error: error.message,
    })
  }
}
