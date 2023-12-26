import React, { forwardRef } from 'react'

import { pulse, HTMLPulseProps } from './utilities/factory'

export interface KanbanActionProps extends HTMLPulseProps<'button'> {}

export const KanbanAction = forwardRef<HTMLButtonElement, KanbanActionProps>(
  (props, ref) => {
    return <pulse.button ref={ref} {...props} tabIndex={0} />
  },
)

const DragIcon = () => {
  return (
    <svg viewBox="0 0 20 20" width="12" fill="currentColor">
      <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
    </svg>
  )
}

export const KanbanHandle = forwardRef<HTMLButtonElement, KanbanActionProps>(
  (props, ref) => {
    return (
      <KanbanAction ref={ref} {...props}>
        {props.children || <DragIcon />}
      </KanbanAction>
    )
  },
)
