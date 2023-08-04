import React from 'react'

import {
  KanbanCard,
  KanbanColumn,
  type KanbanColumnProps,
  Kanban,
  type KanbanProps,
  KanbanDragOverlay,
} from './'

import { createRange } from './utilities/create-range'
import { Card, CardBody } from '@chakra-ui/react'
import { KanbanColumnBody, KanbanColumnHeader } from './kanban-column'
import { KanbanCardProps } from './kanban-card'
import { useKanbanContext } from './kanban-context'
import {
  KanbanItems,
  OnCardDragEndHandler,
  OnColumnDragEndHandler,
} from './use-kanban-container'

export default {
  title: 'Components/Data Display/Kanban',
}

const columns: Record<string, { title: string }> = {
  backlog: {
    title: 'Backlog',
  },
  todo: {
    title: 'Todo',
  },
  doing: {
    title: 'Doing',
  },
  done: {
    title: 'Done',
  },
}

function BoardColumn({
  children,
  disabled,
  id,
  style,
  ...props
}: KanbanColumnProps & {
  disabled?: boolean
  id: string | number
}) {
  const { items } = useKanbanContext()

  return (
    <KanbanColumn id={id} {...props}>
      <KanbanColumnHeader>
        {columns[id]?.title} ({items[id]?.length})
      </KanbanColumnHeader>
      <KanbanColumnBody>{children}</KanbanColumnBody>
    </KanbanColumn>
  )
}

function BoardCard({ id, ...rest }: Omit<KanbanCardProps, 'children'>) {
  return (
    <KanbanCard id={id} {...rest}>
      <Card minHeight="100px" w="full">
        <CardBody>{id}</CardBody>
      </Card>
    </KanbanCard>
  )
}

function KanbanBoard(props: Omit<KanbanProps, 'children' | 'items'>) {
  const items = React.useMemo<KanbanItems>(() => {
    return {
      backlog: createRange(20, (index) => `backlog${index + 1}`),
      todo: createRange(20, (index) => `todo${index + 1}`),
      doing: createRange(20, (index) => `doing${index + 1}`),
      done: createRange(20, (index) => `done${index + 1}`),
    }
  }, [])

  const onCardDragEnd: OnCardDragEndHandler = React.useCallback((args) => {
    console.log(args)
  }, [])

  const onColumnDragEnd: OnColumnDragEndHandler = React.useCallback((args) => {
    console.log(args)
  }, [])

  return (
    <Kanban
      defaultItems={items}
      height="100%"
      onCardDragEnd={onCardDragEnd}
      onColumnDragEnd={onColumnDragEnd}
    >
      {({ columns, items, isSortingColumn, addColumn, activeId }) => {
        function renderSortableItemDragOverlay(id: string | number) {
          return <BoardCard id={id} cursor="grabbing" />
        }

        function renderColumnDragOverlay(columnId: string | number) {
          return (
            <KanbanColumn id={columnId}>
              {items[columnId].map((item, index) => (
                <BoardCard id={item} key={item} />
              ))}
            </KanbanColumn>
          )
        }
        return (
          <>
            {columns.map((columnId) => (
              <BoardColumn key={columnId} id={columnId}>
                {items[columnId].map((item, index) => {
                  return (
                    <BoardCard
                      isDisabled={isSortingColumn}
                      key={item}
                      id={item}
                    />
                  )
                })}
              </BoardColumn>
            ))}

            <KanbanColumn
              id="placeholder"
              isDisabled
              onClick={addColumn}
              bg="gray.800"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt="14"
              maxH="240px"
            >
              + Add column
            </KanbanColumn>
            <KanbanDragOverlay>
              {activeId
                ? columns.includes(activeId)
                  ? renderColumnDragOverlay(activeId)
                  : renderSortableItemDragOverlay(activeId)
                : null}
            </KanbanDragOverlay>
          </>
        )
      }}
    </Kanban>
  )
}

export const Basic = {
  render() {
    return <KanbanBoard />
  },
}
