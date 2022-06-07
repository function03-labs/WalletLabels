import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('split-page').parts('container', 'content')

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      position: 'relative',
      overflow: 'hidden',
    },
    content: {
      bg: 'app-background',
      display: 'flex',
      flex: 1,
      height: '100%',
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
}
