import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('app-shell').parts('container', 'inner', 'main')

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    container: {},
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: {
      minHeight: '100%',
    },
    fullscreen: {
      container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  },
  baseStyle,
}
