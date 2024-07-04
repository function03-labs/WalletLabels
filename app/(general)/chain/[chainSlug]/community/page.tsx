import React from "react"
import { env } from "@/env.mjs"

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
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
