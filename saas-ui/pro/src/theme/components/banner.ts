import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

// @todo import anatomy
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(['container'])

const variantFloating = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: `${c}.500`,
      top: 'auto',
      left: '50%',
      bottom: '40px',
      boxShadow: 'md',
      borderRadius: 'lg',
      maxW: 'container.lg',
      marginLeft: '-25%',
    },
  }
})

export const bannerTheme = defineMultiStyleConfig({
  variants: {
    floating: variantFloating,
  },
})
