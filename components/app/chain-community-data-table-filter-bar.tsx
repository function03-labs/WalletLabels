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
    <div className="flex flex-col gap-4" data-oid="cjfh-e9">
      <div
        className="flex h-[46px] items-center justify-between gap-3"
        data-oid="u0npt65"
      >
        <p className="font-medium text-foreground" data-oid="yn33_z6">
          Filters
        </p>
        <div data-oid="z0ck.mr">
          {filters.length ? (
            <Button
              variant="outline"
              className="text-primary"
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
              data-oid="zexxsz0"
            >
              Reset
            </Button>
          ) : null}
        </div>
      </div>
      <Accordion
        type="multiple"
        // REMINDER: open all filters by default
        defaultValue={filterFields?.map(({ value }) => value)}
        data-oid="5j5datr"
      >
        {filterFields?.map((field) => {
          return (
            <AccordionItem
              key={field.value}
              value={field.value}
              className="border-none"
              data-oid="_ptnb6z"
            >
              <AccordionTrigger
                className="p-2 hover:no-underline"
                data-oid="i:_n_5i"
              >
                <div className="flex items-center gap-2" data-oid="i5mxov9">
                  <p
                    className="text-sm font-medium text-foreground"
                    data-oid="nnwcmeu"
                  >
                    {field.label}
                  </p>
                  <DataTableFilterResetButton
                    table={table}
                    {...field}
                    data-oid="2f5pa:0"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="-m-4 p-4" data-oid="fa6par8">
                <DataTableFilterCheckobox
                  table={table}
                  {...field}
                  data-oid="37coge7"
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
