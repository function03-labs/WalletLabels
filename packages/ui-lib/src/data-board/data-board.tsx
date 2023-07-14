import React from 'react'
import {
  Kanban,
  KanbanCard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnBody,
  KanbanDragOverlay,
} from '@saas-ui-pro/kanban'
import {
  ColumnDef,
  GroupingState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DragOverlay, UniqueIdentifier } from '@dnd-kit/core'
import {
  Card,
  CardBody,
  Portal,
  forwardRef,
  useControllableState,
} from '@chakra-ui/react'

export interface DataBoardProps<Data = unknown> {
  instanceRef?: React.MutableRefObject<Table<Data>>
  data: Data[]
  columns: ColumnDef<Data>[]
  renderHeader: (item: Record<string, any>) => React.ReactNode
  renderItem: (item: Record<string, any>) => React.ReactNode
  groupBy?: string
  defaultGroupBy?: string
  onGroupChange?: (group: string) => void
}

export const DataBoard = forwardRef<DataBoardProps, 'div'>((props, ref) => {
  const {
    instanceRef,
    data,
    columns,
    groupBy,
    defaultGroupBy,
    onGroupChange,
    renderItem,
    renderHeader,
    getRowId,
    initialState,
    state,
    ...rest
  } = props

  const _renderItem = React.useMemo(() => renderItem, [])
  const _renderHeader = React.useMemo(() => renderHeader, [])

  // const [grouping, setGrouping] = useControllableState<GroupingState>({
  //   defaultValue: defaultGroupBy ? [defaultGroupBy] : [],
  //   value: groupBy ? [groupBy] : [],
  //   onChange: (grouping) => onGroupChange?.(grouping[0]),
  // })

  const instance = useReactTable({
    data: React.useMemo(() => data, []),
    columns: React.useMemo(() => columns, []),
    // onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    getRowId,
    initialState,
    state: {
      ...state,
      grouping: groupBy ? [groupBy] : [],
    },
    ...rest,
  })

  // This exposes the useReactTable api through the instanceRef
  React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

  const items = React.useMemo(() => {
    const items: Record<UniqueIdentifier, UniqueIdentifier[]> = {}
    instance.getRowModel().rows.forEach((row) => {
      if (row.getIsGrouped()) {
        items[row.id] = row.subRows.map((subRow) => subRow.id)
      }
    })
    return items
  }, [])

  const content = React.useMemo(
    () =>
      instance.getRowModel().rows.map((row) => {
        if (row.getIsGrouped()) {
          return null
          // <KanbanColumn key={row.id} id={row.id}>
          //   <KanbanColumnHeader>
          //     {flexRender(_renderHeader, row)}
          //   </KanbanColumnHeader>
          //   <KanbanColumnBody>
          //     {row.subRows.map((subRow) => {
          //       return (
          //         <KanbanCard key={subRow.id} id={subRow.id}>
          //           {flexRender(_renderItem, subRow)}
          //         </KanbanCard>
          //       )
          //     })}
          //   </KanbanColumnBody>
          // </KanbanColumn>
        }
      }),
    [instance.getRowModel().rows],
  )

  return content
  // <Kanban ref={ref} items={items} {...rest}>
  //   {({ activeId }) => {
  //     return (
  //       <>
  //         {content}
  //         <KanbanDragOverlay>
  //           {activeId && (
  //             <KanbanCard id={activeId}>
  //               {_renderItem(instance.getRowModel().rowsById[activeId])}
  //             </KanbanCard>
  //           )}
  //         </KanbanDragOverlay>
  //       </>
  //     )
  //   }}
  // </Kanban>
})
