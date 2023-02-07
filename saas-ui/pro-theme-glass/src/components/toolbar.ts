import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { anatomy } from '@chakra-ui/anatomy'

const parts = anatomy('toolbar').parts()

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

export const toolbarStyles = defineMultiStyleConfig({
  defaultProps: {
    variant: 'secondary',
    size: 'sm',
  },
  baseStyle: definePartsStyle({
    container: {
      alignItems: 'center',
    },
  }),
})
