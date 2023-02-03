import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = anatomy('nav-group').parts(
  'container',
  'title',
  'icon',
  'content',
)

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

export const navGroupStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    title: {
      height: 5,
      '&.saas-collapse-toggle': {
        borderRadius: 4,
      },
    },
  }),
})
