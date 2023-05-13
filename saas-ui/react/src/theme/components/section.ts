import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('section').parts(
  'container',
  'header',
  'title',
  'description',
  'body',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    title: {
      fontSize: ['lg', 'xl'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
      mb: 1,
    },
    description: {
      color: 'muted',
      fontSize: 'md',
      a: {
        fontWeight: 'medium',
        color: 'app-text',
      },
    },
  }
}

const variantDefault: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      flexDirection: 'column',
    },
    header: {
      mb: 4,
    },
  }
}

const variantAnnotated: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      flexDirection: ['column', null, 'row'],
      mt: 4,
    },
    header: {
      width: ['full', null, '30%'],
      mt: 0,
      mb: [4, null, 0],
      pe: [4, null, 8],
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'default',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    annotated: variantAnnotated,
  },
}
