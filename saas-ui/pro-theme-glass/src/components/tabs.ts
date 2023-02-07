import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { tabsAnatomy as parts } from '@chakra-ui/anatomy'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const variantSegments = definePartsStyle((props) => {
  const { theme } = props

  return {
    tablist: {
      display: 'flex',
      bg: 'gray.100',
      rounded: 4,
      _dark: {
        bg: 'whiteAlpha.50',
      },
    },
    tab: {
      borderWidth: '1px',
      borderColor: 'transparent',
      color: 'muted',
      rounded: 4,
      position: 'relative',
      _before: {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '-1.5px',
        my: '2px',
        height: '0.8rem',
        bg: 'chakra-border-color',
        width: '1px',
      },
      ':first-of-type': {
        _before: {
          display: 'none',
        },
      },
      _dark: {
        borderColor: 'transparent',
        _hover: {
          borderColor: 'transparent',
          bg: 'transparent',
        },
      },
      _first: {
        rounded: 4,
      },
      _last: { rounded: 4 },
      _hover: {
        borderColor: 'transparent',
      },
      _selected: {
        ...theme.components.Button.variants.secondary(props),
      },
    },
  }
})

const sizes = {
  xs: definePartsStyle({
    tab: {
      fontSize: 'sm',
      h: 6,
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
      fontSize: 'md',
      h: 10,
      py: 0,
      px: 3,
    },
  }),
  lg: definePartsStyle({
    tab: {
      fontSize: 'md',
      h: 12,
      py: 0,
      px: 4,
    },
  }),
}

export const tabsStyles = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'gray',
    size: 'xs',
  },
  variants: {
    segments: variantSegments,
  },
  sizes,
})
