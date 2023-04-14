import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const $bg = cssVar('card-bg')

const variantShadow = definePartsStyle(() => ({
  container: {
    _dark: {
      [$bg.variable]: 'colors.gray.800',
    },
  },
}))

export const cardStyles = defineMultiStyleConfig({
  variants: {
    elevated: variantShadow,
    shadow: variantShadow,
  },
})
