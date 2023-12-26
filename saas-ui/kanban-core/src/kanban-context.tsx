import React from 'react'
import { UseKanbanContainerReturn } from './use-kanban-container'

const KanbanContext = React.createContext<UseKanbanContainerReturn | null>(null)

export const useKanbanContext = () => {
  const context = React.useContext(KanbanContext)

  if (!context) {
    throw new Error('useKanbanContext must be used within a KanbanProvider')
  }

  return context
}

export const KanbanProvider = KanbanContext.Provider
