import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    '& .sui-menu-list__filter': {
      mb: 1,
    },
  },
})

export const menuStyles = defineMultiStyleConfig({
  baseStyle,
})
