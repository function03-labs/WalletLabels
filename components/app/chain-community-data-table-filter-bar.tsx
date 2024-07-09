"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import type { ColumnDef, Table } from "@tanstack/react-table"

import { useUpdateSearchParams } from "@/lib/hooks/use-update-search-params"

import { DataTableFilterCheckobox } from "@/components/app/chain-community-data-table-filter-checkbox"
import { DataTableFilterResetButton } from "@/components/app/chain-community-data-table-filter-reset-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import type { DataTableFilterField } from "@/types/label"

// TODO: only pass the columns to generate the filters!
// https://tanstack.com/table/v8/docs/framework/react/examples/filters
interface DataTableFilterBarProps<TData, TValue> {
  table: Table<TData>
  columns: ColumnDef<TData, TValue>[]
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTableFilterBar<TData, TValue>({
  table,
  columns,
  filterFields,
}: DataTableFilterBarProps<TData, TValue>) {
  const filters = table.getState().columnFilters
  const updateSearchParams = useUpdateSearchParams()
  const router = useRouter()

  const updatePageSearchParams = (values: Record<string, string | null>) => {
    const newSearchParams = updateSearchParams(values)
    router.replace(`?${newSearchParams}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[46px] items-center justify-between gap-3">
        <p className="font-medium text-foreground">Filters</p>
        <div>
          {filters.length ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.resetColumnFilters()
                const resetValues = filters.reduce<Record<string, null>>(
                  (prev, curr) => {
                    prev[curr.id] = null
                    return prev
                  },
                  {}
                )
                updatePageSearchParams(resetValues)
              }}
            >
              Reset
            </Button>
          ) : null}
        </div>
      </div>
      <Accordion
        type="multiple"
        // REMINDER: open all filters by default
        defaultValue={filterFields?.map(({ value }) => value as string)}
      >
        {filterFields?.map((field) => {
          return (
            <AccordionItem
              key={field.value as string}
              value={field.value as string}
              className="border-none"
            >
              <AccordionTrigger className="p-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground text-sm">
                    {field.label}
                  </p>
                  <DataTableFilterResetButton table={table} {...field} />
                </div>
              </AccordionTrigger>
              <AccordionContent className="-m-4 p-4">
                <DataTableFilterCheckobox table={table} {...field} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
