import { NextResponse } from "next/server"
import * as z from "zod"

import { prisma } from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    chainSlug: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const {
    params: { chainSlug },
  } = routeContextSchema.parse(context)

  const labels = await prisma.addressLabel.findMany({
    where: {
      /* status: "ACCEPTED", */
      blockchain: chainSlug,
    },
  })

  return NextResponse.json(labels)
}
