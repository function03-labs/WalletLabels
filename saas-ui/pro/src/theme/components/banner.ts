import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'

// @todo import anatomy
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(['container'])

const variantFloating = definePartsStyle((props) => {
  const { colorScheme: c } = props

  let containerStyles = defineStyle({
    bg: `${c}.500`,
  })
  if (c === 'gray') {
    containerStyles = defineStyle({
      bg: 'gray.300',
      _dark: {
        bg: 'gray.500',
      },
    })
  }

  return {
    container: {
      top: 'auto',
      left: '50%',
      bottom: '40px',
      boxShadow: 'md',
      borderRadius: 'lg',
      maxW: 'container.lg',
      marginLeft: '-25%',
      ...containerStyles,
    },
  }
})

export const bannerTheme = defineMultiStyleConfig({
  variants: {
    floating: variantFloating,
  },
})
