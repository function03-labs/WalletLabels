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

export interface KanbanDragOverlayProps extends DragOverlayProps {}

export const KanbanDragOverlay: React.FC<KanbanDragOverlayProps> = (props) => {
  const { children, dropAnimation: dropAnimationProp, ...rest } = props
  return (
    <DragOverlay {...rest} dropAnimation={dropAnimationProp ?? dropAnimation}>
      {children}
    </DragOverlay>
  )
}
