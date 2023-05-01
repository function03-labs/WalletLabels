const styles = {
  global: () => ({
    body: {
      color: 'app-text',
      bg: 'app-background',
      fontSize: 'sm',
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
