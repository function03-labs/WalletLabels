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
      bottom: '40px',
      boxShadow: 'md',
      borderRadius: 'lg',
      maxW: 'container.lg',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      ...containerStyles,
    },
  }
})

export const bannerTheme = defineMultiStyleConfig({
  variants: {
    floating: variantFloating,
  },
})
