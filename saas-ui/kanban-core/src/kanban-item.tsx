import React, { useEffect } from 'react'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'

import { useKanbanContext } from './kanban-context'
import { pulse, HTMLPulseProps } from './utilities/factory'
import { cx } from './utilities/cx'
import { dataAttr } from './utilities/data-attr'

const useMountStatus = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500)

    return () => clearTimeout(timeout)
  }, [])

  return isMounted
}

const useKanbanItem = (
  props: KanbanItemProps,
  ref: React.ForwardedRef<HTMLLIElement> | null,
) => {
  const { id, isDisabled } = props

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

  const [handle, setHandle] = React.useState<HTMLDivElement | null>(null)

  const { getIndex } = useKanbanContext()

  const index = getIndex(id)

  return {
    handle,
    setHandle,
    setNodeRef: isDisabled ? undefined : setNodeRef,
    getItemProps: React.useCallback(
      (props: KanbanItemProps) => ({
        ref: (node: HTMLLIElement) => {
          setNodeRef(node)

          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        },

        style: {
          transition,
          '--translate-x': transform
            ? `${Math.round(transform.x)}px`
            : undefined,
          '--translate-y': transform
            ? `${Math.round(transform.y)}px`
            : undefined,
          '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
          '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
          '--index': index,
          transform:
            'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
          transformOrigin: '0 0',
          ...props.style,
        } as React.CSSProperties,
        ...listeners,
        tabIndex: !handle ? 0 : undefined,
        ['data-dragging']: dataAttr(isDragging),
        ['data-sorting']: dataAttr(isSorting),
      }),
      [index, isDragging, isSorting, listeners, transform, transition, handle],
    ),
  }
}

export interface KanbanItemProps extends Omit<HTMLPulseProps<'li'>, 'id'> {
  id: UniqueIdentifier
  isDisabled?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export const KanbanItem = React.memo(
  React.forwardRef<HTMLLIElement, KanbanItemProps>((props, ref) => {
    const { id, children, isDisabled, asChild, ...rest } = props

    const { getItemProps } = useKanbanItem(props, ref)

    return (
      <pulse.li
        {...getItemProps(props)}
        data-id={id}
        {...rest}
        className={cx('sui-kanban__item', rest.className)}
      >
        {children}
      </pulse.li>
    )
  }),
)
