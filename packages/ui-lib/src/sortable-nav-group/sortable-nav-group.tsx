import React from 'react'

import { Box, createIcon, Portal } from '@chakra-ui/react'
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { NavGroup, NavGroupProps, NavItem, NavItemProps } from '@saas-ui/react'

export interface SortableNavGroupProps
  extends Omit<NavGroupProps, 'onDragStart' | 'onDragEnd' | 'onDragOver'>,
    DndContextProps {
  items: any[]
  onSorted?: (fn: (items: any[]) => any[]) => void
}
export const SortableNavGroup: React.FC<SortableNavGroupProps> = (props) => {
  const {
    children,
    onDragStart,
    onDragOver,
    onDragEnd,
    onSorted,
    items,
    ...rest
  } = props

  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)
  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id)
  const activeIndex = activeId ? getIndex(activeId) : -1
  const activeItem = (
    React.Children.toArray(children) as React.ReactElement[]
  ).find(
    (child) => child.type === SortableNavItem && child.props.id === activeId,
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event

    if (over) {
      const overIndex = getIndex(over.id)
      if (activeIndex !== overIndex) {
        onSorted?.((items) => arrayMove(items, activeIndex, overIndex))
      }
    }

    setActiveId(null)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Press delay of 250ms, with tolerance of 2px of movement to make sure the nav items are clickable.
      activationConstraint: {
        delay: 100,
        tolerance: 0,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement to make sure the nav items are pressable.
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragStart={(event) => {
        if (!event.active) {
          return
        }
        setActiveId(event.active.id)
        onDragStart?.(event)
      }}
      onDragOver={onDragOver}
      onDragEnd={(event) => {
        handleDragEnd(event)
        onDragEnd?.(event)
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <NavGroup {...rest}>{children}</NavGroup>
      </SortableContext>
      <Portal>
        <DragOverlay
          dropAnimation={{
            duration: 50,
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.2',
                },
              },
            }),
          }}
        >
          {activeItem ? (
            <NavItem
              {...activeItem.props}
              my="0"
              _hover={{ bg: 'transparent' }}
              opacity="0.8"
            />
          ) : null}
        </DragOverlay>
      </Portal>
    </DndContext>
  )
}

export interface SortableNavItemProps extends NavItemProps {
  id: string
  handle?: React.ReactNode
}

export const SortableNavItem: React.FC<SortableNavItemProps> = (props) => {
  const { id, children, handle, ...rest } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: { duration: 150, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  })

  const itemProps = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : undefined,
    ...attributes,
    ...listeners,
  }

  return (
    <NavItem
      ref={setNodeRef}
      {...rest}
      {...itemProps}
      transitionProperty={
        isDragging || !!transform ? 'background, transform' : 'background'
      }
      data-dragging={isDragging || !!transform}
      data-sortable
      sx={{
        userSelect: 'none',
        WebkitUserDrag: 'none',
      }}
      ps="2"
      ms="1"
    >
      <Box
        display="none"
        pos="absolute"
        left="2px"
        color="muted"
        opacity="0.6"
        cursor="grab"
        data-drag-handle=""
        sx={{
          '[data-sortable]:hover &': { display: 'block' },
          '[data-dragging] &': { display: 'none' },
        }}
      >
        <GripIcon />
      </Box>
      {children}
    </NavItem>
  )
}

/**
 * Copied from Lucide Icons
 * https://lucide.dev
 */
const GripIcon = createIcon({
  displayName: 'GripIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="currentColor">
      <circle cx="9" cy="12" r="1"></circle>
      <circle cx="9" cy="5" r="1"></circle>
      <circle cx="9" cy="19" r="1"></circle>
      <circle cx="15" cy="12" r="1"></circle>
      <circle cx="15" cy="5" r="1"></circle>
      <circle cx="15" cy="19" r="1"></circle>
    </g>
  ),
})
