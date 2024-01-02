import React from 'react'
import { HTMLChakraProps } from '@chakra-ui/react'
import {
  Kanban as KanbanCore,
  type KanbanProps as KanbanCoreProps,
} from '@saas-ui-pro/kanban-core'

import { factory } from './utilities/factory'

export interface KanbanProps
  extends Omit<KanbanCoreProps, 'color'>,
    Omit<HTMLChakraProps<'div'>, 'children' | 'onChange'> {}

export const Kanban = factory<KanbanProps, typeof KanbanCore>(KanbanCore, {
  display: 'inline-grid',
  boxSizing: 'border-box',
  gridAutoFlow: 'column',
  _vertical: {
    gridAutoFlow: 'row',
  },
})
