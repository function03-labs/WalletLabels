import { defineStyle } from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'

const variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      borderColor: 'default-border-color',
      _checked: {
        bg: 'blackAlpha.200',
        _dark: {
          bg: 'whiteAlpha.300',
        },
      },
    }
  }

  return {
    _checked: {
      bg: `${c}.100`,
      _dark: {
        bg: transparentize(`${c}.200`, 0.12)(theme),
      },
    },
  }
})

const sizes = {
  lg: defineStyle({
    h: '10',
    minW: '10',
    fontSize: 'md',
    px: '4',
  }),
  md: defineStyle({
    h: '8',
    minW: '8',
    fontSize: 'sm',
    px: '3',
  }),
  sm: defineStyle({
    h: '7',
    minW: '7',
    fontSize: 'xs',
    px: '2',
  }),
  xs: defineStyle({
    h: '6',
    minW: '6',
    fontSize: 'xs',
    px: '2',
  }),
}

export default {
  defaultProps: {
    size: 'md',
  },
  variants: {
    ghost: variantGhost,
  },
  sizes,
}
