import React from 'react'
import { useDroppable } from '@dnd-kit/core'

import { pulse, HTMLPulseProps } from './utilities/factory'
import { dataAttr } from './utilities/data-attr'

import { useKanbanContext } from './kanban-context'

export const KanbanTrash: React.FC<HTMLPulseProps<'div'>> = (props) => {
  const { activeId, columns } = useKanbanContext()
  const { setNodeRef, isOver } = useDroppable({
    id: 'void',
  })

  if (!activeId || columns.includes(activeId)) {
    return null
  }

  return (
    <pulse.div ref={setNodeRef} data-over={dataAttr(isOver)} {...props}>
      {props.children}
    </pulse.div>
  )
}
