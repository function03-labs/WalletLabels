"use client";

import { searchClient } from "@lib/assemble-types";
import { Configure, InstantSearch } from "react-instantsearch";

export function SearchWrapper({ children }: { children: React.ReactNode }) {
  return (
    <InstantSearch
      indexName="labels_v2"
      searchClient={searchClient}
      insights={false}
    >
      <Configure hitsPerPage={50} />
      {children}
    </InstantSearch>
  );
}
