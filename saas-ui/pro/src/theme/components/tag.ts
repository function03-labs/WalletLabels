import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'
import { tagAnatomy as parts } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $fg = cssVar('badge-color')

const outlineVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props
  if (c === 'gray') {
    return {
      container: {
        _dark: {
          [$fg.variable]: 'colors.gray.700',
          color: 'gray.500',
        },
      },
    }
  }

  return {}
})

const solidVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props
  if (c === 'gray') {
    return {
      container: {
        bg: 'blackAlpha.100',
        color: 'gray.600',
        _dark: {
          bg: 'whiteAlpha.100',
          color: 'gray.400',
        },
      },
    }
  }

  return {}
})

const plainVariant = definePartsStyle((props) => ({
  container: {
    borderColor: 'default-border-color',
    borderWidth: '1px',
    color: 'muted',
  },
}))

export default defineMultiStyleConfig({
  defaultProps: {
    variant: 'solid',
  },
  baseStyle: {
    container: {
      borderRadius: 'full',
    },
  },
  variants: {
    plain: plainVariant,
    outline: outlineVariant,
    solid: solidVariant,
  },
})
