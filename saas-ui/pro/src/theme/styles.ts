import { mode, Styles } from '@chakra-ui/theme-tools'

const styles: Styles = {
  global: (props) => ({
    body: {
      color: 'app.text',
      bg: 'app.background',
      fontSize: 'sm',
    },
    '*::placeholder': {
      color: mode('blackAlpha.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: 'default-border-color',
      wordWrap: 'break-word',
    },
  }),
}

export default styles
