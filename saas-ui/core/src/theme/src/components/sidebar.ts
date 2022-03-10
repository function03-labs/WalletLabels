import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('sidebar').parts(
  'container',
  'nav',
  'group',
  'groupTitle',
  'menuButton',
  'overlay',
  'toggle',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  const bg = c ? `${c}.500` : 'sidebar.background'

  return {
    container: {
      bg,
      display: 'flex',
      flexDirection: 'column',
      borderRightWidth: '1px',
      width: ['200px', '280px'],
    },
    divider: {
      my: '0.5rem',
      opacity: 0.6,
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      px: 4,
    },
    group: {
      '&:not(:last-child)': {
        mb: 4,
      },
    },
    groupTitle: {
      display: 'flex',
      alignItems: 'center',
      px: 3,
      my: 1,
      height: 6,
      fontWeight: 'medium',
      color: 'muted',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      '&.sui-collapse-toggle .chakra-icon': {
        opacity: 0,
      },
      '&.sui-collapse-toggle': {
        cursor: 'pointer',
        borderRadius: 'md',
        _hover: {
          bg: mode('blackAlpha.100', 'whiteAlpha.200')(props),
          '& .chakra-icon': {
            opacity: 1,
          },
        },
      },
    },
    overlay: {
      bg: 'blackAlpha.200',
    },
  }
}

const variantCondensed: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      width: '64px',
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    size: 'md',
  },
  baseStyle,
  variants: {
    condensed: variantCondensed,
  },
  sizes: {
    xs: {
      container: {
        pt: { sm: 10, lg: 2 },
        pb: 2,
      },
    },
    sm: {
      container: {
        pt: { sm: 10, lg: 2 },
        pb: 2,
      },
    },
    md: {
      container: {
        pt: { sm: 10, lg: 3 },
        pb: 3,
      },
    },
    lg: {
      container: {
        pt: { sm: 10, lg: 4 },
        pb: 4,
      },
    },
  },
}
