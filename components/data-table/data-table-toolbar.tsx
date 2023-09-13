import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"
import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons"
import type { Table } from "@tanstack/react-table"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterableColumns?: DataTableFilterableColumn<TData>[]
  searchableColumns?: DataTableSearchableColumn<TData>[]
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleExport = () => {
    const selectedRows = table.getSelectedRowModel().flatRows
    const headers = table.getAllColumns().map(column => column.id)
    const rows = selectedRows.map(row => row.original)

    const csvContent = `data:text/csv;charset=utf-8,${[
      headers.join(","),
      ...rows.map(row => headers.map(header => row[header]).join(",")),
    ].join("\n")}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center justify-between p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            column =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <>
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={
                      (table
                        .getColumn(String(column.id))
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={event =>
                      table
                        .getColumn(String(column.id))
                        ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                </>
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            column =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="gap-2 flex">
        <DataTableViewOptions table={table} />
        <Button
          variant="outline"
          onClick={handleExport}
          className="ml-auto hidden h-8 md:flex">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
