"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Table } from "@tanstack/react-table"

import { useUpdateSearchParams } from "@/lib/hooks/use-update-search-params"
import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { InputWithAddons } from "@/components/ui/input-with-addons"
import { Label } from "@/components/ui/label"

import type { DataTableFilterField } from "@/types/label"

interface DataTableFilterCheckoboxProps<TData>
  extends DataTableFilterField<TData> {
  table: Table<TData>
}

export function DataTableFilterCheckobox<TData>({
  table,
  value: _value,
  options,
  component,
}: DataTableFilterCheckoboxProps<TData>) {
  const value = _value
  const [inputValue, setInputValue] = useState("")
  const updateSearchParams = useUpdateSearchParams()
  const router = useRouter()
  const column = table.getColumn(value)
  const facetedValue = column?.getFacetedUniqueValues()
  const filterValue = column?.getFilterValue()

  if (!options?.length) return null

  const updatePageSearchParams = (values: Record<string, string | null>) => {
    const newSearchParams = updateSearchParams(values)
    router.replace(`?${newSearchParams}`, { scroll: false })
  }

  const filterOptions = options.filter(
    (option) => inputValue === "" || option.label.includes(inputValue)
  )

  // TODO: check if we could useMemo
  const filters = filterValue
    ? Array.isArray(filterValue)
      ? filterValue
      : [filterValue]
    : []

  const Component = component

  return (
    <>
      {options.length > 4 ? (
        <InputWithAddons
          placeholder="Search"
          leading={<Icons.search className="mt-0.5 size-4 text-primary" />}
          containerClassName="mb-2 h-9 rounded-lg"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : null}
      <div className="overflow-hidden rounded-lg border border-primary/40 empty:border-none">
        <div className="max-h-40 overflow-y-scroll">
          {filterOptions.map((option, index) => {
            const checked = filters.includes(option.value)

            return (
              <div
                key={String(option.value)}
                className={cn(
                  "group flex items-center space-x-2 px-2 py-2.5 hover:bg-accent",
                  index !== filterOptions.length - 1 ? "border-b" : undefined
                )}
              >
                <Checkbox
                  id={`${value}-${option.value}`}
                  checked={checked}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(filters || []), option.value]
                      : filters?.filter((value) => option.value !== value)
                    column?.setFilterValue(
                      newValue?.length ? newValue : undefined
                    )
                    // @ts-expect-error FIXME: can have primary values or array
                    // FIXME: make it nullable!
                    updatePageSearchParams({ [value]: newValue })
                  }}
                />
                <Label
                  htmlFor={`${value}-${option.value}`}
                  className="flex w-full items-center justify-center gap-1 truncate text-muted-foreground group-hover:text-accent-foreground"
                >
                  {Component ? (
                    <Component {...option} />
                  ) : (
                    <span className="truncate font-normal">{option.label}</span>
                  )}
                  <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                    {facetedValue?.get(option.value)}
                  </span>
                </Label>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
