import { type } from "os"
import { MongoClient } from "mongodb"

const MONGODB_URI_SOCIALS = process.env.MONGODB_URI_SOCIALS
const DB_NAME_SOCIALS = process.env.DB_NAME_SOCIALS

// check the MongoDB URI
if (!MONGODB_URI_SOCIALS) {
  throw new Error("Define the MONGODB_URI environmental variable")
}

// check the MongoDB DB
if (!DB_NAME_SOCIALS) {
  throw new Error("Define the MONGODB_DB environmental variable")
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI_SOCIALS)
  await client.connect()
  let db = client.db(DB_NAME_SOCIALS)

  // set cache
  cachedClient = client
  cachedDb = db

  return {
    client: cachedClient,
    db: cachedDb,
  }
}
