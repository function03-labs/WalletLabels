import * as React from 'react'
import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFilters,
  TableInstance,
  TableOptions,
  TableState,
  CellProps,
  HeaderGroup,
  Hooks,
  IdType,
  Row,
  PluginHook,
  SortingRule,
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
  useMultiStyleConfig,
  SystemStyleObject,
} from '@chakra-ui/react'

import { cx, __DEV__, dataAttr } from '@chakra-ui/utils'

import { ChevronUpIcon, ChevronDownIcon } from './icons'

import { Link } from '@saas-ui/react'

import { NoResults } from './no-results'

export type { Column, Row, TableInstance } from 'react-table'

interface DataGridContextValue<Data extends object> {
  instance: TableInstance<Data>
  state: TableState<Data>
}

const DataGridContext = React.createContext<DataGridContextValue<any> | null>(
  null,
)

export interface DataGridProviderProps<Data extends object> {
  instance: TableInstance<Data>
  children: React.ReactNode
}

export const DataGridProvider = <Data extends object>(
  props: DataGridProviderProps<Data>,
) => {
  const { instance, children } = props

  const context: DataGridContextValue<Data> = {
    state: instance.state,
    instance,
  }

  return (
    <DataGridContext.Provider value={context}>
      {children}
    </DataGridContext.Provider>
  )
}

export const useDataGridContext = <Data extends object>() => {
  return React.useContext(DataGridContext) as DataGridContextValue<Data>
}

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
   */
  onSelectedRowsChange?: (rows: IdType<Data>[]) => void
  /**
   * Triggers when sort changed.
   * Use incombination with `manualSortBy` to enable remote sorting.
   */
  onSortChange?: (columns: SortingRule<Data>[]) => void
  /**
   * Callback fired when a row is clicked.
   */
  onRowClick?: (row: Row<Data>, e: React.MouseEvent, meta?: any) => void
  /**
   * Callback fired when clear filters is clicked.
   */
  onResetFilters?: () => void
  /**
   * Use this for controlled pagination.
   */
  pageCount?: number
  /**
   * Add React Table plugins.
   */
  plugins?: PluginHook<Data>[]
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
      onSortChange,
      onRowClick,
      onResetFilters,
      noResults: NoResultsComponent = NoResults,
      pageCount,
      plugins = [],
      colorScheme,
      size,
      variant,
      className,
      children,
      ...rest
    } = props

    const theme = useTheme()
    const styleConfig = theme.components?.DataGrid

    const styles = useMultiStyleConfig('DataGrid', props) as Record<
      string,
      SystemStyleObject
    >

    const instance = useTable<Data>(
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
        initialState: React.useMemo(() => initialState, []),
        autoResetHiddenColumns,
        stateReducer,
        useControlledState,
        defaultColumn,
        getSubRows,
        getRowId,
        manualRowSelectKey,
        autoResetSelectedRow,
        manualPagination: pageCount !== undefined,
        pageCount,
        ...rest,
      },
      ...plugins,
      useFilters,
      useSortBy,
      usePagination,
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
      page,
      prepareRow,
      state,
    } = instance

    React.useEffect(() => {
      onSelectedRowsChange?.(Object.keys(state.selectedRowIds))
    }, [onSelectedRowsChange, state.selectedRowIds])

    React.useEffect(() => {
      onSortChange?.(state.sortBy)
    }, [onSortChange, state.sortBy])

    const noResults = state.filters.length && !rows.length && (
      <NoResultsComponent onReset={onResetFilters} />
    )

    const innerStyles = {
      ...styles.inner,
      ...(noResults ? { display: 'flex', alignItems: 'center' } : {}),
    }

    const table = (
      <Table
        {...getTableProps()}
        styleConfig={styleConfig}
        colorScheme={colorScheme}
        size={size}
        variant={variant}
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} userSelect="none">
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
          {page.map((row) => {
            prepareRow(row)

            const onClick = (e: React.MouseEvent) => onRowClick?.(row, e)

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
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {cell.render('Cell') as React.ReactNode}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )

    return (
      <DataGridProvider<Data> instance={instance}>
        <chakra.div
          className={cx('saas-data-grid', className)}
          __css={styles.container}
        >
          <chakra.div className="saas-data-grid__inner" __css={innerStyles}>
            {noResults || table}
          </chakra.div>
          {children}
        </chakra.div>
      </DataGridProvider>
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
          <ChevronDownIcon aria-label="sorted descending" />
        ) : (
          <ChevronUpIcon aria-label="sorted ascending" />
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
      {column.render('Header') as React.ReactNode}
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
