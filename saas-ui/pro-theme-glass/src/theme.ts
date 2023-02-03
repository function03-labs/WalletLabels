import { extendTheme } from '@chakra-ui/react'

import { theme as proTheme } from '@saas-ui/pro'
import { theme as glassTheme } from '@saas-ui/theme-glass'

import semanticTokens from './foundations/semantic-tokens'
import { components } from './components'

export const theme = extendTheme(
  extendTheme(
    {
      components,
      semanticTokens,
    },
    glassTheme,
  ),
  proTheme,
)
