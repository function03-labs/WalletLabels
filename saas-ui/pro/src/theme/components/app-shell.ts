import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('app-shell').parts('container', 'inner', 'main')

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    container: {
      minHeight: '100%',
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'fullscreen',
  },
  variants: {
    fullscreen: {
      container: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
      },
    },
  },
  baseStyle,
}
