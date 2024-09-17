import { NextResponse } from "next/server"
import * as z from "zod"

import { prisma } from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    chainSlug: z.string(),
  }),
})

function convertSpacesToHyphens(str: string): string {
  return str.replace(/\s+/g, "-")
}

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const {
    params: { chainSlug },
  } = routeContextSchema.parse(context)

  const labels = await prisma.addressLabel.findMany({
    where: {
      status: "ACCEPTED",
      blockchain: chainSlug,
    },
  })

  type Label = {
    labelType: string
    labelSubType: string
    addressName: string
    label: string
  }

  const processedLabels = labels.map((label:Label) => ({
    ...label,
    addressName: convertSpacesToHyphens(label.addressName),
    labelType: convertSpacesToHyphens(label.labelType),
    labelSubType: convertSpacesToHyphens(label.labelSubType),
    label: convertSpacesToHyphens(label.label),
  }))

  return NextResponse.json(processedLabels)
}
