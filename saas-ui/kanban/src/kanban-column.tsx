import React from 'react'
import { ButtonGroup, HTMLChakraProps, forwardRef } from '@chakra-ui/react'

import { KanbanActionProps, KanbanHandle } from './kanban-action'

import {
  KanbanColumn as KanbanColumnCore,
  type KanbanColumnProps as KanbanColumnCoreProps,
  KanbanColumnHeader as KanbanColumnHeaderCore,
  KanbanColumnBody as KanbanColumnBodyCore,
  useKanbanColumnContext,
} from '@saas-ui-pro/kanban-core'
import { factory } from './utilities/factory'

export interface KanbanColumnProps
  extends Omit<KanbanColumnCoreProps, 'color'>,
    Omit<HTMLChakraProps<'div'>, 'id'> {
  children: React.ReactNode
}

export const KanbanColumn = factory<KanbanColumnProps, typeof KanbanColumnCore>(
  KanbanColumnCore,
  {
    display: 'flex',
    flex: 1,
    padding: '0.5rem',
    borderRadius: '0.25rem',
    minWidth: '280px',
    minHeight: '1px',
    flexDirection: 'column',
    _horizontal: {
      flexDirection: 'row',
    },
  },
)

export const KanbanColumnBody = factory<
  HTMLChakraProps<'ul'>,
  typeof KanbanColumnBodyCore
>(KanbanColumnBodyCore, {
  flex: 1,
  '[data-orientation="horizontal"] > &': {
    overflowY: 'auto',
  },
  '[data-orientation="vertical"] > &': {
    overflowX: 'auto',
  },
})

export const KanbanColumnHeader = factory<
  HTMLChakraProps<'div'>,
  typeof KanbanColumnHeaderCore
>(KanbanColumnHeaderCore, {
  display: 'flex',
  justifyContent: 'space-between',
})

export const KanbanColumnActions = ButtonGroup

export interface KanbanColumnDragHandleProps extends KanbanActionProps {}

export const KanbanColumnDragHandle = forwardRef<
  KanbanColumnDragHandleProps,
  'button'
>((props, ref) => {
  const { getHandleProps } = useKanbanColumnContext()

  return <KanbanHandle ref={ref} {...getHandleProps()} {...props} />
})
