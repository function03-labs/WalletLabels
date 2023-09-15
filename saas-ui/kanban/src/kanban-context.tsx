import { createContext } from '@chakra-ui/react-utils'
import { UseKanbanContainerReturn } from './use-kanban-container'

export const [KanbanProvider, useKanbanContext] =
  createContext<UseKanbanContainerReturn>()
