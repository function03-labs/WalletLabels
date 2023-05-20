import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

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
      bg: mode('gray.200', 'whiteAlpha.400')(props),
      '[data-status="active"] &': {
        bg: c ? `${c}.500` : mode('black', 'white'),
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
  }
}
export default {
  variants: {
    dots: variantDots,
  },
}
