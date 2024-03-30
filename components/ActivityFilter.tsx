"use client";

import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@component/ui/Sheet";
import { Checkbox } from "@component/ui/Checkbox";
import { Separator } from "@component/ui/Separator";
import { buttonVariants } from "@component/ui/Button";
import { Refinement, Hierarchical } from "@component/InstantSearch";

import { cn } from "@lib/utils";
import { activities } from "@config/activities";

export function ActivityFilter({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  function handleCheckboxClick(activity, router, params) {
    const { query } = router;
    let updatedQuery = { ...query };

    if (params.activity) {
      const existingFindings = query.finding ? query.finding.split(" ") : [];
      const newFindings = [...existingFindings, ...activity.finding];
      updatedQuery.finding = newFindings.join(" ");
    } else {
      // If activity param doesn't exist, set the findings
      updatedQuery.finding = activity.finding.join(" ");
    }

    // Update the URL with the new query parameters
    router.push(`?query=${updatedQuery.query}&finding=${updatedQuery.finding}`);
  }
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
      <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter by Activity</SheetTitle>
          <SheetDescription>
            Filter by activity to find the right contract for you.
          </SheetDescription>
          {activities.map((activity) => (
            <div key={activity.label} className="flex items-center gap-2">
              <Checkbox
                id="terms1"
                checked={params.activity === activity.label}
                onClick={() => handleCheckboxClick(activity, router, params)}
              />
              <span className="text-sm">{activity.label}</span>
            </div>
          ))}

          <Refinement />

          <Separator orientation="horizontal" />

          <SheetTitle>Contract Type</SheetTitle>
          <Hierarchical />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
