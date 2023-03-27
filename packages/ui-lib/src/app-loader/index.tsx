import * as React from 'react'

import { SaasUIGlyph } from '../logo/saas-ui-glyph'

import { Loader, LoaderProps } from '@saas-ui/react'
import { keyframes } from '@chakra-ui/react'

const scale = keyframes`
  0% {
    scale: 1.3;
  }
  100% {
    scale: 1;
  }
`

/**
 * Show a fullscreen loading animation while the app is loading.
 */
export const AppLoader: React.FC<LoaderProps> = (props) => {
  return (
    <Loader
      {...props}
      variant="fullscreen"
      spinner={
        <SaasUIGlyph
          boxSize="8"
          animation={`5s ease-out ${scale}`}
          opacity="0.8"
        />
      }
    />
  )
}
