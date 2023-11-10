import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

import { sizes as buttonSizes } from './button'

const parts = anatomy('nav-item').parts(
  'item',
  'link',
  'inner',
  'icon',
  'label',
)

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const sizes = {
  xs: definePartsStyle(() => {
    return {
      link: buttonSizes?.xs,
    }
  }),
  sm: definePartsStyle(() => {
    return {
      link: buttonSizes?.sm,
    }
  }),
  md: definePartsStyle(() => {
    return {
      link: buttonSizes?.md,
    }
  }),
  lg: definePartsStyle(() => {
    return {
      link: buttonSizes?.lg,
    }
  }),
}

export const navItemStyles = defineMultiStyleConfig({
  defaultProps: {
    size: 'sm',
  },
  sizes,
})
