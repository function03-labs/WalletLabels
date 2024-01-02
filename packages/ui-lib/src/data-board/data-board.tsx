'use client'

import React from 'react'
import {
  Kanban,
  KanbanCard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnBody,
  KanbanDragOverlay,
  KanbanProps,
  KanbanItems,
  UseKanbanContainerReturn,
} from '@saas-ui-pro/kanban'
import {
  ColumnDef,
  GroupingState,
  Row,
  GroupingRow,
  Table,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  useReactTable,
  RowData,
} from '@tanstack/react-table'
import {
  HTMLChakraProps,
  forwardRef,
  useControllableState,
} from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import { DataGridProvider, NoResults } from '@saas-ui-pro/react'

export const [DataBoardProvider, useDataBoardContext] =
  createContext<Table<any>>()

export type DataBoardHeaderProps = GroupingRow

export interface DataBoardProps<Data extends object>
  extends Omit<HTMLChakraProps<'div'>, 'onChange'>,
    Omit<TableOptions<Data>, 'getCoreRowModel'>,
    Pick<KanbanProps, 'onChange' | 'onCardDragEnd' | 'onColumnDragEnd'> {
  instanceRef?: React.Ref<Table<Data>>
  data: Data[]
  columns: ColumnDef<Data>[]
  renderHeader?: (item: GroupingRow) => React.ReactNode
  renderCard?: (item: Row<Data>) => React.ReactNode
  groupBy?: string
  defaultGroupBy?: string
  onGroupChange?: (group: string) => void
  /**
   * Callback fired when clear filters is clicked.
   */
  onResetFilters?: () => void
  /**
   * No results component
   */
  noResults?: React.FC<any>
  hideEmptyColumns?: boolean
}

export const DataBoard = forwardRef(
  <Data extends object>(
    props: DataBoardProps<Data>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      instanceRef,
      data,
      columns,
      groupBy,
      defaultGroupBy,
      onGroupChange,
      renderHeader = () => null,
      renderCard = () => null,
      onResetFilters,
      noResults: NoResultsComponent = NoResults,
      getRowId,
      initialState: initialStateProp,
      state: stateProp,
      hideEmptyColumns,
      ...rest
    } = props

    const [grouping, setGrouping] = useControllableState<GroupingState>({
      defaultValue: defaultGroupBy ? [defaultGroupBy] : [],
      value: groupBy ? [groupBy] : [],
      onChange: (grouping) => {
        onGroupChange?.(grouping[0])
      },
    })

    const instance = useReactTable({
      data: React.useMemo(() => data, []),
      columns: React.useMemo(() => columns, []),
      groupedColumnMode: false,
      onGroupingChange: setGrouping,
      getGroupedRowModel: getGroupedRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId,
      initialState: React.useMemo(() => initialStateProp, []),
      state: React.useMemo(
        () => ({
          ...stateProp,
          grouping,
        }),
        [stateProp],
      ),
      ...rest,
    })

    // This exposes the useReactTable api through the instanceRef
    React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

    const state = instance.getState()

    const rows = instance.getRowModel().rows

    const noResults = (state.columnFilters?.length || state.globalFilter) &&
      !rows.length && <NoResultsComponent onReset={onResetFilters} />

    const mapItems = React.useCallback(() => {
      const items: KanbanItems = groupBy
        ? getColumns(instance.getPreFilteredRowModel().rows, groupBy)
        : {}

      instance.getRowModel().rows.forEach((row) => {
        if (row.getIsGrouped()) {
          items[row.id] = row.subRows.map((subRow) => subRow.id)
        }
      })
      return items
    }, [groupBy, rows])

    React.useEffect(() => {
      setItems(mapItems())
    }, [groupBy, rows])

    const [items, setItems] = React.useState<KanbanItems>({})

    const board = ({ columns, items, activeId }: UseKanbanContainerReturn) => {
      return (
        <>
          {columns.map((id) => {
            const row = instance.getRowModel().rowsById[id]

            if (!row && hideEmptyColumns) {
              return null
            }

            // fallback when this column is empty
            const [groupingColumnId, groupingValue] = String(id).split(':')

            return (
              <KanbanColumn key={id} id={id} width="320px" px="4">
                <KanbanColumnHeader>
                  {flexRender(
                    renderHeader,
                    row || { id, groupingValue, groupingColumnId },
                  )}
                </KanbanColumnHeader>
                <KanbanColumnBody>
                  {items[id]?.map((itemId) => {
                    const item = instance.getRowModel().rowsById[itemId]
                    return (
                      <BoardCard key={itemId} item={item} render={renderCard} />
                    )
                  })}
                </KanbanColumnBody>
              </KanbanColumn>
            )
          })}
          <KanbanDragOverlay>
            {activeId && (
              <KanbanCard id={activeId}>
                {renderCard(instance.getRowModel().rowsById[activeId])}
              </KanbanCard>
            )}
          </KanbanDragOverlay>
        </>
      )
    }

    return (
      <DataGridProvider instance={instance}>
        <DataBoardProvider value={instance}>
          <Kanban ref={ref} items={items} onChange={setItems} {...rest}>
            {noResults || board}
          </Kanban>
        </DataBoardProvider>
      </DataGridProvider>
    )
  },
) as (<Data extends object>(
  props: DataBoardProps<Data> & {
    ref?: React.ForwardedRef<HTMLDivElement>
  },
) => React.ReactElement) & { displayName?: string }

interface BoardCardProps {
  item: Row<any>
  render: (item: Row<any>) => React.ReactNode
}

const BoardCard = React.memo(
  function BoardCard({ item, render }: BoardCardProps) {
    return item ? (
      <KanbanCard key={item.id} id={item.id}>
        {flexRender(render, item)}
      </KanbanCard>
    ) : null
  },
  (prevProps, nextProps) => {
    // Only re-render if the item data has changed.
    if (prevProps.item?.original !== nextProps.item?.original) {
      return false
    }
    return true
  },
)

function getColumns<TData extends RowData>(
  rows: Row<TData>[],
  groupBy: string,
) {
  return rows.reduce<Record<string, any>>((columns, row) => {
    const resKey = `${groupBy}:${row.getGroupingValue(groupBy)}`
    columns[resKey] = []
    return columns
  }, {})
}
