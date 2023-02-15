import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'

import { components } from './components'
import semanticTokens from './foundations/semantic-tokens'
import * as typography from './foundations/typography'
import styles from './styles'

export const theme = extendTheme(
  {
    components,
    semanticTokens,
    styles,
    ...typography,
  },
  baseTheme,
)
