import React from "react"
import { env } from "@/env.mjs"

import { communityLabelSchema } from "@/config/schema"
import { getFilterFields } from "@/lib/utils/label"

import { columns } from "@/components/app/chain-community-columns"
import { DataTable } from "@/components/app/chain-community-data-table"

async function getCommunityData({ chainSlug }: { chainSlug: string }) {
  try {
    const data = await fetch(`${env.PUBLIC_URL}/api/labels/${chainSlug}/`, {
      next: {
        revalidate: 60,
      },
    })
    return data.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getCommunityFilter({ chainSlug }: { chainSlug: string }) {
  try {
    const data = await fetch(
      `${env.PUBLIC_URL}/api/labels/${chainSlug}/filter`,
      {
        next: {
          revalidate: 60,
        },
      }
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
  const search = communityLabelSchema.safeParse(searchParams)
  if (!search.success) {
    console.log(search.error)
    return null
  }

  const data = await getCommunityData({
    chainSlug: params.chainSlug,
  })
  const filter = await getCommunityFilter({
    chainSlug: params.chainSlug,
  })

  const filterFields = getFilterFields(filter)

  return (
    <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10 ">
      <DataTable
        columns={columns}
        data={data}
        filterFields={filterFields}
        defaultColumnFilters={Object.entries(search).map(([key, value]) => ({
          id: key,
          value,
        }))}
      />
    </section>
  )
}
