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
} from '@tanstack/react-table'
import {
  HTMLChakraProps,
  forwardRef,
  useControllableState,
} from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'

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
      getRowId,
      initialState,
      state,
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

    const mapItems = React.useCallback(() => {
      const items: KanbanItems = {}
      instance.getRowModel().rows.forEach((row) => {
        if (row.getIsGrouped()) {
          items[row.id] = row.subRows.map((subRow) => subRow.id)
        }
      })
      return items
    }, [groupBy])

    React.useEffect(() => {
      setItems(mapItems())
    }, [groupBy])

    const [items, setItems] = React.useState(mapItems())

    return (
      <DataBoardProvider value={instance}>
        <Kanban ref={ref} items={items} onChange={setItems} {...rest}>
          {({ columns, items, activeId }) => {
            return (
              <>
                {columns.map((id) => {
                  const row = instance.getRowModel().rowsById[id]
                  return (
                    <KanbanColumn key={id} id={id} width="320px" px="4">
                      <KanbanColumnHeader>
                        {flexRender(renderHeader, row)}
                      </KanbanColumnHeader>
                      <KanbanColumnBody>
                        {items[id]?.map((itemId) => {
                          const item = instance.getRowModel().rowsById[itemId]
                          return (
                            <BoardCard
                              key={itemId}
                              item={item}
                              render={renderCard}
                            />
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
          }}
        </Kanban>
      </DataBoardProvider>
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

const BoardCard = React.memo(function BoardCard({
  item,
  render,
}: BoardCardProps) {
  return item ? (
    <KanbanCard key={item.id} id={item.id}>
      {flexRender(render, item)}
    </KanbanCard>
  ) : null
})
