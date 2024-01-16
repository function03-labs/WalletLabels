// import { structuredListAnatomy } from '@saas-ui/theme/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(['button'])

const variantRounded = definePartsStyle((props) => {
  return {
    button: {
      borderRadius: 'md',
      mx: 3,
      mb: '2px',
    },
  }
})

export const structuredListStyles = defineMultiStyleConfig({
  variants: {
    rounded: variantRounded,
  },
})
