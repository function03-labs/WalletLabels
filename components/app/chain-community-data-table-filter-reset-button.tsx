"use client"

import { useRouter } from "next/navigation"
import type { Table } from "@tanstack/react-table"

import { useUpdateSearchParams } from "@/lib/hooks/use-update-search-params"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

import type { DataTableFilterField } from "@/types/label"

interface DataTableFilterResetButtonProps<TData>
  extends DataTableFilterField<TData> {
  table: Table<TData>
}

export function DataTableFilterResetButton<TData>({
  table,
  value: _value,
}: DataTableFilterResetButtonProps<TData>) {
  const value = _value
  const updateSearchParams = useUpdateSearchParams()
  const router = useRouter()
  const column = table.getColumn(value)
  const filterValue = column?.getFilterValue()

  // TODO: check if we could useMemo
  const filters = filterValue
    ? Array.isArray(filterValue)
      ? filterValue
      : [filterValue]
    : []

  const updatePageSearchParams = (values: Record<string, string | null>) => {
    const newSearchParams = updateSearchParams(values)
    router.replace(`?${newSearchParams}`, { scroll: false })
  }

  if (filters.length === 0) return null

  return (
    <Button
      variant="outline"
      className="h-5 rounded-full px-1.5 py-1 font-mono text-[10px]"
      onClick={(e) => {
        e.stopPropagation()
        column?.setFilterValue(undefined)
        updatePageSearchParams({ [value]: null })
      }}
      asChild
    >
      {/* REMINDER: `AccordionTrigger` is also a button(!) and we get Hydration error when rendering button within button */}
      <div role="button">
        <span className="text-muted-foreground">{filters.length}</span>
        <Icons.close className="ml-1 size-2.5 text-muted-foreground" />
      </div>
    </Button>
  )
}
