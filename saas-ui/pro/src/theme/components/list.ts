import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('list').parts(
  'list',
  'item',
  'button',
  'header',
  'primary',
  'secondary',
  'tertiary',
  'action',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    button: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      _hover: {
        bg: mode('blackAlpha.100', 'whiteAlpha.200')(props),
      },
    },
  }
}

const variantSettings: PartsStyleFunction<typeof parts> = (props) => {
  return {
    item: {
      borderBottomWidth: '1px',
      '&:last-of-type': {
        borderBottomWidth: 0,
      },
    },
    primary: {
      fontWeight: 'medium',
    },
    tertiary: {
      color: 'muted',
      fontSize: 'sm',
    },
    action: {
      color: 'muted',
      fontSize: 'xl',
    },
  }
}

export default {
  baseStyle: baseStyle,
  variants: {
    settings: variantSettings,
  },
  sizes: {
    condensed: {
      item: {
        py: 1,
      },
      label: {
        p: 0,
      },
    },
  },
}
