import React from 'react'
import { KanbanTrash as KanbanTrashCore } from '@saas-ui-pro/kanban-core'
import { factory } from './utilities/factory'
import { HTMLChakraProps } from '@chakra-ui/react'

export const KanbanTrash = factory<
  HTMLChakraProps<'div'>,
  typeof KanbanTrashCore
>(KanbanTrashCore)
