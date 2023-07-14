import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal, unstable_batchedUpdates } from 'react-dom'

import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { coordinateGetter as multipleContainersCoordinateGetter } from './multipleContainersKeyboardCoordinates'

import {
  KanbanItem,
  KanbanColumn,
  type KanbanColumnProps,
  KanbanContainer,
} from './components'

import { createRange } from './utilities/createRange'
import { useKanbanContext } from './components/kanban-context'
import { Card, CardBody, HTMLChakraProps, Portal } from '@chakra-ui/react'

export default {
  title: 'Templates/Kanban',
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

function DroppableColumn({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: KanbanColumnProps & {
  disabled?: boolean
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  style?: React.CSSProperties
}) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: 'Column',
      children: items,
    },
    animateLayoutChanges,
  })
  const isOverColumn = over
    ? (id === over.id && active?.data.current?.type !== 'Column') ||
      items.includes(over.id)
    : false

  return (
    <KanbanColumn
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverColumn}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}
    >
      {children}
    </KanbanColumn>
  )
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>

interface KanbanContainerProps {
  adjustScale?: boolean
  cancelDrop?: CancelDrop
  columns?: number
  ColumnStyle?: React.CSSProperties
  coordinateGetter?: KeyboardCoordinateGetter
  itemCount?: number
  items?: Items
  handle?: boolean
  renderItem?: any
  strategy?: SortingStrategy
  modifiers?: Modifiers
  minimal?: boolean
  trashable?: boolean
  scrollable?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const PLACEHOLDER_ID = 'placeholder'
const empty: UniqueIdentifier[] = []

function Kanban(props: KanbanContainerProps) {
  const {
    adjustScale = false,
    columns: columnCount,
    handle = false,
    ColumnStyle,
    minimal = false,
    renderItem,
    strategy = verticalListSortingStrategy,
    orientation,
    scrollable,
  } = props

  const isVertical = orientation === 'vertical'

  return (
    <KanbanContainer>
      {({
        columns,
        items,
        removeColumn,
        isSortingColumn,
        getIndex,
        addColumn,
        activeId,
        findColumn,
      }) => {
        function renderSortableItemDragOverlay(id: UniqueIdentifier) {
          return (
            <KanbanItem
              value={id}
              handle={handle}
              color={getColor(id)}
              renderItem={renderItem}
              dragOverlay
            />
          )
        }

        function renderColumnDragOverlay(ColumnId: UniqueIdentifier) {
          return (
            <KanbanColumn
              label={`Column ${ColumnId}`}
              columns={columnCount}
              style={{
                height: '100%',
              }}
              shadow
              unstyled={false}
            >
              {items[ColumnId].map((item, index) => (
                <KanbanItem
                  key={item}
                  value={item}
                  handle={handle}
                  color={getColor(item)}
                  renderItem={renderItem}
                />
              ))}
            </KanbanColumn>
          )
        }
        return (
          <>
            <SortableContext
              items={[...columns, PLACEHOLDER_ID]}
              strategy={
                isVertical
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            >
              {columns.map((ColumnId) => (
                <DroppableColumn
                  key={ColumnId}
                  id={ColumnId}
                  label={minimal ? undefined : `Column ${ColumnId}`}
                  columns={columnCount}
                  items={items[ColumnId]}
                  scrollable={scrollable}
                  style={ColumnStyle}
                  unstyled={minimal}
                  onRemove={() => removeColumn(ColumnId)}
                >
                  <SortableContext items={items[ColumnId]} strategy={strategy}>
                    {items[ColumnId].map((value, index) => {
                      return (
                        <SortableItem
                          disabled={isSortingColumn}
                          key={value}
                          id={value}
                          index={index}
                          handle={handle}
                          renderItem={renderItem}
                          ColumnId={ColumnId}
                          getIndex={getIndex}
                        />
                      )
                    })}
                  </SortableContext>
                </DroppableColumn>
              ))}
              {minimal ? undefined : (
                <DroppableColumn
                  id={PLACEHOLDER_ID}
                  disabled={isSortingColumn}
                  items={empty}
                  onClick={addColumn}
                  placeholder
                >
                  + Add column
                </DroppableColumn>
              )}
            </SortableContext>
            <Portal>
              <DragOverlay
                adjustScale={adjustScale}
                dropAnimation={dropAnimation}
              >
                {activeId
                  ? columns.includes(activeId)
                    ? renderColumnDragOverlay(activeId)
                    : renderSortableItemDragOverlay(activeId)
                  : null}
              </DragOverlay>
            </Portal>
          </>
        )
      }}
    </KanbanContainer>
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

interface SortableItemProps {
  ColumnId: UniqueIdentifier
  id: UniqueIdentifier
  index: number
  handle: boolean
  disabled?: boolean
  getIndex(id: UniqueIdentifier): number
  renderItem(): React.ReactElement
}

function SortableItem({
  disabled,
  id,
  index,
  handle,
  renderItem,
  ColumnId,
  getIndex,
}: SortableItemProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  })
  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted

  return (
    <KanbanItem
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      color={getColor(id)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    >
      <Card
        data-cypress="draggable-item"
        {...(!handle ? listeners : undefined)}
        // {...props}
        tabIndex={!handle ? 0 : undefined}
        mb="2"
      >
        <CardBody>{id}</CardBody>
      </Card>
    </KanbanItem>
  )
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500)

    return () => clearTimeout(timeout)
  }, [])

  return isMounted
}

export const Basic = {
  render() {
    return <Kanban />
  },
}
