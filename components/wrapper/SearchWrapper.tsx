"use client";
import { usePathname } from "next/navigation";
import { Configure, InstantSearch } from "react-instantsearch";

import { indexMap } from "@lib/query-params";
import { searchClient } from "@lib/assemble-types";

export function SearchWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (!(pathname in indexMap)) {
    return null;
  }

  console.log("SearchWrapper", indexMap[pathname as keyof typeof indexMap]);

  return (
    <InstantSearch
      indexName={indexMap[pathname as keyof typeof indexMap]}
      searchClient={searchClient(pathname)}
      insights={false}
    >
      <Configure hitsPerPage={30} />
      {children}
    </InstantSearch>
  );
}
