import React from 'react'

import {
  KanbanCard,
  KanbanColumn,
  type KanbanColumnProps,
  Kanban,
  KanbanDragOverlay,
} from './'

import { createRange } from './utilities/create-range'
import { Button, Card, CardBody, Spacer } from '@chakra-ui/react'
import {
  KanbanColumnBody,
  KanbanColumnDragHandle,
  KanbanColumnHeader,
} from './kanban-column'
import { KanbanCardProps } from './kanban-card'
import { useKanbanContext } from './kanban-context'
import {
  KanbanItems,
  OnCardDragEndHandler,
  OnColumnDragEndHandler,
} from './use-kanban-container'
import { KanbanTrash } from './kanban-trash'

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
  canceled: {
    title: 'Canceled',
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

const defaultItems: KanbanItems = {
  backlog: createRange(20, (index) => `backlog${index + 1}`),
  todo: createRange(20, (index) => `todo${index + 1}`),
  doing: createRange(20, (index) => `doing${index + 1}`),
  done: createRange(20, (index) => `done${index + 1}`),
}

export function Basic() {
  return (
    <Kanban defaultItems={defaultItems}>
      {({ columns, items, activeId }) => {
        return (
          <>
            {columns.map((columnId) => (
              <BoardColumn key={columnId} id={columnId}>
                {items[columnId].map((itemId) => {
                  return <BoardCard key={itemId} id={itemId} />
                })}
              </BoardColumn>
            ))}

            <KanbanDragOverlay>
              {activeId ? <BoardCard id={activeId} cursor="grabbing" /> : null}
            </KanbanDragOverlay>
          </>
        )
      }}
    </Kanban>
  )
}

export function Controlled() {
  const [items, setItems] = React.useState(defaultItems)

  console.log(items)

  return (
    <Kanban items={items} onChange={setItems}>
      {({ columns, items, activeId }) => {
        return (
          <>
            {columns.map((columnId) => (
              <BoardColumn key={columnId} id={columnId}>
                {items[columnId].map((itemId) => {
                  return <BoardCard key={itemId} id={itemId} />
                })}
              </BoardColumn>
            ))}

            <KanbanDragOverlay>
              {activeId ? <BoardCard id={activeId} cursor="grabbing" /> : null}
            </KanbanDragOverlay>
          </>
        )
      }}
    </Kanban>
  )
}

function DraggableBoardColumn({
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
        <Spacer />
        <KanbanColumnDragHandle />
      </KanbanColumnHeader>
      <KanbanColumnBody>{children}</KanbanColumnBody>
    </KanbanColumn>
  )
}

export function DraggableColumns() {
  return (
    <Kanban defaultItems={defaultItems}>
      {({ columns, items, isSortingColumn, activeId }) => {
        function renderSortableItemDragOverlay(id: string | number) {
          return <BoardCard id={id} cursor="grabbing" />
        }

        function renderColumnDragOverlay(columnId: string | number) {
          return (
            <KanbanColumn id={columnId}>
              {items[columnId].map((itemId) => (
                <BoardCard id={itemId} key={itemId} />
              ))}
            </KanbanColumn>
          )
        }
        return (
          <>
            {columns.map((columnId) => (
              <DraggableBoardColumn key={columnId} id={columnId}>
                {items[columnId].map((itemId) => {
                  return (
                    <BoardCard
                      isDisabled={isSortingColumn}
                      key={itemId}
                      id={itemId}
                    />
                  )
                })}
              </DraggableBoardColumn>
            ))}

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

export function AddColumn() {
  return (
    <Kanban defaultItems={defaultItems}>
      {({ columns, items, isSortingColumn, activeId, addColumn }) => {
        return (
          <>
            {columns.map((columnId) => (
              <BoardColumn key={columnId} id={columnId}>
                {items[columnId].map((itemId) => {
                  return (
                    <BoardCard
                      isDisabled={isSortingColumn}
                      key={itemId}
                      id={itemId}
                    />
                  )
                })}
              </BoardColumn>
            ))}

            {!columns.includes('canceled') ? (
              <Button onClick={() => addColumn('canceled')}>
                Show cancelled tasks
              </Button>
            ) : null}

            <KanbanDragOverlay>
              {activeId ? <BoardCard id={activeId} cursor="grabbing" /> : null}
            </KanbanDragOverlay>
          </>
        )
      }}
    </Kanban>
  )
}

export function Trash() {
  return (
    <Kanban defaultItems={defaultItems}>
      {({ columns, items, isSortingColumn, activeId }) => {
        return (
          <>
            {columns.map((columnId) => (
              <BoardColumn key={columnId} id={columnId}>
                {items[columnId].map((itemId) => {
                  return (
                    <BoardCard
                      isDisabled={isSortingColumn}
                      key={itemId}
                      id={itemId}
                    />
                  )
                })}
              </BoardColumn>
            ))}

            <KanbanTrash>
              <Card>
                <CardBody>Drag items here to remove them.</CardBody>
              </Card>
            </KanbanTrash>

            <KanbanDragOverlay>
              {activeId ? <BoardCard id={activeId} cursor="grabbing" /> : null}
            </KanbanDragOverlay>
          </>
        )
      }}
    </Kanban>
  )
}

export function EventHandlers() {
  const onCardDragEnd: OnCardDragEndHandler = React.useCallback((args) => {
    console.log(args)
  }, [])

  const onColumnDragEnd: OnColumnDragEndHandler = React.useCallback((args) => {
    console.log(args)
  }, [])

  return (
    <Kanban
      defaultItems={defaultItems}
      height="100%"
      onCardDragEnd={onCardDragEnd}
      onColumnDragEnd={onColumnDragEnd}
    >
      {({ columns, items, isSortingColumn, activeId }) => {
        function renderSortableItemDragOverlay(id: string | number) {
          return <BoardCard id={id} cursor="grabbing" />
        }

        function renderColumnDragOverlay(columnId: string | number) {
          return (
            <KanbanColumn id={columnId}>
              {items[columnId].map((itemId) => (
                <BoardCard id={itemId} key={itemId} />
              ))}
            </KanbanColumn>
          )
        }
        return (
          <>
            {columns.map((columnId) => (
              <BoardColumn key={columnId} id={columnId}>
                {items[columnId].map((itemId) => {
                  return (
                    <BoardCard
                      isDisabled={isSortingColumn}
                      key={itemId}
                      id={itemId}
                    />
                  )
                })}
              </BoardColumn>
            ))}

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
