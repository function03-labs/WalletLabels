import React, { useEffect } from 'react'
import type { UniqueIdentifier } from '@dnd-kit/core'

import { ark, HTMLArkProps } from '@ark-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { dataAttr } from '@chakra-ui/utils'
import { useKanbanContext } from './kanban-context'

const useMountStatus = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500)

    return () => clearTimeout(timeout)
  }, [])

  return isMounted
}

const useKanbanCard = (
  props: KanbanCardProps,
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
    getCardProps: React.useCallback(
      (props: KanbanCardProps) => ({
        ref: (node: HTMLLIElement) => {
          setNodeRef(node)

          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        },
        transition,
        style: {
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

export interface KanbanCardProps extends Omit<HTMLArkProps<'li'>, 'id'> {
  id: UniqueIdentifier
  isDisabled?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export const KanbanCard = React.memo(
  React.forwardRef<HTMLLIElement, KanbanCardProps>((props, ref) => {
    const { id, children, isDisabled, asChild, ...rest } = props

    const { setNodeRef, getCardProps } = useKanbanCard(props, ref)

    // const styles: SystemStyleObject = {
    //   display: 'flex',
    //   alignItems: 'stretch',
    //   justifyContent: 'stretch',
    //   transform:
    //     'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
    //   transformOrigin: '0 0',
    //   touchAction: 'manipulation',
    //   mb: 2,
    //   ['&[data-dragging]']: {
    //     opacity: 0,
    //   },
    // }

    return (
      <ark.li {...getCardProps(props)} data-id={id} {...rest}>
        {children}
      </ark.li>
    )
  }),
)
