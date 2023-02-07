import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

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
  xs: definePartsStyle(({ theme }) => {
    return {
      link: theme.components.Button.sizes?.xs,
    }
  }),
  sm: definePartsStyle(({ theme }) => {
    return {
      link: theme.components.Button.sizes?.sm,
    }
  }),
  md: definePartsStyle(({ theme }) => {
    return {
      link: theme.components.Button.sizes?.md,
    }
  }),
  lg: definePartsStyle(({ theme }) => {
    return {
      link: theme.components.Button.sizes?.lg,
    }
  }),
}

export const navItemStyles = defineMultiStyleConfig({
  defaultProps: {
    size: 'md',
  },
  sizes,
})
