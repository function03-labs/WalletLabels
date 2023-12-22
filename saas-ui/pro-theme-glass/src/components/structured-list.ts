/* @ts-ignore */
import { structuredListAnatomy } from '@saas-ui/theme/anatomy/src'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(structuredListAnatomy.keys)

export const structuredListStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) => {
    return {
      button: {
        borderRadius: 'md',
        mx: 3,
        mb: '2px',
      },
    }
  }),
})
