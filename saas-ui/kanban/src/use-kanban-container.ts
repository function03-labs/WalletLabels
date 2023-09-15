import React, { useCallback, useEffect, useRef, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  DndContextProps,
} from '@dnd-kit/core'
import { arrayMove, SortingStrategy } from '@dnd-kit/sortable'
import { coordinateGetter as _coordinateGetter } from './utilities/coordinate-getter'
import { useControllableState } from '@chakra-ui/react'

export type KanbanItems = Record<UniqueIdentifier, UniqueIdentifier[]>

export const TRASH_ID = 'void'
export const PLACEHOLDER_ID = 'placeholder'

export type OnCardDragEndHandler = (args: {
  items: KanbanItems
  from: {
    columnId: UniqueIdentifier
    index: number
  }
  to: {
    columnId: UniqueIdentifier
    index: number
  }
}) => void

export type OnColumnDragEndHandler = (args: {
  items: KanbanItems
  from: {
    index: number
  }
  to: {
    index: number
  }
}) => void

export interface UseKanbanContainerProps {
  cancelDrop?: CancelDrop
  coordinateGetter?: KeyboardCoordinateGetter
  defaultItems?: KanbanItems
  items?: KanbanItems
  strategy?: SortingStrategy
  modifiers?: Modifiers
  orientation?: 'horizontal' | 'vertical'
  onChange?: (items: KanbanItems) => void
  onCardDragEnd?: OnCardDragEndHandler
  onColumnDragEnd?: OnColumnDragEndHandler
}

export const useKanbanContainer = (props: UseKanbanContainerProps) => {
  const {
    cancelDrop,
    coordinateGetter = _coordinateGetter,
    defaultItems,
    items: itemsProp,
    onChange,
    modifiers,
    onCardDragEnd,
    onColumnDragEnd,
  } = props

  const [items, setItems] = useControllableState<KanbanItems>({
    defaultValue: defaultItems,
    value: itemsProp,
    onChange,
  })

  useEffect(() => {
    setColumns(Object.keys(items) as UniqueIdentifier[])
  }, [items])

  const [columns, setColumns] = useState(
    Object.keys(items) as UniqueIdentifier[],
  )

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const initialPosition = useRef<{
    columnId: UniqueIdentifier
    index: number
  } | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewColumn = useRef(false)
  const isSortingColumn = activeId ? columns.includes(activeId) : false

  /**
   * Custom collision detection strategy optimized for multiple Columns
   *
   * - First, find any droppable Columns intersecting with the pointer.
   * - If there are none, find intersecting Columns with the active draggable.
   * - If there are no intersecting Columns, return the last matched intersection
   *
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (column) => column.id in items,
          ),
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return intersections
        }

        if (overId in items) {
          const columnItems = items[overId]
          if (columnItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (column) =>
                  column.id !== overId && columnItems.includes(column.id),
              ),
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // When a draggable item moves to a new Column, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new Column, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewColumn.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, items],
  )

  const [clonedItems, setClonedItems] = useState<KanbanItems | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    }),
  )

  const findColumn = (id: UniqueIdentifier) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) => items[key].includes(id))
  }

  const getIndex = (id: UniqueIdentifier) => {
    const column = findColumn(id)

    if (!column) {
      return -1
    }

    const index = items[column].indexOf(id)

    return index
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across Columns
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewColumn.current = false
    })
  }, [items])

  const getDndContextProps = (): DndContextProps => {
    return {
      sensors,
      collisionDetection: collisionDetectionStrategy,
      measuring: {
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      },
      onDragStart: ({ active }) => {
        initialPosition.current = {
          columnId: findColumn(active.id) || '',
          index: getIndex(active.id),
        }
        setActiveId(active.id)
        setClonedItems(items)
      },
      onDragOver: ({ active, over }) => {
        const overId = over?.id

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return
        }

        const overColumn = findColumn(overId)
        const activeColumn = findColumn(active.id)

        if (!overColumn || !activeColumn) {
          return
        }

        if (activeColumn !== overColumn) {
          setItems((items) => {
            const activeItems = items[activeColumn]
            const overItems = items[overColumn]
            const overIndex = overItems.indexOf(overId)
            const activeIndex = activeItems.indexOf(active.id)

            let newIndex: number

            if (overId in items) {
              newIndex = overItems.length + 1
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height

              const modifier = isBelowOverItem ? 1 : 0

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            recentlyMovedToNewColumn.current = true

            return {
              ...items,
              [activeColumn]: items[activeColumn].filter(
                (item) => item !== active.id,
              ),
              [overColumn]: [
                ...items[overColumn].slice(0, newIndex),
                items[activeColumn][activeIndex],
                ...items[overColumn].slice(newIndex, items[overColumn].length),
              ],
            }
          })
        }
      },
      onDragEnd: ({ active, over }) => {
        if (active.id in items && over?.id) {
          setColumns((columns) => {
            const activeIndex = columns.indexOf(active.id)
            const overIndex = columns.indexOf(over.id)

            onColumnDragEnd?.({
              items,
              from: {
                index: activeIndex,
              },
              to: {
                index: overIndex,
              },
            })

            return arrayMove(columns, activeIndex, overIndex)
          })
        }

        const activeColumn = findColumn(active.id)

        if (!activeColumn) {
          setActiveId(null)
          return
        }

        const overId = over?.id

        if (overId == null) {
          setActiveId(null)
          return
        }

        // remove a card
        if (overId === TRASH_ID) {
          setItems((items) => ({
            ...items,
            [activeColumn]: items[activeColumn].filter((id) => id !== activeId),
          }))
          setActiveId(null)
          return
        }

        // create a new column
        if (overId === PLACEHOLDER_ID) {
          const newColumnId = getNextColumnId()

          unstable_batchedUpdates(() => {
            setColumns((columns) => [...columns, newColumnId])
            setItems((items) => ({
              ...items,
              [activeColumn]: items[activeColumn].filter(
                (id) => id !== activeId,
              ),
              [newColumnId]: [active.id],
            }))
            setActiveId(null)
          })
          return
        }

        const overColumn = findColumn(overId)

        if (overColumn) {
          const activeIndex = items[activeColumn].indexOf(active.id)
          const overIndex = items[overColumn].indexOf(overId)

          if (activeIndex !== overIndex) {
            setItems((items) => {
              const updatedItems = {
                ...items,
                [overColumn]: arrayMove(
                  items[overColumn],
                  activeIndex,
                  overIndex,
                ),
              }

              onCardDragEnd?.({
                items: updatedItems,
                from: initialPosition.current as any,
                to: {
                  columnId: overColumn,
                  index: overIndex,
                },
              })

              return updatedItems
            })
          } else if (initialPosition.current) {
            onCardDragEnd?.({
              items,
              from: initialPosition.current as any,
              to: {
                columnId: overColumn,
                index: overIndex,
              },
            })
          }
        }

        setActiveId(null)
        initialPosition.current = null
      },
      cancelDrop,
      onDragCancel,
      modifiers,
    }
  }

  function removeColumn(columnId: UniqueIdentifier) {
    setColumns((columns) => columns.filter((id) => id !== columnId))
  }

  function addColumn(id: string) {
    const newColumnId = id || getNextColumnId()

    unstable_batchedUpdates(() => {
      setColumns((columns) => [...columns, newColumnId])
      setItems((items) => ({
        ...items,
        [newColumnId]: [],
      }))
    })
  }

  function getNextColumnId() {
    const columnIds = Object.keys(items)
    const lastColumnId = columnIds[columnIds.length - 1]

    return String.fromCharCode(lastColumnId.charCodeAt(0) + 1)
  }

  return {
    getDndContextProps,
    getNextColumnId,
    removeColumn,
    addColumn,
    findColumn,
    activeId,
    columns,
    items,
    isSortingColumn,
    getIndex,
  }
}

export type UseKanbanContainerReturn = ReturnType<typeof useKanbanContainer>
