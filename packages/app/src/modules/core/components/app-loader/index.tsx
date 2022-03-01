import * as React from 'react'

import { chakra, ChakraProps } from '@chakra-ui/react'

import { SaasUIGlyph } from '../logo/saas-ui-glyph'

import { AnimatePresence, motion, MotionProps } from 'framer-motion'

const Motion = chakra(motion.div)

export interface AppLoaderProps
  extends Omit<MotionProps, 'transition'>,
    ChakraProps {
  isLoading: boolean
}

/**
 * Show a fullscreen loading animation while the app is loading.
 */
export const AppLoader: React.FC<AppLoaderProps> = (props) => {
  const { isLoading, children, ...rest } = props

  return (
    <AnimatePresence>
      {isLoading && (
        <Motion
          position="fixed"
          top="0"
          right="0"
          bottom="0"
          left="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="app.background"
          zIndex="modal"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...rest}
        >
          {children || <SaasUIGlyph width="48px" height="48px" isAnimating />}
        </Motion>
      )}
    </AnimatePresence>
  )
}
