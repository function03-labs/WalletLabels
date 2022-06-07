import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui/pro/theme'
import { withThemeColors } from '@saas-ui/pro'

import components from './components'

import colorScheme from './color-schemes/galaxy'

export const theme = extendTheme(
  {
    components,
  },
  /**
   * Uncomment this to use any of the build in color schemes.
   */
  // withThemeColors(colorScheme),
  baseTheme,
)
