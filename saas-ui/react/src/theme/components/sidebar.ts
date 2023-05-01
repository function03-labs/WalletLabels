import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('sidebar').parts('container', 'section')

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  const bg = c ? `${c}.500` : 'sidebar-background'

  return {
    container: {
      bg,
      color: 'sidebar-text',
      '&, & *, & *::before, & &::after': {
        borderColor: 'sidebar-border-color',
      },
      _dark: {
        bg,
      },
    },
  }
}

export default {
  parts: parts.keys,
  baseStyle,
}
