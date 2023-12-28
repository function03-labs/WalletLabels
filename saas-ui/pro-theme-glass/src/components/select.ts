import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers([
  'field',
  'addon',
])

import Form from './form'

export const selectStyles = defineMultiStyleConfig({
  defaultProps: {
    variant: 'outline',
    size: 'sm',
  },
  variants: {
    outline: Form.Input.variants.outline,
  },
  sizes: Form.Input.sizes,
})
