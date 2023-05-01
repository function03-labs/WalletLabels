import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme, withThemeColors } from '@saas-ui-pro/react'
// import { theme as baseTheme } from '@saas-ui-pro/theme-glass'

import semanticTokens from './foundations/semantic-tokens'
import { components } from './components'

// import colorScheme from './color-schemes/galaxy'
// import colorScheme from './color-schemes/earth'

export const theme = extendTheme(
  {
    semanticTokens,
    components,
  },
  /**
   * Uncomment this to use any of the built-in color schemes.
   */
  // withThemeColors(colorScheme),
  baseTheme,
)
