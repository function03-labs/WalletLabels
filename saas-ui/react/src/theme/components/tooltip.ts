import { defineCssVars, defineStyleConfig } from '@chakra-ui/styled-system'

export default defineStyleConfig({
  baseStyle: {
    py: 1,
    borderRadius: 'base',
    borderColor: 'gray.300',
    _dark: {
      borderColor: 'whiteAlpha.300',
    },
  },
})
