import React from "react"
import { env } from "@/env.mjs"

import { ChainCommunityLabelsTableProvider } from "@/components/app/chain-community-labels-table-provider"
import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"

async function getCommunityData({
  chainSlug,
  offset,
  limit,
}: {
  chainSlug: string
  offset: string
  limit: string
}) {
  try {
    const data = await fetch(
      `${env.PUBLIC_URL}/api/labels/${chainSlug}/${offset}?limit=${limit}`
    )
    return data.json()
  } catch (error) {
    console.error(error)
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
    offset: searchParams.offset?.toString() || "0",
    limit: searchParams.limit?.toString() || "10",
  })

  return (
    <Shell className="gap-2">
      {/**
       * The `TasksTableProvider` is use to enable some feature flags for the `TasksTable` component.
       * Feel free to remove this, as it's not required for the `TasksTable` component to work.
       */}
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
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <TasksTable tasksPromise={tasksPromise} />
        </React.Suspense>
      </ChainCommunityLabelsTableProvider>
    </Shell>
  )
}
