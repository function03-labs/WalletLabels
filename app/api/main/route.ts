import * as z from "zod";

import getHistory from "@lib/get-history";
import { normalizeLabels } from "@lib/utils";
import { connectToDatabase } from "@lib/mongodb";

export async function GET(request: Request) {
  let db = await connectToDatabase();
  let labels = await db.db
    .collection(process.env.CLC_NAME_WLBLS!)
    .find()
    .limit(30)
    .toArray();

  let response = normalizeLabels(labels);
  const addresses = response.map((item) => item.address);

  const history = await getHistory(addresses);
  const data = response.map((item, index) => {
    item.balanceHistory = JSON.stringify(history[item["address"]]);
    return item;
  });

  return new Response(
    JSON.stringify({ data: data, revalidate: 60 * 60 * 24 }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
