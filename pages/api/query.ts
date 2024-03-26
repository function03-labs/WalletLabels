import middlewares, { middlewares_special } from "@/lib/rateLimits"
import { connectToDatabase } from "../../lib/mongodb"
import keys from "@/api_keys"
import { PostHog } from 'posthog-node'
const clientPH = new PostHog(
  'phc_fm3aXnRPkxnjLP1sFZL6pMK09Ky2e82Ee5jf6QYrBuM',
  { host: 'https://app.posthog.com' }
)
export default async function handler(req, res) {
  //  check if the API key in the header (API-Key) is valid
  if (req.query["api-key"] in keys) {
    try {
      await Promise.all(middlewares_special.map((middleware) => middleware(req, res)))
    } catch {
      return res.status(429).send("Too Many Requests")
    }
  } else {
    try {
      await Promise.all(middlewares.map((middleware) => middleware(req, res)))
    } catch {
      return res.status(429).send("Too Many Requests")
    }
  }
  clientPH.capture({
    distinctId: 'query_call',
    event: 'query',
    properties: {
      method: req.method,
      query: req.query,
      api_key: req.query["api-key"] ? req.query["api-key"] : false,
      userAgent: req.headers['user-agent'],
      timestamp: new Date(),
    }
  })
  clientPH.flush()

  let client, db
  //wrap db connection in try/catch
  try {
    const database = await connectToDatabase();
    db = database.db; // assuming connectToDatabase returns an object with a db property

  } catch (error) {
    console.log(error)
    throw new Error("Unable to connect to database")
  }

  // get limit otherwise set to 500

  // get query from req
  //  if undefined set to empty
  if (req.query.query === undefined) {
    res.status(400).json({ message: "Bad request" })
  }
  // if query is not defined, set to empty string
  // if query is defined, set to query
  let query, limit
  if (req.query.query === "" || req.query.query === undefined) {
    query = ""
  } else {
    query = req.query.query
  }

  if (req.query.limit === "" || req.query.limit === undefined || Number.isNaN(req.query.limit)) {
    limit = 20
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

  const clc_name = process.env.CLC_NAME_WLBLS

  //if query is empty don't search
  let labels = null
  try {
    // console.log(query, "query", query === "")
    if (query == "") {

      labels = await db.collection(clc_name).find().limit(limit).toArray()
    } else {
      // use search atlas index
      const agg = [
        {
          $search: {
            index: "public_eth2",
            text: {
              query: query,
              path: ["label", "address_name", "label_type", "label_subtype"]

            }
          }
        },
        {
          $limit: limit,
        },
        {
          $project: {
            address_name: 1,
            label_type: 1,
            label_subtype: 1,
            address: 1,
            label: 1,
            score: { $meta: "textScore" },
          },
        },
        {
          $sort: {
            score: { $meta: "textScore" },
          },
        }
      ]
      // const projection = {
      //   address_name: 1,
      //   label_type: 1,
      //   label_subtype: 1,
      //   address: 1,
      //   label: 1,
      //   score: { $meta: "textScore" },
      // }

      // const sort = {
      //   score: { $meta: "textScore" },
      // }

      const cursor = await db.collection(clc_name).aggregate(agg, { allowDiskUse: true });
      console.log(cursor, "cursor")
      labels = await cursor.toArray();
      console.log(labels, "labels")

      // console.log(labels, "labels");

      // only keep "address_name", "label_type", "label_subtype", "address","label"
    }

    labels = labels.map((label) => {
      return {
        address: label.address,
        address_name: label.address_name,
        label_type: label.label_type,
        label_subtype: label.label_subtype,
        label: label.label,
        score: label.score,
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
    return
  }

  const response = {
    data: labels,
  }
  res.status(200).json(response)
}
