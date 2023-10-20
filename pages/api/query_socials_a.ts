import { NextApiRequest, NextApiResponse } from "next"

import middlewares from "@/lib/rateLimits"
import { connectToDatabase } from "../lib/mongodb_social"

interface Label {
  _id: string
  id: string
  name: string
  ens: string
  handle: string
  followers: number
  verified: boolean
  updated: string
  pfp: string
}

interface Response {
  data: Label[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | { message: string }>
) {
  // try {
  //   await Promise.all(middlewares.map((middleware) => middleware(req, res)))
  // } catch {
  //   return res.status(429).send({ message: "Too Many Requests" })
  // }

  let db
  //wrap db connection in try/catch
  try {
    db = await connectToDatabase()
    db = db.db
  } catch (error) {
    console.log(error)
    throw new Error("Unable to connect to database")
  }

  // get limit otherwise set to 500

  // get query from req
  //  if undefined set to empty
  if (req.query.query === undefined) {
    return res.status(400).json({ message: "Bad request" })
  }
  // if query is not defined, set to empty string
  // if query is defined, set to query
  let query: string, limit: number
  if (req.query.query === "" || req.query.query === undefined) {
    query = ""
  } else {
    query = req.query.query as string
  }

  if (req.query.limit === "" || req.query.limit === undefined) {
    limit = 40
  } else {
    limit = Number(req.query.limit)
  }

  // max limit is 100
  if (limit > 100) {
    limit = 100
  }

  // limit to only GET method or throw error
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  //if query is empty don't search
  let labels: Label[] | null = null
  try {
    if (query === "") {
      labels = await db
        .collection("sociallabels_db1")
        .find()
        .limit(limit)
        .toArray()
      // console.log(labels, db)
    } else {
      const atlasSearchQuery = [
        {
          $search: {
            index: "search",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        {
          $limit: limit,
        },
      ]
      labels = await db
        .collection("sociallabels_db1")
        .aggregate(atlasSearchQuery)
        .toArray()
    }
    labels = labels.map((label) => {
      return {
        _id: label._id,
        id: label.id,
        name: label.name,
        ens: label.ens,
        handle: label.handle,
        followers: label.followers,
        verified: label.verified,
        updated: label.updated,
        pfp: label.pfp,
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }

  const response: Response = {
    data: labels,
  }
  return res.status(200).json(response)
}
