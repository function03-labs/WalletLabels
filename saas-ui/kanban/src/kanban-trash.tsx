import React from 'react'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { useKanbanContext } from './kanban-context'
import { useDroppable } from '@dnd-kit/core'
import { dataAttr } from '@chakra-ui/utils'

export const KanbanTrash: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const { activeId, columns } = useKanbanContext()
  const { setNodeRef, isOver } = useDroppable({
    id: 'void',
  })

  if (!activeId || columns.includes(activeId)) {
    return null
  }

  return (
    <chakra.div ref={setNodeRef} data-over={dataAttr(isOver)} {...props}>
      {props.children}
    </chakra.div>
  )
}
