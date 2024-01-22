import { NextApiRequest, NextApiResponse } from "next"
import { Db } from "mongodb"

import { Label, QueryParameters } from "@/types/label"
import { connectToDatabase } from "@/lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { address, limit } = parseQueryParameters(req.query)

  try {
    const db = await getDatabaseConnection()
    const labels = await fetchLabels(db, address, limit)
    res.status(200).json({ data: labels })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

function parseQueryParameters(query: any): QueryParameters {
  const address = query.address || ""
  let limit = parseInt(query.limit, 10) || 20
  limit = limit > 100 ? 100 : limit
  return { address, limit }
}

async function getDatabaseConnection(): Promise<Db> {
  try {
    const database = await connectToDatabase()
    return database.db
  } catch (error) {
    console.error(error)
    throw new Error("Unable to connect to database")
  }
}

async function fetchLabels(
  db: Db,
  address: string,
  limit: number
): Promise<Label[]> {
  const clc_name = process.env.CLC_NAME_WLBLS_SOLOSTAKERS
  const query = address ? { address } : {}
  const projection = {
    address_name: 1,
    label_type: 1,
    label_subtype: 1,
    address: 1,
    label: 1,
  }

  const cursor = db
    .collection(clc_name)
    .find(query, { projection })
    .collation({ locale: "en", strength: 1 })
    .limit(limit)

  const labels = await cursor.toArray()
  return labels.map((label: Label) => ({
    address: label.address,
    address_name: label.address_name,
    label_type: label.label_type,
    label_subtype: label.label_subtype,
    label: label.label,
  }))
}
