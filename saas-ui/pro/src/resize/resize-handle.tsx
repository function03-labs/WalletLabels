import * as React from 'react'
import { cx, __DEV__ } from '@chakra-ui/utils'
import { chakra, HTMLChakraProps } from '@chakra-ui/system'

export const ResizeHandle: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = {
    position: 'absolute',
    userSelect: 'none',
    width: '10px',
    height: '100%',
    top: '0px',
    right: '-5px',
    cursor: 'col-resize',
  }
  return (
    <chakra.div
      {...props}
      __css={styles}
      className={cx('saas-resize-handle', props.className)}
    />
  )
}

if (__DEV__) {
  ResizeHandle.displayName = 'ResizeHandle'
}
