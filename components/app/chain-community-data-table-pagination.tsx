"use client"

import { useRouter } from "next/navigation"
import type { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { useUpdateSearchParams } from "@/lib//hooks/use-update-search-params"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const updateSearchParams = useUpdateSearchParams()
  const router = useRouter()

  const updatePageSearchParams = (values: Record<string, unknown>) => {
    const newSearchParams = updateSearchParams(values)
    router.replace(`?${newSearchParams}`, { scroll: false })
  }

  return (
    <div className="flex items-center justify-between px-2" data-oid="-_8r9-i">
      <div data-oid="q7wp6ck">
        <p className="text-sm text-muted-foreground" data-oid="b6q.067">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length} row(s) filtered
        </p>
      </div>
      <div
        className="flex items-center space-x-6 text-primary lg:space-x-8"
        data-oid=".r80547"
      >
        <div className="flex items-center space-x-2" data-oid="mwxx65.">
          <p className="text-sm font-medium" data-oid="aik.81t">
            Rows per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              updatePageSearchParams({ pageSize: value })
            }}
            data-oid="lh.4luq"
          >
            <SelectTrigger className="h-8 w-[70px]" data-oid="_0.0pyf">
              <SelectValue
                placeholder={table.getState().pagination.pageSize}
                data-oid="l3pp7m."
              />
            </SelectTrigger>
            <SelectContent side="top" data-oid=".ret4.z">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  data-oid="mcwbi_y"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          className="flex w-[100px] items-center justify-center text-sm font-medium"
          data-oid="0mi1ewx"
        >
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2" data-oid="pggtme2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0)
            }}
            disabled={!table.getCanPreviousPage()}
            data-oid="a.rt4w6"
          >
            <span className="sr-only" data-oid="ienwbue">
              Go to first page
            </span>
            <ChevronsLeft className="size-4" data-oid="123y04y" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
            data-oid="va6uy06"
          >
            <span className="sr-only" data-oid=".cs7uts">
              Go to previous page
            </span>
            <ChevronLeft className="size-4" data-oid="8yyzx8r" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
            data-oid="kz3yf:q"
          >
            <span className="sr-only" data-oid="8gaqkew">
              Go to next page
            </span>
            <ChevronRight className="size-4" data-oid="ivbl-os" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)
            }}
            disabled={!table.getCanNextPage()}
            data-oid="wnxo0mr"
          >
            <span className="sr-only" data-oid="zpexltx">
              Go to last page
            </span>
            <ChevronsRight className="size-4" data-oid="wmy73:." />
          </Button>
        </div>
      </div>
    </div>
  )
}
