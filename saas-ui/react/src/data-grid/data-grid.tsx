import * as React from 'react'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  Table as TableInstance,
  TableState,
  SortingState,
  PaginationState,
  ColumnFiltersState,
  RowSelectionState,
  flexRender,
  ColumnDef,
  ColumnSort,
  TableOptions,
  Header,
  Cell,
  Row,
  FilterFn,
  SortingFn,
  OnChangeFn,
  createColumnHelper,
  ColumnHelper,
  RowData,
} from '@tanstack/react-table'

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
  useTheme,
  useMultiStyleConfig,
  ThemingProps,
  SystemStyleObject,
  CSSObject,
  CheckboxProps,
} from '@chakra-ui/react'

import { cx, __DEV__, dataAttr } from '@chakra-ui/utils'

import { ChevronUpIcon, ChevronDownIcon } from '../icons'

import { Link } from '@saas-ui/react'

import { NoResults } from './no-results'

export type {
  ColumnDef,
  Row,
  TableInstance,
  SortingState,
  RowSelectionState,
  PaginationState,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  OnChangeFn,
}

interface DataGridContextValue<Data extends object>
  extends Pick<DataGridProps<Data>, 'colorScheme' | 'variant' | 'size'> {
  instance: TableInstance<Data>
  state: TableState
}

const DataGridContext = React.createContext<DataGridContextValue<any> | null>(
  null,
)

export interface DataGridProviderProps<Data extends object>
  extends Pick<DataGridProps<Data>, 'colorScheme' | 'variant' | 'size'> {
  instance: TableInstance<Data>
  children: React.ReactNode
}

export const DataGridProvider = <Data extends object>(
  props: DataGridProviderProps<Data>,
) => {
  const { instance, children, colorScheme, variant, size } = props

  const context: DataGridContextValue<Data> = {
    state: instance.getState(),
    instance,
    colorScheme,
    variant,
    size,
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

/**
 * Returns a memoized array of columns.
 *
 * @see https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers
 *
 * @param columnHelper Tanstack table column helper
 */
export const useColumns = <Data extends RowData, Columns = unknown>(
  factory: <TData>(
    columnHelper: Pick<ColumnHelper<Data>, 'accessor' | 'display'>,
  ) => Array<Columns>,
  deps: React.DependencyList,
) =>
  React.useMemo(() => {
    const columnHelper = createColumnHelper<Data>()
    return factory(columnHelper) as Array<ColumnDef<Data>>
  }, [...deps])

export interface DataGridProps<Data extends object>
  extends Omit<TableOptions<Data>, 'getCoreRowModel'>,
    ThemingProps<'SuiDataGrid'> {
  /**
   * The React Table instance reference
   */
  instanceRef?: React.Ref<TableInstance<Data>>
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
   * @params rows The selected row id'
   */
  onSelectedRowsChange?: (rows: Array<string>) => void
  /**
   * Triggers when sort changed.
   * Use incombination with `manualSortBy` to enable remote sorting.
   */
  onSortChange?: (columns: ColumnSort[]) => void
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
   * No results component
   */
  noResults?: React.FC<any>
  /**
   * The table class name attribute
   */
  className?: string
  /**
   * Grid styles
   */
  sx?: CSSObject
  /**
   * DataGrid children
   */
  children?: React.ReactNode
}

export const DataGrid = React.forwardRef(
  <Data extends object>(
    props: DataGridProps<Data>,
    ref: React.ForwardedRef<HTMLTableElement>,
  ) => {
    const {
      instanceRef,
      columns,
      data,
      initialState,
      getSubRows,
      defaultColumn,
      getRowId,
      isSortable,
      isSelectable,
      isHoverable,
      onSelectedRowsChange,
      onSortChange,
      onRowClick,
      onResetFilters,
      noResults: NoResultsComponent = NoResults,
      pageCount,
      colorScheme,
      size,
      variant,
      className,
      sx,
      children,
      ...rest
    } = props

    const theme = useTheme()
    const styleConfig = theme.components?.SuiDataGrid

    const styles = useMultiStyleConfig('SuiDataGrid', props) as Record<
      string,
      SystemStyleObject
    >

    const instance = useReactTable<Data>({
      columns: React.useMemo(() => {
        const selectionColumn =
          columns?.[0]?.id === 'selection' ? columns[0] : undefined
        return getSelectionColumn<Data>(isSelectable, selectionColumn).concat(
          columns
            ?.filter(({ id }) => id !== 'selection')
            .map((column: any) => {
              if (!column.accessorKey) {
                column.accessorKey = column.id
              }
              if (!column.cell) {
                column.cell = DefaultDataGridCell
              }
              return column
            }),
        )
      }, [columns]),
      data,
      initialState: React.useMemo(() => initialState, []),
      defaultColumn,
      getSubRows,
      getRowId,
      manualPagination: pageCount !== undefined,
      pageCount,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      ...rest,
    })

    // This exposes the useTable api through the tableRef
    React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

    const state = instance.getState()
    const rows = instance.getRowModel().rows

    React.useEffect(() => {
      onSelectedRowsChange?.(Object.keys(state.rowSelection))
    }, [onSelectedRowsChange, state.rowSelection, instance])

    React.useEffect(() => {
      onSortChange?.(state.sorting)
    }, [onSortChange, state.sorting])

    const noResults = (state.columnFilters.length || state.globalFilter) &&
      !rows.length && <NoResultsComponent onReset={onResetFilters} />

    const innerStyles = {
      ...styles.inner,
      ...(noResults ? { display: 'flex', alignItems: 'center' } : {}),
    }

    const table = (
      <Table
        ref={ref}
        className={cx('sui-data-grid', className)}
        styleConfig={styleConfig}
        colorScheme={colorScheme}
        size={size}
        variant={variant}
        sx={sx}
      >
        <Thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <DataGridHeader
                  key={header.id}
                  header={header}
                  isSortable={isSortable}
                />
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {rows.map((row) => {
            const onClick = (e: React.MouseEvent) => onRowClick?.(row, e)

            return (
              <Tr
                key={row.id}
                onClick={onClick}
                data-selected={dataAttr(row.getIsSelected())}
                data-hover={dataAttr(isHoverable)}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = (cell.column.columnDef.meta || {}) as any
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta.isNumeric}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
      <DataGridProvider<Data>
        instance={instance}
        colorScheme={colorScheme}
        variant={variant}
        size={size}
      >
        <chakra.div
          className={cx('sui-data-grid', className)}
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
) as (<Data extends object>(
  props: DataGridProps<Data> & {
    ref?: React.ForwardedRef<HTMLTableElement>
  },
) => React.ReactElement) & { displayName?: string }

if (__DEV__) {
  DataGrid.displayName = 'DataGrid'
}

export interface DataGridSortProps<Data extends object, TValue> {
  header: Header<Data, TValue>
}
export const DataGridSort = <Data extends object, TValue>(
  props: DataGridSortProps<Data, TValue>,
) => {
  const { header, ...rest } = props

  const sorterStyles = {
    ms: 2,
  }

  if (header.id === 'selection') {
    return null
  }

  const sorted = header.column.getIsSorted()

  return (
    <chakra.span __css={sorterStyles} {...rest}>
      {sorted ? (
        sorted === 'desc' ? (
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

if (__DEV__) {
  DataGridSort.displayName = 'DataGridSort'
}

export interface DataGridHeaderProps<Data extends object, TValue> {
  header: Header<Data, TValue>
  isSortable?: boolean
}
export const DataGridHeader = <Data extends object, TValue>(
  props: DataGridHeaderProps<Data, TValue>,
) => {
  const { header, isSortable, ...rest } = props

  let headerProps = {}

  if (isSortable && header.column.getCanSort()) {
    headerProps = {
      className: 'saas-data-grid__sortable',
      userSelect: 'none',
      cursor: 'pointer',
      onClick: header.column.getToggleSortingHandler(),
    }
  }

  const meta = (header.column.columnDef.meta || {}) as any
  const size = header.column.columnDef.size
  return (
    <Th
      colSpan={header.colSpan}
      textTransform="none"
      width={size && `${size}px`}
      isNumeric={meta.isNumeric}
      {...headerProps}
      {...rest}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {isSortable && <DataGridSort header={header} />}
    </Th>
  )
}

if (__DEV__) {
  DataGridHeader.displayName = 'DataGridHeader'
}

const getResult = <Data extends object>(
  fn: (row: Data) => string,
  params: Data,
): string => {
  if (typeof fn === 'function') {
    return fn(params)
  }
  return fn
}

export type DataGridCell<Data extends object> = ColumnDef<Data>['cell']

export const DefaultDataGridCell = <Data extends object, TValue>(
  props: Cell<Data, TValue>,
) => {
  const { column, row, getValue } = props

  const meta = (column.columnDef.meta || {}) as any

  if (meta.href) {
    const href = getResult(meta.href, row.original)
    return <Link href={href}>{getValue<React.ReactNode>()}</Link>
  }
  return getValue() || null
}

if (__DEV__) {
  DefaultDataGridCell.displayName = 'DefaultDataTableCell'
}

export const DataGridCheckbox = forwardRef<CheckboxProps, 'input'>(
  (props, ref) => {
    const onClick = React.useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      [],
    )

    const context = useDataGridContext()

    return (
      <chakra.div onClick={onClick}>
        <Checkbox ref={ref} colorScheme={context?.colorScheme} {...props} />
      </chakra.div>
    )
  },
)

const getSelectionColumn = <Data extends object>(
  enabled?: boolean,
  columnDef?: ColumnDef<Data>,
) => {
  return enabled
    ? [
        {
          id: 'selection',
          size: 1,
          enableHiding: false,
          header: ({ table, column }) => (
            <DataGridCheckbox
              isChecked={table.getIsAllRowsSelected()}
              isIndeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label={
                table.getIsAllRowsSelected()
                  ? 'Deselect all rows'
                  : 'Select all rows'
              }
            />
          ),
          cell: ({ row }) => (
            <DataGridCheckbox
              isChecked={row.getIsSelected()}
              isIndeterminate={row.getIsSomeSelected()}
              isDisabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label={row.getIsSelected() ? 'Deselect row' : 'Select row'}
            />
          ),
          ...columnDef,
        } as ColumnDef<Data>,
      ]
    : []
}

export interface UseColumnVisibilityProps<Data, VisibleColumns = string[]> {
  columns: ColumnDef<Data>[]
  visibleColumns?: VisibleColumns
}

/**
 * Helper hook to manage column visibility.
 * Only supports a single level of columns.
 */
export const useColumnVisibility = <Data extends object>(
  props: UseColumnVisibilityProps<Data>,
  deps?: React.DependencyList,
) => {
  const { columns, visibleColumns = [] } = props

  const getVisibleColumns = React.useCallback(
    (visibleColumns: string[]) => {
      return (
        columns.reduce<Record<string, boolean>>((memo, column) => {
          let id = column.id
          if (
            !id &&
            'accessorKey' in column &&
            typeof column.accessorKey === 'string'
          ) {
            id = column.accessorKey
          }
          if (id) {
            memo[id] =
              column.enableHiding !== false
                ? visibleColumns?.includes(id)
                : true
          }
          return memo
        }, {}) || {}
      )
    },
    [columns],
  )

  const [columnVisibility, setColumnVisibility] = React.useState(
    getVisibleColumns(visibleColumns),
  )

  React.useEffect(() => {
    setColumnVisibility(getVisibleColumns(visibleColumns))
  }, deps || [visibleColumns])

  return columnVisibility
}
