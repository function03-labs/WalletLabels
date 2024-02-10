import middlewares, { middlewares_special } from "@/lib/rateLimits"
import { connectToDatabase } from "../../lib/mongodb"
import keys from "@/api_keys"
import { PostHog } from 'posthog-node'

export default async function handler(req, res) {
  let client, db
  //wrap db connection in try/catch
  try {
    const database = await connectToDatabase();
    db = database.db; // assuming connectToDatabase returns an object with a db property

  } catch (error) {
    console.log(error)
    throw new Error("Unable to connect to database")
  }


  // Check for the 'search' query parameter instead of 'query'
  if (req.query.searchtext === undefined) {
    return res.status(400).json({ message: "Bad request: 'search' parameter missing" });
  }
  let search, limit;
  if (req.query.searchtext === "" || req.query.searchtext === undefined) {
    search = "";
  } else {
    search = req.query.searchtext;  // Now using 'search' instead of 'query'
  }


  if (req.query.limit === "" || req.query.limit === undefined) {
    limit = 20
  } else {
    limit = Number(req.query.limit)
  }
  console.log(search);

  // max limit is 100
  if (limit > 1000) {
    limit = 1000
  }

  // limit to only GET method or throw error
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const clc_name = process.env.CLC_NAME_WLBLS_MEV

  //if query is empty don't search
  let labels = null
  try {
    if (search === "") {
      labels = await db.collection(clc_name).find().limit(limit).sort({ _id: -1 }).toArray();
    } else {
        const queryAtlas = {
            label_subtype: { $regex: search, $options: 'i' },  // Using case-insensitive search
          };

      const projection = {
        protocols: 1,
        last_txs: 1,
        label: 1,
        label_subtype: 1,
        address: 1,
        blockchain: 1,
      };

      const cursor = await db.collection(clc_name).find(queryAtlas, { projection }).sort({ _id: -1 }).limit(limit);
      labels = await cursor.toArray();
    }

    labels = labels.map((label) => ({
        address: label.address,
        blockchain: label.blockchain,
        label: label.label,
        label_subtype: label.label_subtype,
        last_txs: label.last_txs,
        protocols: label.protocols,
    }));
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
