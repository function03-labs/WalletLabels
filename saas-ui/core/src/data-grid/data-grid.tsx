import * as React from 'react'
import {
  useTable,
  useSortBy,
  useRowSelect,
  TableInstance,
  TableOptions,
  CellProps,
  HeaderGroup,
  Hooks,
  IdType,
  Row,
  RowPropGetter,
} from 'react-table'
import {
  chakra,
  forwardRef,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  useStyles,
  useTheme,
} from '@chakra-ui/react'

import { dataAttr } from '@chakra-ui/utils'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

import { Link } from '@saas-ui/react'

export type { Column, Row, TableInstance } from 'react-table'

export interface DataGridProps<Data extends object> extends TableOptions<Data> {
  /**
   * Enable sorting on all columns
   */
  isSortable?: boolean
  /**
   * Enable row selection
   */
  isSelectable?: boolean
  /**
   * Enable row hover styles
   */
  isHoverable?: boolean
  /**
   * Triggers whenever the row selection changes.
   * @returns {string[]}
   */
  onSelectedRowsChange?: (rows: IdType<Data>[]) => void
  /**
   * Callback fired when a row is clicked.
   */
  onRowClick?: (row: Row<Data>, e: React.MouseEvent, meta?: any) => void
}

export const DataGrid = React.forwardRef(
  <Data extends object>(
    props: DataGridProps<Data>,
    ref: React.ForwardedRef<TableInstance<Data>>,
  ) => {
    const {
      columns,
      data,
      initialState,
      autoResetHiddenColumns,
      stateReducer,
      useControlledState,
      getSubRows,
      defaultColumn,
      getRowId,
      manualRowSelectKey,
      autoResetSelectedRow,
      isSortable,
      isSelectable,
      isHoverable,
      onSelectedRowsChange,
      onRowClick,
      ...rest
    } = props

    const theme = useTheme()
    const styleConfig = theme.components?.DataGrid

    const instance = useTable(
      {
        columns: React.useMemo(() => {
          return columns?.map((column: any) => {
            if (!column.accessor) {
              column.accessor = column.id
            }
            if (!column.Cell) {
              column.Cell = DataGridCell
            }
            return column
          })
        }, []),
        data,
        initialState,
        autoResetHiddenColumns,
        stateReducer,
        useControlledState,
        defaultColumn,
        getSubRows,
        getRowId,
        manualRowSelectKey,
        autoResetSelectedRow,
      },
      useSortBy,
      useRowSelect,
      useCheckboxColumn(isSelectable),
    )

    // This exposes the useTable api through the forwareded ref
    React.useImperativeHandle(ref, () => instance, [ref])

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
    } = instance

    React.useEffect(() => {
      onSelectedRowsChange?.(Object.keys(state.selectedRowIds))
    }, [onSelectedRowsChange, state.selectedRowIds])

    return (
      <Table {...getTableProps()} styleConfig={styleConfig} {...rest}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <DataGridHeader
                  key={column.id}
                  column={column}
                  isSortable={isSortable}
                />
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)

            const onClick = React.useCallback(
              (e) => onRowClick?.(row, e),
              [onRowClick],
            )

            return (
              <Tr
                {...row.getRowProps()}
                onClick={onClick}
                data-selected={dataAttr(row.isSelected)}
                data-hover={dataAttr(isHoverable)}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                      isTruncated
                    >
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  },
) as <Data extends object>(
  props: DataGridProps<Data> & {
    ref?: React.ForwardedRef<TableInstance<Data>>
  },
) => React.ReactElement

export interface DataGridSortProps<Data extends object> {
  column: HeaderGroup<Data>
}
export const DataGridSort = <Data extends object>(
  props: DataGridSortProps<Data>,
) => {
  const { column, ...rest } = props

  const styles = useStyles()

  const sorterStyles = {
    ms: 2,
    ...styles.sorter,
  }

  if (column.id === 'selection') {
    return null
  }

  return (
    <chakra.span __css={sorterStyles} {...rest}>
      {column.isSorted ? (
        column.isSortedDesc ? (
          <TriangleDownIcon aria-label="sorted descending" />
        ) : (
          <TriangleUpIcon aria-label="sorted ascending" />
        )
      ) : (
        ''
      )}
    </chakra.span>
  )
}

export interface DataGridHeaderProps<Data extends object> {
  column: HeaderGroup<Data>
  isSortable?: boolean
}
export const DataGridHeader = <Data extends object>(
  props: DataGridHeaderProps<Data>,
) => {
  const { column, isSortable, ...rest } = props

  let headerProps = {}

  if (isSortable) {
    headerProps = {
      ...column.getSortByToggleProps(),
      className: 'chakra-table-sortable',
    }
  }

  return (
    <Th
      {...column.getHeaderProps(headerProps)}
      textTransform="none"
      width={column.width}
      isNumeric={column.isNumeric}
      {...rest}
    >
      {column.render('Header')}
      {isSortable && <DataGridSort column={column} />}
    </Th>
  )
}

const getResult = (fn: any, params: any) => {
  if (typeof fn === 'function') {
    return fn(params)
  }
  return fn
}

export const DataGridCell = <Data extends object>({
  value,
  column,
  row,
}: CellProps<Data>) => {
  if (column.href) {
    const href = getResult(column.href, row.original) as string
    return <Link href={href}>{value}</Link>
  }
  return value || null
}

const DataGridCheckbox = forwardRef((props, ref) => {
  const { checked, indeterminate, ...rest } = props

  const onClick = React.useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    [],
  )

  return (
    <chakra.div onClick={onClick}>
      <Checkbox
        ref={ref}
        isChecked={checked}
        isIndeterminate={indeterminate}
        {...rest}
      />
    </chakra.div>
  )
})

const useCheckboxColumn = <Data extends object>(enabled?: boolean) => {
  return (hooks: Hooks<Data>) => {
    enabled &&
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          width: '1%',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <DataGridCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: CellProps<Data>) => (
            <DataGridCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ])
  }
}
