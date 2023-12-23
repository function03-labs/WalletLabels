import { Portal, PortalProps } from '@chakra-ui/react'
import {
  DragOverlay,
  DragOverlayProps,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

export interface KanbanDragOverlayProps
  extends DragOverlayProps,
    Omit<PortalProps, 'children'> {}

export const KanbanDragOverlay: React.FC<KanbanDragOverlayProps> = (props) => {
  const {
    children,
    containerRef,
    appendToParentPortal,
    dropAnimation: dropAnimationProp,
    ...rest
  } = props
  return (
    <Portal
      containerRef={containerRef}
      appendToParentPortal={appendToParentPortal}
    >
      <DragOverlay {...rest} dropAnimation={dropAnimationProp ?? dropAnimation}>
        {children}
      </DragOverlay>
    </Portal>
  )
}
