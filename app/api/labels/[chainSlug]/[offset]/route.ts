import { NextResponse } from "next/server"
import * as z from "zod"

import { prisma } from "@/lib/prisma"
import { parseQueryParamsLimit } from "@/lib/query-params"

const routeContextSchema = z.object({
  params: z.object({
    offset: z.string(),
    chainSlug: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const {
    params: { offset, chainSlug },
  } = routeContextSchema.parse(context)
  const { limit } = parseQueryParamsLimit(req)

  const labels = await prisma.addressLabel.findMany({
    skip: Number(offset) * limit,
    take: limit,
    where: {
      /* status: "ACCEPTED", */
      blockchain: chainSlug,
    },
  })

  return NextResponse.json(labels)
}