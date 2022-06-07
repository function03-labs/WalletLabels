import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('page').parts(
  'container',
  'headerContainer',
  'header',
  'heading',
  'headerFooter',
  'title',
  'description',
  'body',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minH: 0,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      py: 2,
      px: 4,
      minH: 14,
      borderBottomWidth: '1px',
    },
    headerFooter: {
      py: 2,
      px: 4,
      borderBottomWidth: '1px',
    },
    title: {
      fontWeight: 'semibold',
      fontSize: 'md',
    },
    description: {
      color: 'muted',
      fontSize: 'md',
    },
    body: {
      flex: 1,
      overflowY: 'auto',
      '& > div': {
        margin: '0 auto',
        minHeight: '100%',
        height: '1px', // hack to make sure the Loader 100% height is working
      },
    },
  }
}

const variantDefault: PartsStyleFunction<typeof parts> = (props) => {
  return {
    header: {
      ps: { base: 14, lg: 4 },
      '& > .saas-toolbar': {
        ms: 4,
      },
    },
  }
}

const variantHero: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    headerContainer: {
      bg: mode(`${c}.500`, `${c}.500`)(props),
      mb: 8,
    },
    header: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottomWidth: 0,
      maxW: 'container.xl',
      margin: '0 auto',
      py: 14,
    },
    title: {
      fontSize: '2xl',
      color: 'white',
    },
    description: {
      fontSize: 'xl',
      color: 'whiteAlpha.700',
      mb: 4,
    },
  }
}

const variantSettings: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      overflowY: 'auto',
      px: 4,
    },
    header: {
      flexDirection: 'column',
      alignItems: 'stretch',
      maxW: 'container.lg',
      margin: '0 auto',
      mt: [0, null, 8],
      mb: 8,
      minH: 24,
      p: 0,
    },
    heading: {
      py: 8,
    },
    title: {
      fontSize: '2xl',
    },
    body: {
      overflow: 'visible',
      '& > div': {
        margin: '0 auto',
        maxWidth: props.fullWidth ? '100%' : 'container.lg',
      },
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'default',
    colorScheme: 'gray',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    hero: variantHero,
    settings: variantSettings,
  },
}
