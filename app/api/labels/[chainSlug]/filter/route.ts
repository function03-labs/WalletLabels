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

  const labelTypes = labels.map((label) => label.labelType)
  const labelSubTypes = labels.map((label) => label.labelSubType)
  const addressNames = labels.map((label) => label.addressName)
  const labelNames = labels.map((label) => label.label)

  return NextResponse.json({
    labelTypes: labelTypes,
    labelSubTypes: labelSubTypes,
    addressNames: addressNames,
    labelNames: labelNames,
  })
}
