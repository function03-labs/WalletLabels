import * as React from 'react'
import { ResizeProvider, useResize, UseResizeProps } from './use-resize'

export interface ResizerProps extends UseResizeProps {
  children?: React.ReactElement
}

export const Resizer: React.FC<ResizerProps> = (props) => {
  const {
    handlePosition,
    onResize,
    defaultWidth,
    isResizable = true,
    children,
  } = props

  const { getContainerProps, getHandleProps } = useResize({
    handlePosition,
    onResize,
    defaultWidth,
    isResizable,
  })

  const context = {
    getContainerProps,
    getHandleProps,
    isResizable,
    handlePosition,
  }

  let _child
  if (React.isValidElement(children)) {
    _child = React.cloneElement(children, {
      ...(children.props || {}),
      ...getContainerProps(),
    })
  }

  return <ResizeProvider value={context}>{_child}</ResizeProvider>
}

Resizer.displayName = 'Resizer'
