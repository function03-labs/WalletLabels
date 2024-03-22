import * as z from "zod";
import { connectToDatabase } from "@/lib/mongodb";

const routeContextSchema = z.object({
  params: z.object({
    networkSlug: z.string(),
    action: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const { params } = routeContextSchema.parse(context);
  console.log(params.networkSlug);
  console.log(params);
}
