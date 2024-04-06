import * as z from "zod";
import { connectToDatabase } from "@lib/mongodb";
import { getChainEnv, normalizeLabels } from "@lib/utils";

import { chains } from "@config/chains";

const chainContextSchema = z.object({
  params: z.object({
    chainSlug: z.string().refine((val) => {
      return chains.some((chain) => chain.id === val);
    }),
    search: z.string(),
  }),
});

export async function GET(
  request: Request,
  context: z.infer<typeof chainContextSchema>
) {
  const {
    params: { chainSlug, search },
  } = chainContextSchema.parse(context);
  console.log(search);

  let db = await connectToDatabase();

  const agg = [
    {
      $search: {
        index: "public_eth2",
        text: {
          query: search,
          path: ["label", "address_name", "label_type", "label_subtype"],
        },
      },
    },
    {
      $limit: 30,
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
    },
  ];

  const cursor = db.db
    .collection(getChainEnv(chainSlug)!)
    .aggregate(agg, { allowDiskUse: true })
    .limit(30);

  console.log(cursor);

  let labels = await cursor.toArray();

  console.log(labels);

  return new Response(
    JSON.stringify({ data: normalizeLabels(labels), revalidate: 60 * 60 * 24 }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
