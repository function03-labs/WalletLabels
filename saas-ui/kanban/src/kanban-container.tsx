import React from 'react'
import { HTMLChakraProps, chakra, forwardRef } from '@chakra-ui/react'
import { cx, runIfFn } from '@chakra-ui/utils'
import { MaybeRenderProp } from '@chakra-ui/react-utils'

import { DndContext } from '@dnd-kit/core'
import {
  UseKanbanContainerProps,
  useKanbanContainer,
} from './use-kanban-container'
import { KanbanProvider } from './kanban-context'
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

export interface KanbanProps
  extends UseKanbanContainerProps,
    Omit<HTMLChakraProps<'div'>, 'children' | 'onChange'> {
  orientation?: 'horizontal' | 'vertical'
  children: MaybeRenderProp<ReturnType<typeof useKanbanContainer>>
  isSortable?: boolean
}

export const Kanban = forwardRef<KanbanProps, 'div'>((props, ref) => {
  const {
    orientation,
    children,
    isSortable,
    items,
    defaultItems,
    onChange,
    onCardDragEnd,
    onColumnDragEnd,
    ...rest
  } = props

  const context = useKanbanContainer(props)

  const { getDndContextProps, columns } = context

  const isVertical = orientation === 'vertical'

  const containerStyles = {
    display: 'inline-grid',
    boxSizing: 'border-box',
    gridAutoFlow: isVertical ? 'row' : 'column',
  }

  return (
    <KanbanProvider value={context}>
      <DndContext {...getDndContextProps()}>
        <chakra.div
          ref={ref}
          __css={containerStyles}
          {...rest}
          className={cx('sui-kanban', rest.className)}
        >
          <SortableContext
            disabled={isSortable === false}
            items={columns}
            strategy={
              isVertical
                ? verticalListSortingStrategy
                : horizontalListSortingStrategy
            }
          >
            {runIfFn(children, context)}
          </SortableContext>
        </chakra.div>
      </DndContext>
    </KanbanProvider>
  )
})
