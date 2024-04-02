import * as z from "zod";

import getHistory from "@lib/get-history";
import { connectToDatabase } from "@lib/mongodb";
import { getChainEnv, normalizeLabels } from "@lib/utils";

import { chains } from "@config/chains";

const chainContextSchema = z.object({
  params: z.object({
    chainSlug: z.string().refine((val) => {
      return chains.some((chain) => chain.id === val);
    }),
  }),
});

export async function GET(
  request: Request,
  context: z.infer<typeof chainContextSchema>
) {
  const {
    params: { chainSlug },
  } = chainContextSchema.parse(context);

  let db = await connectToDatabase();
  let labels = await db.db
    .collection(getChainEnv(chainSlug)!)
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
