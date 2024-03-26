"use client";

import { useEffect, useRef, useState } from "react";
import { useHits, useInstantSearch, useSearchBox } from "react-instantsearch";

import { Grid } from "@component/Grid";
import { Badge } from "@component/ui/Badge";
import SearchComponent from "@component/SearchBar";

export function SearchBox({
  initialQuery = "",
  setinitialSearch,
  ...props
}: any) {
  const { refresh } = useInstantSearch();
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(initialQuery || query);

  useEffect(() => {
    if (initialQuery !== "") {
      setInputValue(initialQuery);
      refine(initialQuery);
      refresh();
    }
  }, [initialQuery, refine, refresh]);

  useEffect(() => {
    if (inputValue !== "") {
      setinitialSearch(true);
    }
    if (inputValue == "") {
      setinitialSearch(false);
    }
  }, [inputValue, setinitialSearch]);
  const inputRef = useRef<HTMLInputElement>(null);

  function setQuery(newQuery: string | undefined) {
    if (newQuery === undefined) return;
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <div>
      <form
        action=""
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
      >
        <SearchComponent
          handleSearchLogin={setQuery}
          inputRef={inputRef}
          inputValue={inputValue}
        />
      </form>
    </div>
  );
}

export function CustomHits() {
  const { hits } = useHits();

  const gridData = hits.map((hit) => ({
    address: hit.address as string,
    address_name: hit.address_name as string,
    label_type: hit.label_type as string,
    label_subtype: hit.label_subtype as string,
    label: hit.label as string,
    tag: hit.tag as string,
  }));

  return <Grid data={gridData} />;
}

type Hit = {
  label: string;
};

export default function CustomHitsTags({
  setSearchInput,
}: {
  setSearchInput: (value: string) => void;
}) {
  const { hits } = useHits() as { hits: Hit[] };

  const uniqueHits = hits.reduce((acc: Hit[], hit) => {
    if (!acc.some((item) => item.label === hit.label)) {
      acc.push(hit);
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-wrap gap-1">
      {uniqueHits.slice(0, 8).map((category) => (
        <Badge
          key={category.label}
          onClick={() => {
            setSearchInput(category.label);
          }}
          // @ts-ignore
          variant="none"
          className="hover:border-green-300 hover:text-foreground"
        >
          {category.label}
        </Badge>
      ))}
    </div>
  );
}
