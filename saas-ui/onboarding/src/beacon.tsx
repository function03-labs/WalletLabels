import * as React from 'react'

import {
  chakra,
  forwardRef,
  keyframes,
  useStyleConfig,
  HTMLChakraProps,
  ThemingProps,
  useTheme,
  SystemStyleObject,
} from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  55% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

export interface BeaconProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Beacon'> {}

const defaultStyleConfig: SystemStyleObject = {
  baseStyle: {
    bg: 'green.400',
    borderRadius: '50%',
    h: '4',
    w: '4',
    _before: {
      content: '""',
      d: 'block',
      w: '4',
      h: '4',
      animation: `${pulse} 1s ease-in-out infinite`,
      boxShadow: '0 0 2px 2px',
      color: 'green.400',
      borderRadius: '50%',
    },
  },
}

export const Beacon = forwardRef<BeaconProps, 'div'>((props, ref) => {
  const theme = useTheme()

  const styleConfig = theme.components.Beacon || defaultStyleConfig

  const styles = useStyleConfig('Beacon', {
    styleConfig,
    ...props,
  })

  return (
    <chakra.div
      ref={ref}
      {...props}
      __css={styles}
      className={cx('saas-beacon', props.className)}
    />
  )
})

if (__DEV__) {
  Beacon.displayName = 'Beacon'
}
