import * as z from "zod";

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

export const maxDuration = 60;

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
