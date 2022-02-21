import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui/theme'

import components from './components'
import semanticTokens from './foundations/semantic-tokens'
import styles from './styles'

export const theme = extendTheme(
  {
    components,
    semanticTokens,
    styles,
  },
  baseTheme,
)
