import * as React from 'react'

import { SaasUIGlyph } from '../logo/saas-ui-glyph'

import { Loader, LoaderProps } from '@saas-ui/react'

/**
 * Show a fullscreen loading animation while the app is loading.
 */
export const AppLoader: React.FC<LoaderProps> = (props) => {
  return (
    <Loader
      {...props}
      variant="fullscreen"
      spinner={<SaasUIGlyph width="48px" height="48px" isAnimating />}
    />
  )
}
