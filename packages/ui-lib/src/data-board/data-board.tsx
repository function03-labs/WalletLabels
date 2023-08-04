import React from 'react'
import {
  Kanban,
  KanbanCard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnBody,
  KanbanDragOverlay,
  KanbanProps,
} from '@saas-ui-pro/kanban'
import {
  ColumnDef,
  GroupingState,
  Row,
  Table,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  HTMLChakraProps,
  forwardRef,
  useControllableState,
} from '@chakra-ui/react'

export interface DataBoardProps<Data = any>
  extends Omit<HTMLChakraProps<'div'>, 'onChange'>,
    Omit<TableOptions<Data>, 'getCoreRowModel'>,
    Pick<KanbanProps, 'onChange' | 'onCardDragEnd' | 'onColumnDragEnd'> {
  instanceRef?: React.Ref<Table<Data>>
  data: Data[]
  columns: ColumnDef<Data>[]
  renderHeader?: (item: Row<Data>) => React.ReactNode
  renderItem?: (item: Row<Data>) => React.ReactNode
  groupBy?: string
  defaultGroupBy?: string
  onGroupChange?: (group: string) => void
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
      renderItem = () => null,
      getRowId,
      initialState,
      state,
      ...rest
    } = props

    const _renderItem = React.useMemo(() => renderItem, [renderItem])
    const _renderHeader = React.useMemo(() => renderHeader, [renderHeader])

    const [grouping, setGrouping] = useControllableState<GroupingState>({
      defaultValue: defaultGroupBy ? [defaultGroupBy] : [],
      value: groupBy ? [groupBy] : [],
      onChange: (grouping) => onGroupChange?.(grouping[0]),
    })

    const instance = useReactTable({
      data: React.useMemo(() => data, []),
      columns: React.useMemo(() => columns, []),
      onGroupingChange: setGrouping,
      getGroupedRowModel: getGroupedRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId,
      initialState: React.useMemo(() => initialState, []),
      state: React.useMemo(
        () => ({
          ...state,
          grouping,
        }),
        [state],
      ),
      ...rest,
    })

    // This exposes the useReactTable api through the instanceRef
    React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

    const items = React.useMemo(() => {
      const items: Record<string, string[]> = {}
      instance.getRowModel().rows.forEach((row) => {
        if (row.getIsGrouped()) {
          items[row.id] = row.subRows.map((subRow) => subRow.id)
        }
      })
      return items
    }, [])

    return (
      <Kanban ref={ref} defaultItems={items} {...rest}>
        {({ columns, items, activeId }) => {
          return (
            <>
              {columns.map((id) => {
                const row = instance.getRowModel().rowsById[id]
                return (
                  <KanbanColumn key={id} id={id}>
                    <KanbanColumnHeader>
                      {flexRender(_renderHeader, row)}
                    </KanbanColumnHeader>
                    <KanbanColumnBody>
                      {items[id].map((itemId) => {
                        const item = instance.getRowModel().rowsById[itemId]
                        return item ? (
                          <KanbanCard key={item.id} id={item.id}>
                            {flexRender(_renderItem, item)}
                          </KanbanCard>
                        ) : null
                      })}
                    </KanbanColumnBody>
                  </KanbanColumn>
                )
              })}
              <KanbanDragOverlay>
                {activeId && (
                  <KanbanCard id={activeId}>
                    {_renderItem(instance.getRowModel().rowsById[activeId])}
                  </KanbanCard>
                )}
              </KanbanDragOverlay>
            </>
          )
        }}
      </Kanban>
    )
  },
) as (<Data extends object>(
  props: DataBoardProps<Data> & {
    ref?: React.ForwardedRef<HTMLDivElement>
  },
) => React.ReactElement) & { displayName?: string }
