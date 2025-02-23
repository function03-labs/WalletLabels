"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Table as TTable,
} from "@tanstack/react-table"

import { communityLabelSchema } from "@/config/schema"

import { DataTableFilterBar } from "@/components/app/chain-community-data-table-filter-bar"
import { DataTableFilterCommand } from "@/components/app/chain-community-data-table-filter-command"
import { DataTablePagination } from "@/components/app/chain-community-data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { DataTableFilterField } from "@/types/label"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  defaultColumnFilters?: ColumnFiltersState
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultColumnFilters = [],
  filterFields = [],
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(defaultColumnFilters)
  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: (table: TTable<TData>, columnId: string) => () => {
      return getFacetedUniqueValues<TData>()(table, columnId)()
    },
  })

  return (
    <div className="flex flex-col gap-4 sm:flex-row" data-oid="1v3kjbh">
      <div className="w-full sm:max-w-56" data-oid="m4ius2b">
        <DataTableFilterBar
          table={table}
          columns={columns}
          filterFields={filterFields}
          data-oid="40w15z5"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4" data-oid="asayvmf">
        <DataTableFilterCommand
          table={table}
          schema={communityLabelSchema}
          filterFields={filterFields}
          data-oid="1dee4j-"
        />

        <div className="rounded-md border" data-oid="q58ade6">
          <Table data-oid=":52tka6">
            <TableHeader className="bg-muted/50" data-oid="6e.n.6d">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent"
                  data-oid="23bxykl"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} data-oid="nnst1cu">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-primary-foreground" data-oid="_43ar2s">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-oid="p2r2brp"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} data-oid="u9b7xo_">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow data-oid="qc2_p6-">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center dark:text-gray-400"
                    data-oid="0u6qlf8"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} data-oid="w.kjweo" />
      </div>
    </div>
  )
}
