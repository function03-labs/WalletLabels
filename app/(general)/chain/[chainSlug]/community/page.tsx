import React from "react"
import { env } from "@/env.mjs"

import { DataTableSkeleton } from "@/components/app/chain-community-labels-data-table-skeleton"
import { LabelTable } from "@/components/app/chain-community-labels-table"
import { ChainCommunityLabelsTableProvider } from "@/components/app/chain-community-labels-table-provider"
import { Shell } from "@/components/ui/shell"

async function getCommunityData({
  chainSlug,
  offset,
  limit,
}: {
  chainSlug: string
  offset: number
  limit: string
}) {
  try {
    const data = await fetch(
      `${env.PUBLIC_URL}/api/labels/${chainSlug}/${offset - 1}?limit=${limit}`
    )
    return data.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function CommunityPage({
  params,
  searchParams,
}: {
  params: { chainSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const data = await getCommunityData({
    chainSlug: params.chainSlug,
    offset: parseInt(searchParams.page?.toString() ?? "1"),
    limit: searchParams.per_page?.toString() || "10",
  })

  return (
    <Shell className="gap-2">
      <ChainCommunityLabelsTableProvider>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          <LabelTable
            data={data}
            offset={parseInt(searchParams.page?.toString() || "1") - 1}
          />
        </React.Suspense>
      </ChainCommunityLabelsTableProvider>
    </Shell>
  )
}
