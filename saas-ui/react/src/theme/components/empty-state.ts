import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const variantNoResults: PartsStyleFunction = () => {
  return {
    body: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
    },
    actions: {
      mt: 2,
    },
  }
}

export default {
  defaultProps: {
    variant: 'centered',
  },
  variants: {
    'no-results': variantNoResults,
  },
  sizes: {
    xs: {
      title: {
        fontSize: 'xs',
        mt: 2,
      },
    },
    sm: {
      title: {
        fontSize: 'sm',
        mt: 2,
      },
    },
  },
}
