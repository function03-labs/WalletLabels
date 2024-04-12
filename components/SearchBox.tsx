"use client";

import {
  useHits,
  useInstantSearch,
  useSearchBox,
  Stats,
} from "react-instantsearch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@component/ui/Badge";
import { SearchBar } from "@component/SearchBar";

export function SearchBox({
  params,
  searchParams,
}: {
  params: { chainSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const initialQuery = searchParams.query as string | undefined;
  const [inputValue, setInputValue] = useState(initialQuery || "");

  const { refine } = useSearchBox();
  const { refresh } = useInstantSearch();

  useEffect(() => {
    if (initialQuery !== "") {
      setInputValue(initialQuery as string);
      refine(initialQuery as string);
      refresh();
    }
  }, [initialQuery, refine, refresh]);

  const handleSearchLogin = (value: string) => {
    setInputValue(value);
    refine(value);
    refresh();
    router.push(`?query=${encodeURIComponent(value)}#search-box` as string);
  };

  return (
    <div>
      <form
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <SearchBar
          inputValue={inputValue}
          handleSearchLogin={handleSearchLogin as any}
          chain={params.chainSlug}
        />
      </form>
    </div>
  );
}

type Hit = {
  label: string;
};

export default function CustomHitsTags() {
  const router = useRouter();
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
          variant="outline"
          key={category.label}
          onClick={() => {
            router.push(
              `?query=${encodeURIComponent(category.label)}` as string
            );
          }}
          className="cursor-pointer hover:border-green-300 hover:text-foreground"
        >
          {category.label}
        </Badge>
      ))}
    </div>
  );
}

export function CustomHitsBadge({
  category,
}: {
  category: { label: string; emoji: string };
}) {
  const router = useRouter();

  return (
    <Badge
      variant="outline"
      onClick={() => {
        router.push(`?query=${encodeURIComponent(category.label)}` as string);
      }}
      className="cursor-pointer hover:border-green-300 hover:text-foreground"
    >
      {category.emoji + " " + category.label}
    </Badge>
  );
}

export function StatsWrapper() {
  return (
    <Stats
      className="hidden whitespace-nowrap text-sm text-muted-foreground sm:block"
      translationds={{
        stats(processingTimeMS: number) {
          let hitCountPhrase;
          return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`;
        },
      }}
    />
  );
}
