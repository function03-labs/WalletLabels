import * as z from "zod";
import { connectToDatabase } from "@lib/mongodb";
import { getQueryParams } from "@lib/query-params";

const routeContextSchema = z.object({
  params: z.object({
    action: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  let db;
  try {
    const database = await connectToDatabase();
    db = database.db;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to database");
  }

  const { query, limit } = await getQueryParams(req);

  if (!query) {
    return new Response(
      JSON.stringify({
        message: "Bad request: 'search' parameter missing",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const clc_name = process.env.CLC_NAME_WLBLS_MEV!;

  let labels = null;
  try {
    if (query === "") {
      labels = await db
        .collection(clc_name)
        .find()
        .limit(limit)
        .sort({ _id: -1 })
        .toArray();
    } else {
      const queryAtlas = {
        label_subtype: { $regex: query, $options: "i" },
      };

      const cursor = db
        .collection(clc_name)
        .find(queryAtlas, {
          projection: {
            protocols: 1,
            last_txs: 1,
            label: 1,
            label_subtype: 1,
            address: 1,
            blockchain: 1,
          },
        })
        .sort({ _id: -1 })
        .limit(limit);
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
    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify(labels), { status: 200 });
}
