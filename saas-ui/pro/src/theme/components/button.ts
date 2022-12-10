import { SystemStyleFunction, transparentize } from '@chakra-ui/theme-tools'

const variantGhost: SystemStyleFunction = (props) => {
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
}

const variantOutline: SystemStyleFunction = (props) => {
  return variantGhost(props)
}

const variantSecondary: SystemStyleFunction = (props) => {
  return {
    ...variantGhost({ ...props, colorScheme: 'gray' }),
    color: 'black',
    borderWidth: 1,
    borderColor: 'gray.200',
    _hover: {
      borderColor: 'gray.300',
      bg: 'gray.50',
    },
    _active: {
      borderColor: 'gray.300',
      bg: 'gray.100',
    },
    _dark: {
      color: 'white',
      borderColor: 'whiteAlpha.300',
      _hover: {
        bg: 'whiteAlpha.50',
        borderColor: 'whiteAlpha.400',
      },
      _active: {
        bg: 'whiteAlpha.100',
        borderColor: 'whiteAlpha.500',
      },
    },
  }
}

export default {
  variants: {
    secondary: variantSecondary,
    ghost: variantGhost,
    outline: variantOutline,
  },
}
