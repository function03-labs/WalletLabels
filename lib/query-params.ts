import * as z from "zod";

const queryParamsSchema = z.object({
  query: z.string().optional(),
  limit: z.coerce.number().optional().default(20),
});

type QueryParams = z.infer<typeof queryParamsSchema>;

export async function getQueryParams(req: Request): Promise<QueryParams> {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("address") || searchParams.get("search");
  const limit = searchParams.get("limit");

  return queryParamsSchema.parse({
    query,
    limit: limit
      ? Number.isNaN(+limit)
        ? 20
        : +limit > 100
          ? 100
          : +limit
      : 20,
  });
}

export const indexMap = {
  "/": "labels_v2",
  "/ethereum": "labels_v2",
  "/solana": "solana",
  "/arbitrum": "arbitrum",
};
