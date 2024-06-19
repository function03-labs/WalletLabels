/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useInstantSearch, useRefinementList } from "react-instantsearch"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Activity } from "@/types/label"

export function ActivityFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refresh } = useInstantSearch()
  const [open, setOpen] = useState(false)

  const query = searchParams.get("query")

  const { items: activities, refine: refineActivity } = useRefinementList({
    attribute: "label_type",
  })

  const { items: contracts, refine: refineContract } = useRefinementList({
    attribute: "label_subtype",
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleCheckboxChange = (activity: Activity) => {
    refineActivity(activity.value)
    refresh()
    router.push(`?query=${query || ""}&isRefined=true`)
  }

  const handleBadgeChange = (contract: Activity) => {
    refineContract(contract.value)
    refresh()
    router.push(`?query=${query || ""}&isRefined=true`)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between px-1 sm:px-2 md:px-4 lg:px-12">
        <SheetTrigger>
          <button
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "dark:text-white"
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
                checked={activity.isRefined}
                onCheckedChange={() => handleCheckboxChange(activity)}
              />

              <span className="text-sm font-medium dark:text-white">
                {activity.label}
              </span>
              <span className="ml-auto text-sm text-gray-500">
                {activity.count}
              </span>
            </label>
          ))}

          <Separator orientation="horizontal" />

          <SheetTitle>Contract Type</SheetTitle>
          <SheetDescription>
            Filter by contract type to find the right contract for you.
          </SheetDescription>

          <div className="flex flex-wrap gap-2">
            {contracts.map((contract) => (
              <label
                key={contract.label}
                htmlFor={`checkbox-${contract.label}`}
                className="flex items-center"
              >
                <Badge
                  variant={contract.isRefined ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleBadgeChange(contract)}
                >
                  {contract.label}
                  <Badge className="ml-1 p-0 text-xs" variant="secondary">
                    {contract.count}
                  </Badge>
                </Badge>
              </label>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
