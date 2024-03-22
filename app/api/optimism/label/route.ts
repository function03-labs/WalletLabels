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
        message: "Bad request: 'address' parameter missing",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  let labels = [];
  const clc_name = process.env.CLC_NAME_WLBLS_OPTIMISM!;

  try {
    const cursor = db
      .collection(clc_name)
      .find(
        {
          address: query,
        },
        {
          projection: {
            address_name: 1,
            label_type: 1,
            label_subtype: 1,
            address: 1,
            label: 1,
          },
        }
      )
      .collation({ locale: "en", strength: 1 })
      .limit(limit);

    labels = await cursor.toArray();
    labels = labels.map((label) => ({
      address: label.address,
      address_name: label.address_name,
      label_type: label.label_type,
      label_subtype: label.label_subtype,
      label: label.label,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("Unable to fetch labels");
  }

  return new Response(JSON.stringify(labels), { status: 200 });
}
