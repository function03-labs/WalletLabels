import { ReactElement } from "react"

import { Input } from "@/components/ui/input"

interface ITablePagination {
  canPreviousPage: boolean
  canNextPage: boolean
  pageCount: number
  pageIndex: number
  pageSize: number
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
  nextPage: () => void
  previousPage: () => void
  setPageSize: (pageSize: number) => void
}

/**
 * @name TablePagination
 * @param {Object} props
 */
export const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
}: ITablePagination): ReactElement => {
  return (
    <div
      className="flex justify-between items-center bg-background text-foreground shadow-sm px-3 py-5 rounded-b-lg"
      data-oid="d8vk-hr"
    >
      <div className="flex items-center" data-oid="h9sm3j0">
        <div className="" data-oid="ncbh7db">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            data-oid="po:0rax"
          >
            {"<<"}
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            data-oid="fc:k_sz"
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            data-oid="pf-vfe3"
          >
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            data-oid="-iy-e9:"
          >
            {">>"}
          </button>{" "}
          <span className="mx-2" data-oid="ow2dzwe">
            Page{" "}
            <strong data-oid="bjavdwc">
              {pageIndex + 1} of {pageCount}
            </strong>{" "}
          </span>
        </div>
        |
        <span
          className="bg-card mx-2 inline-block rounded-xl py-3 px-2"
          data-oid="zvld64-"
        >
          <span className="p-2" data-oid="zvsixeu">
            Go to page:{" "}
            <Input
              className="inline-block ml-3 h-[32px] w-[64px]"
              type="number"
              min={1}
              max={pageCount}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: "64px" }}
              data-oid="k6dkb59"
            />
          </span>
        </span>{" "}
      </div>
      <select
        className=" min-w-[90px] bg-background text-foreground"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value))
        }}
        data-oid="hp5izpt"
      >
        {[5, 10, 20, 30, 40, 50].map((pageSizeParams) => (
          <option
            className="text-xl"
            key={pageSizeParams}
            value={pageSizeParams}
            data-oid="dcjd445"
          >
            Show {pageSizeParams}
          </option>
        ))}
      </select>
    </div>
  )
}
export default TablePagination
