import { useColorModeValue } from '@chakra-ui/react'

const styles = {
  global: () => ({
    body: {
      color: 'app-text',
      bg: 'app-background',
      fontSize: 'sm',
      scrollbarColor: 'dark',
      scrollbarWidth: 'thin',
    },
    '::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    '::-webkit-scrollbar-track, ::-webkit-scrollbar-corner': {
      background: 'app-background',
    },
    '::-webkit-scrollbar-thumb': {
      background: useColorModeValue('blackAlpha.500', 'whiteAlpha.700'),
      borderRadius: '8px',
      border: '2px solid',
      borderColor: 'app-background',
    },
    '*::placeholder': {
      color: 'muted',
    },
    '*, *::before, &::after': {
      borderColor: 'default-border-color',
      wordWrap: 'break-word',
    },
  }),
}

export default styles
