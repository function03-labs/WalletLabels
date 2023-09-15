import React from 'react'

import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'

export interface KanbanActionProps extends ButtonProps {}

export const KanbanAction = forwardRef<KanbanActionProps, 'button'>(
  ({ className, style, ...props }, ref) => {
    return <Button ref={ref} {...props} tabIndex={0} variant="ghost" />
  },
)

const DragIcon = () => {
  return (
    <svg viewBox="0 0 20 20" width="12" fill="currentColor">
      <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
    </svg>
  )
}

export const KanbanHandle = forwardRef<KanbanActionProps, 'button'>(
  (props, ref) => {
    return (
      <KanbanAction ref={ref} cursor="grab" {...props}>
        {props.children || <DragIcon />}
      </KanbanAction>
    )
  },
)
