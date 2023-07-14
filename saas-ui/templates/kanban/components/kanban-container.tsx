import React from 'react'
import { chakra } from '@chakra-ui/react'
import { runIfFn } from '@chakra-ui/utils'
import { MaybeRenderProp } from '@chakra-ui/react-utils'

import { DndContext } from '@dnd-kit/core'
import {
  UseKanbanContainerProps,
  useKanbanContainer,
} from './use-kanban-container'
import { KanbanProvider } from './kanban-context'

interface KanbanContainerProps extends UseKanbanContainerProps {
  adjustScale?: boolean
  columns?: number
  ColumnStyle?: React.CSSProperties
  itemCount?: number
  handle?: boolean
  renderItem?: any
  minimal?: boolean
  trashable?: boolean
  scrollable?: boolean
  orientation?: 'horizontal' | 'vertical'
  children: MaybeRenderProp<ReturnType<typeof useKanbanContainer>>
}

export function KanbanContainer(props: KanbanContainerProps) {
  const { orientation, children } = props

  const context = useKanbanContainer(props)

  const { getDndContextProps } = context

  const isVertical = orientation === 'vertical'

  const containerStyles = {
    display: 'inline-grid',
    boxSizing: 'border-box',
    padding: 20,
    gridAutoFlow: isVertical ? 'row' : 'column',
  }

  return (
    <KanbanProvider value={context}>
      <DndContext {...getDndContextProps()}>
        <chakra.div __css={containerStyles}>
          {runIfFn(children, context)}
        </chakra.div>
      </DndContext>
    </KanbanProvider>
  )
}
