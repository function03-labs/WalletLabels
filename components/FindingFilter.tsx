"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { Stats } from "react-instantsearch";

import { Badge } from "@component/ui/Badge";
import CustomHitsTags, { CustomHits, SearchBox } from "@component/SearchBox";

import { badgeCategories } from "@config/badge-categories";

export function FindingFilter({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex justify-between">
      {/*       <Box className="align-start flex gap-2  text-sm text-muted-foreground">
        <div className="hidden whitespace-nowrap sm:block">
          Interesting finds:
        </div>
        {!initialSearch ? (
          <div className="flex flex-wrap gap-1">
            {badgeCategories.map((category) => (
              <Badge
                key={category.label}
                onClick={() => {
                  setSearchInput(category.label);
                  setinitialSearch(true);
                }}
                className="hover:border-green-300 hover:text-foreground"
              >
                {category.emoji + " " + category.label}
              </Badge>
            ))}
          </div>
        ) : (
          <div>{<CustomHitsTags setSearchInput={setSearchInput} />}</div>
        )}
      </Box> */}

      <Stats
        className="hidden whitespace-nowrap text-sm text-muted-foreground sm:block"
        translationds={{
          stats(processingTimeMS: number) {
            let hitCountPhrase;
            return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`;
          },
        }}
      />
    </div>
  );
}
