import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui/pro-theme'

import components from './components'

export const theme = extendTheme(
  {
    components,
  },
  baseTheme,
)
