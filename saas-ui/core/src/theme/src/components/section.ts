import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('section').parts(
  'container',
  'headerWrapper',
  'header',
  'title',
  'description',
  'body',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    description: {
      a: {
        fontWeight: 'medium',
        color: 'app.text',
      },
    },
  }
}

const variantDefault: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      flexDirection: 'column',
    },
    heading: {
      mb: 8,
      mt: 4,
    },
  }
}

const variantAnnotated: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      flexDirection: 'row',
      mt: 4,
    },
    heading: {
      width: '30%',
      mt: 0,
      pe: 4,
    },
    title: {
      mb: 4,
    },
    description: {
      color: 'muted',
      fontSize: 'md',
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