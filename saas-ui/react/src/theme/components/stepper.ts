import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const variantDots: PartsStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    stepper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    step: {
      flex: 0,
    },
    indicator: {
      overflow: 'hidden',
      textIndent: '-9999px',
      width: '8px',
      height: '8px',
      border: 0,
      bg: 'gray.200',
      _dark: {
        bg: 'whiteAlpha.400',
      },
      '[data-status="active"] &': {
        bg: c ? `${c}.500` : 'black',
        _dark: {
          bg: c ? `${c}.500` : 'white',
        },
      },
      '[data-status="complete"] &': {
        bg: c ? `${c}.500` : 'black',
        _dark: {
          bg: c ? `${c}.500` : 'white',
        },
      },
    },
    title: {
      display: 'none',
    },
    description: {
      display: 'none',
    },
    separator: {
      display: 'none',
    },
    icon: {
      display: 'none',
    },
  }
}
export default {
  variants: {
    dots: variantDots,
  },
}
