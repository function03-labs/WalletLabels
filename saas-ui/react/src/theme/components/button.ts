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

  return variantOutline(props)
})

const variantOutline = defineStyle((props) => {
  const { colorScheme: c, theme } = props
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
  xs: defineStyle({
    h: '7',
    minW: '7',
    fontSize: 'xs',
    px: '2',
  }),
}

export default {
  variants: {
    ghost: variantGhost,
    outline: variantOutline,
  },
  sizes,
}
