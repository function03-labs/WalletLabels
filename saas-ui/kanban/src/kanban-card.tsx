import React, { useEffect } from 'react'
import type { UniqueIdentifier } from '@dnd-kit/core'

import {
  chakra,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  SystemStyleObject,
  useMergeRefs,
  HTMLChakraProps,
} from '@chakra-ui/react'
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

const useKanbanCard = (props: KanbanCardProps) => {
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
    cardRef: isDisabled ? undefined : setNodeRef,
    getCardProps: React.useCallback(
      (props: KanbanCardProps) => ({
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

export interface KanbanCardProps extends Omit<HTMLChakraProps<'li'>, 'id'> {
  id: UniqueIdentifier
  isDisabled?: boolean
  children: React.ReactNode
}

export const KanbanCard = React.memo(
  React.forwardRef<HTMLLIElement, KanbanCardProps>((props, ref) => {
    const { id, children, isDisabled, ...rest } = props

    const { cardRef, getCardProps } = useKanbanCard(props)

    const styles: SystemStyleObject = {
      container: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        transform:
          'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
        transformOrigin: '0 0',
        touchAction: 'manipulation',
        mb: 2,
        ['&[data-dragging]']: {
          opacity: 0,
        },
      },
      item: {
        w: 'full',
        height: '100px',
      },
    }

    return (
      <chakra.li
        __css={styles.container}
        ref={useMergeRefs(ref, cardRef)}
        {...getCardProps(props)}
        data-id={id}
        {...rest}
      >
        {children}
      </chakra.li>
    )
  }),
)

export const KanbanCardBody = CardBody
export const KanbanCardHeader = CardHeader
export const KanbanCardFooter = CardFooter
