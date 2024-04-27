import { Db, MongoClient } from "mongodb";

let cachedDb: Db | null = null;
let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI_NEW;
  const MONGODB_DB = process.env.DB_NAME_NEW;

  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  let client = new MongoClient(MONGODB_URI);
  cachedClient = client;
  await client.connect();

  let db = client.db(MONGODB_DB);
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

export async function connectDB() {
  try {
    const database = await connectToDatabase();
    return database.db;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to database");
  }
}
