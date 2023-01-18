import { theme as baseTheme } from '@saas-ui/pro'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
  },
  baseTheme,
)
