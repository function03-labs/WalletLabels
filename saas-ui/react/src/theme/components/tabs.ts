import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { tabsAnatomy as parts } from '@chakra-ui/anatomy'

const { definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const variantSegments = definePartsStyle((props) => {
  const { theme } = props

  return {
    tablist: {
      display: 'flex',
      rounded: 'md',
      alignItems: 'center',
    },
    tab: {
      ...theme.components.Button.baseStyle,
      ...theme.components.Button.variants.ghost(props),
      borderWidth: '1px',
      borderColor: 'gray.200',
      color: 'muted',
      rounded: 0,
      position: 'relative',
      '&:not(:last-of-type)': {
        marginEnd: '-1px',
      },
      _dark: {
        borderColor: 'whiteAlpha.300',
        _hover: {},
      },
      _first: {
        borderLeftRadius: 'md',
        borderRightRadius: 0,
      },
      _last: {
        borderRightRadius: 'md',
        borderLeftRadius: 0,
      },
      _hover: {
        color: 'black',
        zIndex: 1,
        borderColor: 'gray.300',
        bg: 'gray.50',
        _dark: {
          color: 'white',
          borderColor: 'whiteAlpha.400',
          bg: 'whiteAlpha.50',
        },
      },
      _selected: {
        ...theme.components.Button.variants.secondary(props),
        borderColor: 'gray.300',
        bg: 'gray.50',
        _dark: {
          color: 'white',
          borderColor: 'whiteAlpha.400',
          bg: 'whiteAlpha.50',
        },
        zIndex: 1,
        _hover: {},
        _active: {},
      },
    },
  }
})

const variantSegmentsSolid = definePartsStyle((props) => {
  const { theme } = props

  return {
    tablist: {
      display: 'inline-flex',
      rounded: 'lg',
      alignItems: 'center',
      bg: 'gray.100',
      _dark: {
        bg: 'whiteAlpha.100',
      },
    },
    tab: {
      ...theme.components.Button.baseStyle,
      ...theme.components.Button.variants.ghost(props),
      color: 'muted',
      borderWidth: '1px',
      borderColor: 'transparent',
      rounded: 'md',
      fontWeight: 'normal',
      _hover: {
        color: 'black',
        _dark: {
          color: 'white',
        },
      },
      _selected: {
        ...theme.components.Button.variants.solid(props),
        bg: 'white',
        boxShadow: 'sm',
        borderColor: 'default-border-color',
        _dark: {
          color: 'white',
          bg: 'gray.900',
        },
        zIndex: 1,
        _hover: {},
        _active: {},
      },
    },
  }
})

const sizes = {
  xs: definePartsStyle({
    tab: {
      fontSize: 'sm',
      h: 7,
      py: 0,
      px: 2,
    },
  }),
  sm: definePartsStyle({
    tab: {
      fontSize: 'sm',
      h: 8,
      py: 0,
      px: 2,
    },
  }),
  md: definePartsStyle({
    tab: {
      h: 9,
      py: 0,
      px: 4,
    },
  }),
  lg: definePartsStyle({
    tab: {
      h: 10,
      py: 0,
      px: 4,
    },
  }),
}

export default {
  defaultProps: {
    colorScheme: 'gray',
    size: 'sm',
  },
  variants: {
    segments: variantSegments,
    'segments-solid': variantSegmentsSolid,
  },
  sizes,
}
