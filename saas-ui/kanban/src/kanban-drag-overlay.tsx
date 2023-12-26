import { Portal, PortalProps } from '@chakra-ui/react'

import {
  KanbanDragOverlay as KanbanDragOverlayCore,
  type KanbanDragOverlayProps as KanbanDragOverlayCoreProps,
} from '@saas-ui-pro/kanban-core'

export interface KanbanDragOverlayProps
  extends KanbanDragOverlayCoreProps,
    Omit<PortalProps, 'children'> {}

export const KanbanDragOverlay: React.FC<KanbanDragOverlayProps> = (props) => {
  const {
    children,
    containerRef,
    appendToParentPortal,
    dropAnimation,
    ...rest
  } = props
  return (
    <Portal
      containerRef={containerRef}
      appendToParentPortal={appendToParentPortal}
    >
      <KanbanDragOverlayCore {...rest} dropAnimation={dropAnimation}>
        {children}
      </KanbanDragOverlayCore>
    </Portal>
  )
}
