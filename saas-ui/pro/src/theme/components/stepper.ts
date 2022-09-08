import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const variantDots: PartsStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    steps: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      overflow: 'hidden',
      textIndent: '-9999px',
      width: '8px',
      height: '8px',
      '[data-active] &': {
        bg: c ? `${c}.500` : mode('black', 'white'),
      },
      '& > svg': {
        display: 'none',
      },
    },
    title: {
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
