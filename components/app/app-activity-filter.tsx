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

  const query = searchParams?.get("query") ?? ""

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
    <Sheet open={open} onOpenChange={setOpen} data-oid="ekte23t">
      <div
        className="flex items-center justify-between px-1 sm:px-2 md:px-4 lg:px-12"
        data-oid="o2:k:eh"
      >
        <SheetTrigger data-oid="7v10o63">
          <button
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "dark:text-white"
            )}
            aria-label="Open sidebar"
            data-oid="p8wu0mr"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              data-oid="kic0:14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6H20M4 12H20M4 18H11"
                data-oid="udwu22m"
              />
            </svg>
          </button>
        </SheetTrigger>
        <p
          className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block"
          data-oid="4w-:iea"
        >
          <kbd
            className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            data-oid="04j89be"
          >
            <span className="text-xs" data-oid="roupe1x">
              ⌘
            </span>
            J
          </kbd>
          to open the filter
        </p>
      </div>

      <SheetContent
        className="w-[400px] sm:w-[540px]"
        side={"left"}
        data-oid="k1cdl9z"
      >
        <SheetHeader data-oid="u0:1urr">
          <SheetTitle data-oid="-rx60js">Filter by Activity</SheetTitle>
          <SheetDescription data-oid="dx5tvdl">
            Filter by activity to find the right contract for you.
          </SheetDescription>

          {activities.map((activity) => (
            <label
              key={activity.label}
              htmlFor={`checkbox-${activity.label}`}
              className="flex cursor-pointer items-center gap-2"
              data-oid="x7ig6ch"
            >
              <Checkbox
                id={`checkbox-${activity.label}`}
                checked={activity.isRefined}
                onCheckedChange={() => handleCheckboxChange(activity)}
                data-oid="2bclwo8"
              />

              <span
                className="text-sm font-medium dark:text-white"
                data-oid="8z7miez"
              >
                {activity.label}
              </span>
              <span
                className="ml-auto text-sm text-gray-500"
                data-oid="60rcukq"
              >
                {activity.count}
              </span>
            </label>
          ))}

          <Separator orientation="horizontal" data-oid="fp-yd6l" />

          <SheetTitle data-oid="vb6pgxu">Contract Type</SheetTitle>
          <SheetDescription data-oid="zcc1ks0">
            Filter by contract type to find the right contract for you.
          </SheetDescription>

          <div className="flex flex-wrap gap-2" data-oid="60ltmek">
            {contracts.map((contract) => (
              <label
                key={contract.label}
                htmlFor={`checkbox-${contract.label}`}
                className="flex items-center"
                data-oid="hp-67o1"
              >
                <Badge
                  variant={contract.isRefined ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleBadgeChange(contract)}
                  data-oid=":ozhkvg"
                >
                  {contract.label}
                  <Badge
                    className="ml-1 p-0 text-xs"
                    variant="secondary"
                    data-oid="b.jcfkb"
                  >
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
