import { HTMLAttributes } from "react"
import {
  TableInstance,
  useExpanded,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useSortBy,
  UseSortByInstanceProps,
  useTable,
} from "react-table"

import TableBody from "./table-body"
import TableHead from "./table-head"
import TablePagination from "./table-pagination"

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  data: Array<any>
  columns: Array<any>
}

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>
  }

export function TableCore({ className, columns, data, ...props }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {},
    },
    useSortBy,
    useExpanded,
    usePagination
  ) as TableInstanceWithHooks<object>

  // Render the UI for your table
  return (
    <div className={className} {...props} data-oid="rq2e-5m">
      <table
        className="w-full overflow-hidden "
        {...getTableProps()}
        data-oid="1n4jpmn"
      >
        <TableHead
          defaultStyle
          headerGroups={headerGroups}
          className=" bg-background text-foreground"
          data-oid="q8-5dme"
        />

        <TableBody
          page={page}
          prepareRow={prepareRow}
          props={getTableBodyProps()}
          data-oid="e6ctg4u"
        />
      </table>
      <TablePagination
        pageSize={pageSize}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        data-oid="_1e9vfc"
      />
    </div>
  )
}

export default TableCore
