import { SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  if (c === 'gray') {
    return {
      borderColor: 'default-border-color',
    }
  }

  return {}
}

export default {
  variants: {
    outline: variantOutline,
  },
}
