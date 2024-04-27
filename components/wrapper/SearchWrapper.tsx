"use client";

import { Configure, InstantSearch } from "react-instantsearch";

import { indexMap } from "@lib/query-params";
import { searchClient } from "@lib/assemble-types";

export function SearchWrapper({
  chainSlug,
  children,
}: {
  chainSlug: string;
  children: React.ReactNode;
}) {
  if (!(chainSlug in indexMap)) {
    return null;
  }

  return (
    <InstantSearch
      indexName={indexMap[chainSlug as keyof typeof indexMap]}
      searchClient={searchClient(chainSlug)}
      insights={false}
    >
      <Configure hitsPerPage={30} />
      {children}
    </InstantSearch>
  );
}
