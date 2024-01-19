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
  getExpandedRowModel,
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
  CheckboxProps,
  TableColumnHeaderProps,
  TableCellProps,
  IconButton,
  IconButtonProps,
  TableRowProps,
} from '@chakra-ui/react'

import { cx, dataAttr } from '@chakra-ui/utils'
import { VirtualizerOptions, useVirtualizer } from '@tanstack/react-virtual'

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

export interface DataGridColumnMeta<TData, TValue> {
  href?: (row: Row<TData>) => string
  isNumeric?: boolean
  headerProps?: TableColumnHeaderProps
  cellProps?: TableCellProps
  expanderProps?: DataGridExpanderProps
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue>
    extends DataGridColumnMeta<TData, TValue> {}
}

interface DataGridContextValue<Data extends object>
  extends Pick<DataGridProps<Data>, 'colorScheme' | 'variant' | 'size'> {
  instance: TableInstance<Data>
  icons?: DataGridIcons
  state: TableState
}

const DataGridContext = React.createContext<DataGridContextValue<any> | null>(
  null,
)

export const useDataGridIcons = () => {
  const { icons } = useDataGridContext()

  return icons
}

export interface DataGridProviderProps<Data extends object>
  extends Pick<DataGridProps<Data>, 'colorScheme' | 'variant' | 'size'> {
  instance: TableInstance<Data>
  icons?: DataGridIcons
  children: React.ReactNode
}

export const DataGridProvider = <Data extends object>(
  props: DataGridProviderProps<Data>,
) => {
  const {
    instance,
    children,
    colorScheme,
    variant,
    size,
    icons: iconsProp,
  } = props

  const icons = React.useMemo(() => iconsProp, [])

  const context: DataGridContextValue<Data> = {
    state: instance.getState(),
    instance,
    colorScheme,
    variant,
    size,
    icons,
  }

  return (
    <DataGridContext.Provider value={context}>
      {children}
    </DataGridContext.Provider>
  )
}

export interface DataGridIcons {
  sortAscending?: React.ReactElement
  sortDescending?: React.ReactElement
  rowExpanded?: React.ReactElement
  rowCollapsed?: React.ReactElement
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
   * Enable expandable rows
   */
  isExpandable?: boolean
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
  sx?: SystemStyleObject
  /**
   * DataGrid children
   */
  children?: React.ReactNode
  /**
   * Callback fired when the grid is scrolled.
   */
  onScroll?: React.UIEventHandler<HTMLDivElement>
  /**
   * React Virtual props
   */
  virtualizerProps?: VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>
  /**
   * CSS table-layout property
   * @default fixed
   */
  tableLayout?: 'auto' | 'fixed'
  /**
   * Custom icons
   * This prop is memoized and will not update after initial render.
   */
  icons?: DataGridIcons
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
      getSubRows = (row: any) => row.subRows,
      defaultColumn,
      getRowId,
      isSortable,
      isSelectable,
      isHoverable,
      isExpandable,
      onSelectedRowsChange,
      onSortChange,
      onRowClick,
      onResetFilters,
      onScroll,
      noResults: NoResultsComponent = NoResults,
      pageCount,
      colorScheme,
      size,
      variant,
      className,
      sx,
      virtualizerProps,
      tableLayout = 'fixed',
      icons,
      children,
      ...rest
    } = props

    const theme = useTheme()
    const styleConfig = theme.components?.SuiDataGrid

    const styles = useMultiStyleConfig('SuiDataGrid', {
      size,
      variant,
      colorScheme,
    })

    const instance = useReactTable<Data>({
      columns: React.useMemo(() => {
        const selectionColumn =
          columns?.[0]?.id === 'selection' ? columns[0] : undefined

        const expanderColumn = columns.find(({ id }) => id === 'expand')

        return getSelectionColumn<Data>(isSelectable, selectionColumn)
          .concat(getExpanderColumn(isExpandable, expanderColumn))
          .concat(
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
      getExpandedRowModel: getExpandedRowModel(),
      ...rest,
    })

    // This exposes the useTable api through the tableRef
    React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

    const state = instance.getState()
    const rows = instance.getRowModel().rows

    const scrollRef = React.useRef<HTMLDivElement>(null)
    const rowVirtualizer = useVirtualizer({
      getScrollElement: () => scrollRef.current,
      estimateSize: () => {
        switch (size) {
          case 'xl':
            return 69
          case 'lg':
            return 61
          case 'sm':
            return 45
          case 'md':
          default:
            return 53
        }
      },
      count: rows.length,
      overscan: 10,
      ...virtualizerProps,
    })

    const virtualRows = rowVirtualizer.getVirtualItems()
    const totalSize = rowVirtualizer.getTotalSize()

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

    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
    const paddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0

    const table = (
      <Table
        ref={ref}
        className={cx('sui-data-grid', className)}
        styleConfig={styleConfig}
        colorScheme={colorScheme}
        size={size}
        variant={variant}
        sx={{
          tableLayout: tableLayout,
          ...sx,
        }}
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
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]

            const onClick = (e: React.MouseEvent) => onRowClick?.(row, e)

            const ariaProps: TableRowProps = {}
            if (isExpandable) {
              ariaProps['aria-expanded'] = row.getIsExpanded()
            }
            if (isSelectable) {
              ariaProps['aria-selected'] = row.getIsSelected()
            }

            return (
              <Tr
                ref={rowVirtualizer.measureElement}
                key={virtualRow.index}
                onClick={onClick}
                data-index={virtualRow.index}
                data-selected={dataAttr(row.getIsSelected())}
                data-hover={dataAttr(isHoverable)}
                {...ariaProps}
                sx={{
                  '--data-grid-row-depth': String(row.depth),
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      {...meta?.cellProps}
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
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </Tbody>
      </Table>
    )

    return (
      <DataGridProvider<Data>
        instance={instance}
        colorScheme={colorScheme}
        variant={variant}
        size={size}
        icons={icons}
      >
        <chakra.div
          className={cx('sui-data-grid', className)}
          __css={styles.container}
        >
          <chakra.div
            ref={scrollRef}
            className="saas-data-grid__inner"
            __css={innerStyles}
            onScroll={onScroll}
          >
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

DataGrid.displayName = 'DataGrid'

export interface DataGridSortProps<Data extends object, TValue> {
  header: Header<Data, TValue>
}
export const DataGridSort = <Data extends object, TValue>(
  props: DataGridSortProps<Data, TValue>,
) => {
  const { header, ...rest } = props

  const sorterStyles = {
    _focusVisible: {
      outline: 'none',
      boxShadow: 'outline',
    },
    ms: 2,
  }

  const icons = useDataGridIcons()

  const sortDescendingIcon = icons?.sortDescending ?? <ChevronDownIcon />
  const sortAscendingIcon = icons?.sortAscending ?? <ChevronUpIcon />
  console.log(sortDescendingIcon)
  if (header.id === 'selection') {
    return null
  }

  const sorted = header.column.getIsSorted()

  if (!sorted) {
    return null
  }

  return (
    <chakra.button
      aria-label="Sort"
      tabIndex={-1}
      __css={sorterStyles}
      {...rest}
    >
      {sorted
        ? sorted === 'desc'
          ? sortDescendingIcon
          : sortAscendingIcon
        : ''}
    </chakra.button>
  )
}

DataGridSort.displayName = 'DataGridSort'

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
    const sorted = header.column.getIsSorted()
    headerProps = {
      className: 'saas-data-grid__sortable',
      userSelect: 'none',
      cursor: 'pointer',
      'aria-sort': sorted
        ? sorted === 'desc'
          ? 'descending'
          : 'ascending'
        : 'none',
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
      {...meta.headerProps}
      {...headerProps}
      {...rest}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {isSortable && header.column.getIsSorted() && (
        <DataGridSort header={header} />
      )}
    </Th>
  )
}

DataGridHeader.displayName = 'DataGridHeader'

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

  let content = getValue<React.ReactNode>()
  if (meta.href) {
    const href = getResult(meta.href, row.original)
    content = <Link href={href}>{content}</Link>
  }

  return content
}

DefaultDataGridCell.displayName = 'DefaultDataTableCell'

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
          enableSorting: false,
          header: ({ table }) => (
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

interface DataGridExpanderProps extends Omit<IconButtonProps, 'aria-label'> {
  isExpanded: boolean
  onToggle: (event: unknown) => void
  'aria-label'?: string
}

const DataGridExpander = forwardRef<DataGridExpanderProps, 'button'>(
  (props, ref) => {
    const { isExpanded, onToggle, ...rest } = props
    const { instance } = useDataGridContext()

    const icons = useDataGridIcons()

    if (!instance.getCanSomeRowsExpand()) {
      return null
    }

    const expandedIcon = icons?.rowExpanded ?? <ChevronDownIcon />
    const collapsedIcon = icons?.rowCollapsed ?? <ChevronUpIcon />

    return (
      <IconButton
        ref={ref}
        size="xs"
        variant="ghost"
        fontSize="1.2em"
        {...rest}
        aria-label={isExpanded ? 'Collapse all rows' : 'Expand all rows'}
        icon={isExpanded ? expandedIcon : collapsedIcon}
        onClick={onToggle}
      />
    )
  },
)

const getExpanderColumn = <Data extends object>(
  enabled?: boolean,
  columnDef?: ColumnDef<Data>,
) => {
  return enabled
    ? [
        {
          id: 'expand',
          header: ({ table, column }) => {
            const meta = (column.columnDef.meta || {}) as any
            return (
              <DataGridExpander
                {...meta.expanderProps}
                isExpanded={table.getIsAllRowsExpanded()}
                onToggle={table.getToggleAllRowsExpandedHandler()}
              />
            )
          },
          size: 38,
          enableSorting: false,
          meta: {
            headerProps: {
              px: 2,
            },
            cellProps: {
              px: 2,
              textOverflow: 'initial',
              ps: 'calc(calc(var(--data-grid-row-depth) + 1) * 0.5rem)',
            },
          },
          cell: ({ row, column }) => {
            const meta = (column.columnDef.meta || {}) as any
            return row.getCanExpand() ? (
              <DataGridExpander
                {...meta.expanderProps}
                isExpanded={row.getIsExpanded()}
                onToggle={row.getToggleExpandedHandler()}
              />
            ) : null
          },
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

  React.useEffect(
    () => {
      setColumnVisibility(getVisibleColumns(visibleColumns))
    },
    deps || [visibleColumns],
  )

  return columnVisibility
}
