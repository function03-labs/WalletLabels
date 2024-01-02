import React, { forwardRef } from 'react'
import { HTMLPulseProps, pulse } from './utilities/factory'

import { useKanbanContext } from './kanban-context'
import { UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { animateLayoutChanges } from './utilities/animate-layout-changes'
import { KanbanActionProps, KanbanHandle } from './kanban-action'
import { useMergeRefs } from './utilities/use-merge-refs'
import { dataAttr } from './utilities/data-attr'
import { cx } from './utilities/cx'

export type KanbanColumnContext = ReturnType<typeof useKanbanColumn>

const KanbanColumnContext = React.createContext<KanbanColumnContext | null>(
  null,
)

export const useKanbanColumnContext = () => {
  const context = React.useContext(KanbanColumnContext)

  if (!context) {
    throw new Error('useKanbanColumnContext must be used within a KanbanColumn')
  }

  return context
}

export const KanbanColumnProvider = KanbanColumnContext.Provider

const useKanbanColumn = (props: KanbanColumnProps) => {
  const { id, orientation = 'vertical', isDisabled, columns = 1, style } = props
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
    columnRef: isDisabled ? null : setNodeRef,
    getColumnProps: React.useCallback(
      () => ({
        style: {
          ...style,
          '--columns': columns,
          transition,
          transform: CSS.Translate.toString(transform),
        } as React.CSSProperties,
        ['data-orientation']: orientation,
        ['data-dragging']: dataAttr(isDragging),
        ['data-over']: dataAttr(isOverColumn),
      }),
      [transition, transform, isDragging, isOverColumn],
    ),
    getHandleProps: React.useCallback(
      () => ({
        ...attributes,
        ...listeners,
      }),
      [attributes, listeners],
    ),
  }
}

export interface KanbanColumnProps extends Omit<HTMLPulseProps<'div'>, 'id'> {
  id: UniqueIdentifier
  isDisabled?: boolean
  children: React.ReactNode
  columns?: number
  orientation?: 'horizontal' | 'vertical'
}

export const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnProps>(
  (props, ref) => {
    const { id, children, onClick, isDisabled, ...rest } = props

    const context = useKanbanColumn(props)

    return (
      <KanbanColumnProvider value={context}>
        <pulse.div
          {...rest}
          ref={useMergeRefs(ref, context.columnRef as any)}
          onClick={onClick}
          tabIndex={onClick ? 0 : undefined}
          className={cx('sui-kanban__column', props.className)}
          {...context.getColumnProps()}
        >
          {children}
        </pulse.div>
      </KanbanColumnProvider>
    )
  },
)

export const KanbanColumnBody = forwardRef<
  HTMLUListElement,
  HTMLPulseProps<'ul'>
>((props, ref) => {
  const { children, ...rest } = props
  const { orientation, items } = useKanbanColumnContext()

  const isVertical = orientation !== 'horizontal'

  const strategy = isVertical
    ? verticalListSortingStrategy
    : horizontalListSortingStrategy

  return (
    <pulse.ul
      {...rest}
      ref={ref}
      className={cx('sui-kanban__column-body', props.className)}
    >
      <SortableContext
        disabled={!items?.length}
        items={items}
        strategy={strategy}
      >
        {children}
      </SortableContext>
    </pulse.ul>
  )
})

export const KanbanColumnHeader = forwardRef<
  HTMLDivElement,
  HTMLPulseProps<'header'>
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <pulse.header
      ref={ref}
      {...rest}
      className={cx('sui-kanban__column-header', props.className)}
    >
      {children}
    </pulse.header>
  )
})

export const KanbanColumnActions = forwardRef<
  HTMLDivElement,
  HTMLPulseProps<'div'>
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <pulse.div
      ref={ref}
      {...rest}
      className={cx('sui-kanban__column-actions', props.className)}
    >
      {children}
    </pulse.div>
  )
})

export interface KanbanColumnDragHandleProps extends KanbanActionProps {}

/**
 *
 */
export const KanbanColumnDragHandle = forwardRef<
  HTMLButtonElement,
  KanbanColumnDragHandleProps
>((props, ref) => {
  const { getHandleProps } = useKanbanColumnContext()

  return <KanbanHandle ref={ref} {...getHandleProps()} {...props} />
})
