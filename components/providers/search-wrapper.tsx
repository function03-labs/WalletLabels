"use client"

import { Configure, InstantSearch } from "react-instantsearch"

import { searchClient } from "@/lib/assemble-types"
import { indexMap } from "@/lib/query-params"

export function SearchWrapper({
  chainSlug,
  children,
}: {
  chainSlug: string
  children: React.ReactNode
}) {
  if (!(chainSlug in indexMap)) {
    return null
  }

  return (
    <InstantSearch
      indexName={indexMap[chainSlug as keyof typeof indexMap]}
      searchClient={searchClient(chainSlug)}
      insights={false}
      data-oid="zcm7j-_"
    >
      <Configure hitsPerPage={30} data-oid="rc52wvi" />
      {children}
    </InstantSearch>
  )
}
