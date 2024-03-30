"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import { Hierarchical } from "@component/InstantSearch";

import { cn } from "@lib/utils";
import { Activity } from "@/types/label";
import { activities } from "@config/activities";

export function ActivityFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const query = selectedActivities.join("%20");
    router.push(`?query=${query}`);
  }, [router, selectedActivities]);

  const handleCheckboxChange = (activity: Activity) => {
    const findings = activity.finding;

    if (findings.every((finding) => selectedActivities.includes(finding))) {
      setSelectedActivities(
        selectedActivities.filter((a) => !findings.includes(a))
      );
    } else {
      setSelectedActivities([...selectedActivities, ...findings]);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between px-12">
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
        <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            <span className="text-xs">⌘</span>J
          </kbd>
          to open the filter
        </p>
      </div>

      <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter by Activity</SheetTitle>
          <SheetDescription>
            Filter by activity to find the right contract for you.
          </SheetDescription>
          {activities.map((activity) => (
            <label
              key={activity.label}
              htmlFor={`checkbox-${activity.label}`}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                id={`checkbox-${activity.label}`}
                checked={activity.finding.every((finding) =>
                  searchParams.get("query")?.split(" ").includes(finding)
                )}
                onCheckedChange={() => handleCheckboxChange(activity)}
              />

              <span className="text-sm font-medium">{activity.label}</span>
              <span className="ml-auto text-sm text-gray-500">
                {activity.count}
              </span>
            </label>
          ))}

          <Separator orientation="horizontal" />

          {/*           <SheetTitle>Contract Type</SheetTitle>
          <SheetDescription>
            Filter by contract type to find the right contract for you.
          </SheetDescription>
          <Hierarchical /> */}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
