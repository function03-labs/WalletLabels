import { NextResponse } from "next/server"
import * as z from "zod"

import { prisma } from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    chainSlug: z.string(),
  }),
})

function replaceSpacesWithHyphens(str: string): string {
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
  const labelTypes = labels.map((label:Label) =>
    replaceSpacesWithHyphens(label.labelType)
  )
  const labelSubTypes = labels.map((label:Label) =>
    replaceSpacesWithHyphens(label.labelSubType)
  )
  const addressNames = labels.map((label:Label) =>
    replaceSpacesWithHyphens(label.addressName)
  )
  const labelNames = labels.map((label:Label) =>
    replaceSpacesWithHyphens(label.label)
  )

  return NextResponse.json({
    labelTypes: labelTypes,
    labelSubTypes: labelSubTypes,
    addressNames: addressNames,
    labelNames: labelNames,
  })
}
