import React from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'

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
import { KanbanItems } from './use-kanban-container'

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
  id: UniqueIdentifier
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

function getColor(id: UniqueIdentifier) {
  switch (String(id)[0]) {
    case 'A':
      return '#7193f1'
    case 'B':
      return '#ffda6c'
    case 'C':
      return '#00bcd4'
    case 'D':
      return '#ef769f'
  }

  return undefined
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

  return (
    <Kanban items={items} height="100%">
      {({ columns, items, isSortingColumn, addColumn, activeId }) => {
        function renderSortableItemDragOverlay(id: UniqueIdentifier) {
          return <BoardCard id={id} cursor="grabbing" />
        }

        function renderColumnDragOverlay(columnId: UniqueIdentifier) {
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
