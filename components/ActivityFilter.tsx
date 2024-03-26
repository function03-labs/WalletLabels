"use client";

import { HierarchicalMenu, RefinementList } from "react-instantsearch";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@component/ui/Sheet";
import { CustomHits } from "@component/SearchBox";
import { Separator } from "@component/ui/Separator";
import { buttonVariants } from "@component/ui/Button";

import { cn } from "@/lib/utils";

export function ActivityFilter({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <button
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
          aria-label="Open sidebar"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6H20M4 12H20M4 18H11"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter by Activity</SheetTitle>
          <SheetDescription></SheetDescription>
          <RefinementList
            className="mt-3"
            attribute="label_type"
            limit={10}
            showMore={true}
            showMoreLimit={20}
            searchablePlaceholder="Search by activity"
            searchable={true}
            // onClick={() => setinitialSearch(true)}
            transformItems={(items) =>
              items.sort((a, b) => (a.count < b.count ? 1 : -1))
            }
          />
          <Separator orientation="horizontal" />

          <h5 className="mt-5">Contract Type</h5>
          <HierarchicalMenu
            // onClick={() => setinitialSearch(true)}
            className="mt-3"
            attributes={["label_subtype"]}
            transformItems={(items) =>
              items.sort((a, b) => (a.count < b.count ? 1 : -1))
            }
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
