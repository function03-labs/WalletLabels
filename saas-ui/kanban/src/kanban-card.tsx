import React from 'react'

import { HTMLChakraProps } from '@chakra-ui/react'

import { KanbanItem, KanbanItemProps } from '@saas-ui-pro/kanban-core'
import { factory } from './utilities/factory'

export interface KanbanCardProps
  extends Omit<HTMLChakraProps<'li'>, 'id'>,
    Omit<KanbanItemProps, 'color'> {
  children: React.ReactNode
}

export const KanbanCard = factory<KanbanCardProps, typeof KanbanItem>(
  KanbanItem,
  {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    touchAction: 'manipulation',
    mb: 2,
    ['&[data-dragging]']: {
      opacity: 0,
    },
  },
)
