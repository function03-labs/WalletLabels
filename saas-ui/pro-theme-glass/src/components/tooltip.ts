import { defineCssVars, defineStyleConfig } from '@chakra-ui/styled-system'

const vars = defineCssVars('tooltip', ['bg', 'fg'])

export const tooltipStyles = defineStyleConfig({
  baseStyle: {
    py: 1,
    borderRadius: 'base',
    borderColor: 'gray.300',
    [vars.bg.variable]: 'colors.whiteAlpha.500',
    backdropFilter: 'blur(10px) contrast(100%) saturate(190%)',
    _dark: {
      borderColor: 'whiteAlpha.300',
      [vars.bg.variable]: 'colors.grayAlpha.700',
      backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
    },
  },
})
