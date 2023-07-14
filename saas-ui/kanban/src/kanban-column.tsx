import React from 'react'
import { ButtonGroup, HTMLChakraProps, chakra } from '@chakra-ui/react'

import { Handle, Remove } from './kanban-action'

import { forwardRef } from '@chakra-ui/react'
import { cx, dataAttr } from '@chakra-ui/utils'
import { useKanbanContext } from './kanban-context'
import { UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { createContext } from '@chakra-ui/react-utils'
import { animateLayoutChanges } from './utilities/animate-layout-changes'

export type KanbanColumnContext = ReturnType<typeof useKanbanColumn>

export const [KanbanColumnProvider, useKanbanColumnContext] =
  createContext<KanbanColumnContext>()

const useKanbanColumn = (props: KanbanColumnProps) => {
  const { id, orientation, isDisabled } = props
  const { items } = useKanbanContext()

  const columnItems = items[id] ?? []

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
      children: columnItems,
    },
    animateLayoutChanges,
  })

  const isOverColumn = over
    ? (id === over.id && active?.data.current?.type !== 'Column') ||
      columnItems.includes(over.id)
    : false

  return {
    id,
    orientation,
    items: columnItems,
    getColumnProps: React.useCallback(
      () => ({
        ref: isDisabled ? undefined : setNodeRef,
        transition,
        transform: CSS.Translate.toString(transform),
        ['data-dragging']: dataAttr(isDragging),
        ['data-hover']: dataAttr(isOverColumn),
      }),
      [isOverColumn],
    ),
    getHandleProps: React.useCallback(
      () => ({
        ...attributes,
        ...listeners,
      }),
      [],
    ),
  }
}

export interface KanbanColumnProps extends Omit<HTMLChakraProps<'div'>, 'id'> {
  id: UniqueIdentifier
  isDisabled?: boolean
  children: React.ReactNode
  columns?: number
  orientation?: 'horizontal' | 'vertical'
}

export const KanbanColumn = forwardRef<KanbanColumnProps, 'div'>(
  (props, ref) => {
    const {
      id,
      children,
      columns = 1,
      orientation,
      onClick,
      style,
      isDisabled,
      ...rest
    } = props

    const columnStyles = {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      flex: 1,
      padding: '0.5rem',
      borderRadius: '0.25rem',
      minWidth: '280px',
      minHeight: '1px',
      _hover: 'rgba(0, 0, 0, 0.05)',
    }

    const context = useKanbanColumn(props)

    return (
      <KanbanColumnProvider value={context}>
        <chakra.div
          {...rest}
          ref={ref}
          __css={columnStyles}
          style={
            {
              ...style,
              '--columns': columns,
            } as React.CSSProperties
          }
          onClick={onClick}
          tabIndex={onClick ? 0 : undefined}
          className={cx('sui-kanban__column', props.className)}
        >
          {children}
        </chakra.div>
      </KanbanColumnProvider>
    )
  },
)

export const KanbanColumnBody: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const { children, ...rest } = props
  const { orientation, items } = useKanbanColumnContext()

  const isVertical = orientation !== 'horizontal'

  const bodyStyles = {
    flex: 1,
    ...(isVertical ? { overflowX: 'auto' } : { overflowY: 'auto' }),
  }

  const strategy = isVertical
    ? verticalListSortingStrategy
    : horizontalListSortingStrategy

  return (
    <chakra.ul
      {...rest}
      className={cx('sui-kanban__column-body', props.className)}
      __css={bodyStyles}
    >
      <SortableContext
        disabled={!items?.length}
        items={items}
        strategy={strategy}
      >
        {children}
      </SortableContext>
    </chakra.ul>
  )
}

export const KanbanColumnHeader: React.FC<HTMLChakraProps<'header'>> = (
  props,
) => {
  const { children, ...rest } = props
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }
  return (
    <chakra.header __css={styles.header} {...rest}>
      {children}
    </chakra.header>
  )
}

export const KanbanColumnActions = ButtonGroup
