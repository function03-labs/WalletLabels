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

const variantOutline = defineStyle((props) => {
  return {
    ...variantGhost(props),
    color: 'inherit', // fix in main theme
  }
})

// const variantSecondary: SystemStyleFunction = (props) => {
//   return {
//     ...variantGhost({ ...props, colorScheme: 'gray' }),
//     color: 'black',
//     borderWidth: 1,
//     borderColor: 'gray.200',
//     _hover: {
//       borderColor: 'gray.300',
//       bg: 'gray.50',
//     },
//     _active: {
//       borderColor: 'gray.300',
//       bg: 'gray.100',
//     },
//     _dark: {
//       color: 'white',
//       borderColor: 'whiteAlpha.300',
//       _hover: {
//         bg: 'whiteAlpha.50',
//         borderColor: 'whiteAlpha.400',
//       },
//       _active: {
//         bg: 'whiteAlpha.100',
//         borderColor: 'whiteAlpha.500',
//       },
//     },
//   }
// }

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
    // secondary: variantSecondary,
    ghost: variantGhost,
    outline: variantOutline,
  },
  sizes,
}
