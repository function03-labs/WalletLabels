"use client"

import * as React from "react"
import type { DataTableFilterField } from "@/types"
import { AddressLabel } from "@prisma/client"

import { useDataTable } from "@/lib/hooks/use-data-table"

import { DataTable } from "@/components/app/chain-community-labels-data-table"
import { DataTableToolbar } from "@/components/app/chain-community-labels-data-table-toolbar"
import { getColumns } from "@/components/app/chain-community-labels-table-columns"

interface LabelTableProps {
  data: AddressLabel[]
  offset: string
}

export function LabelTable({ data, offset }: LabelTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<AddressLabel>[] = [
    {
      label: "Title",
      value: "addressName",
      placeholder: "Filter addressName...",
    },
  ]

  const { table } = useDataTable({
    data,
    columns,
    offset,
    // optional props
    filterFields,
    defaultPerPage: 10,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
      </DataTableToolbar>
    </DataTable>
  )
}
