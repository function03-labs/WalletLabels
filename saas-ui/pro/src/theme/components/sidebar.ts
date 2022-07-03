import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('sidebar').parts(
  'container',
  'nav',
  'group',
  'groupTitle',
  'menuButton',
  'overlay',
  'toggle',
  'overflow',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  const bg = c ? `${c}.500` : 'sidebar-background'

  return {
    container: {
      bg,
      color: 'sidebar-text',
      display: 'flex',
      flexDirection: 'column',
      borderRightWidth: '1px',
      '&, & *, & *::before, & &::after': {
        borderColor: 'sidebar-border-color',
      },
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
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'sidebar-muted',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      '&.saas-collapse-toggle .chakra-icon': {
        opacity: 0,
      },
      '&.saas-collapse-toggle': {
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
    overflow: {
      '&::-webkit-scrollbar-track': {
        background: 'sidebar-background',
      },
      '&::-webkit-scrollbar-thumb': {
        borderColor: 'sidebar-background',
      },
    },
  }
}

const variantDefault: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      width: '280px',
      maxWidth: ['100vw', '320px'],
      minWidth: '220px',
    },
  }
}

const variantCondensed: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      width: '64px',
    },
    nav: {
      alignItems: 'center',
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'default',
    size: 'md',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    condensed: variantCondensed,
  },
  sizes: {
    xs: {
      container: {
        pt: { base: 10, lg: 2 },
        pb: 2,
      },
      groupTitle: {
        fontSize: 'xs',
      },
    },
    sm: {
      container: {
        pt: { base: 10, lg: 2 },
        pb: 2,
      },
      groupTitle: {
        fontSize: 'sm',
      },
    },
    md: {
      container: {
        pt: { base: 10, lg: 3 },
        pb: 3,
      },
      groupTitle: {
        fontSize: 'sm',
      },
    },
    lg: {
      container: {
        pt: { base: 10, lg: 4 },
        pb: 4,
      },
      groupTitle: {
        fontSize: 'md',
      },
    },
  },
}
