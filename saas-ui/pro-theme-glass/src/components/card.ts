import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'

const parts = anatomy('card').parts(
  'container',
  'header',
  'title',
  'subtitle',
  'body',
  'footer',
)

const { definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar('card-bg')

const variantShadow = definePartsStyle({
  container: {
    _dark: {
      [$bg.variable]: 'colors.gray.800',
    },
  },
})

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'elevated',
  },
  variants: {
    elevated: variantShadow,
    shadow: variantShadow,
  },
}
