import * as z from "zod";

const queryParamsSchema = z.object({
  address: z.string().optional(),
  limit: z.coerce.number().optional().default(20),
});

type QueryParams = z.infer<typeof queryParamsSchema>;

export async function getQueryParams(req: Request): Promise<QueryParams> {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const address = searchParams.get("address") || "";
  const limit = searchParams.get("limit");

  return queryParamsSchema.parse({
    address,
    limit: limit
      ? Number.isNaN(+limit)
        ? 20
        : +limit > 100
          ? 100
          : +limit
      : 20,
  });
}
