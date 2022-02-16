import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('page').parts(
  'container',
  'headerWrapper',
  'header',
  'title',
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
    title: {
      fontWeight: 'bold',
      fontSize: 'md',
    },
    description: {
      color: mode('gray.400', 'gray.500')(props),
      fontSize: 'md',
    },
    body: {
      flex: 1,
      overflow: 'auto',
      '& > div': {
        margin: '0 auto',
        maxWidth: props.fullWidth ? '100%' : 'container.xl',
        minHeight: '100%',
        height: '1px', // hack to make sure the Loading 100% height is working
      },
    },
  }
}

const variantHero: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    headerWrapper: {
      bg: mode(`${c}.400`, `${c}.500`)(props),
      mb: 8,
    },
    header: {
      borderBottomWidth: 0,
      width: 'container.xl',
      margin: '0 auto',
      p: 0,
      minH: 48,
    },
    title: {
      fontSize: '2xl',
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    colorScheme: 'gray',
  },
  baseStyle,
  variants: {
    app: {},
    settings: {
      header: {
        width: 'container.xl',
        margin: '0 auto',
        p: 0,
        my: 8,
        minH: 24,
      },
      title: {
        fontSize: '2xl',
      },
    },
    hero: variantHero,
  },
}
