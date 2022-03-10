import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantSolid: SystemStyleFunction = (props) => {
  return {
    bg: mode('blackAlpha.200', 'whiteAlpha.300')(props),
    color: mode('blackAlpha.700', 'whiteAlpha.800')(props),
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: '1px',
    display: 'inline-block',
    borderRadius: '3px',
    minW: '20px',
    textAlign: 'center',
    fontSize: 'sm',
    mr: 1,
    ':last-child': {
      mr: 0,
    },
  }
}

export default {
  defaultProps: {
    variant: 'solid',
  },
  variants: {
    basic: {
      opacity: 0.6,
    },
    solid: variantSolid,
  },
}
