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
      link: {
        ...buttonSizes?.sm,
        borderRadius: 'base',
      },
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
  variants: {
    neutral: definePartsStyle(() => {
      const _active = {
        bg: 'blackAlpha.200',
        _dark: {
          bg: `whiteAlpha.200`,
        },
      }
      return {
        link: {
          _active,
          ['&[aria-current=page]']: _active,
        },
      }
    }),
  },
})
