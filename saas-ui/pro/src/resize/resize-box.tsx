import * as React from 'react'
import { cx, __DEV__ } from '@chakra-ui/utils'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { useResize, UseResizeProps } from './use-resize'
import { ResizeHandle } from './resize-handle'

export interface ResizeBoxProps
  extends HTMLChakraProps<'div'>,
    Omit<UseResizeProps, 'position'> {}

export const ResizeBox: React.FC<ResizeBoxProps> = (props) => {
  const {
    handlePosition,
    onResize,
    defaultWidth,
    isResizable = true,
    children,
    ...rest
  } = props

  const { getContainerProps, getHandleProps } = useResize({
    handlePosition,
    onResize,
    defaultWidth,
    isResizable,
  })

  return (
    <chakra.div
      {...rest}
      {...getContainerProps(rest)}
      className={cx('saas-resize-box', props.className)}
    >
      {children}

      {isResizable && <ResizeHandle {...getHandleProps()} />}
    </chakra.div>
  )
}

if (__DEV__) {
  ResizeBox.displayName = 'ResizeBox'
}
