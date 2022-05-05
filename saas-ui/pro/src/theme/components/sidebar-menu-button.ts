import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  const hover = mode('blackAlpha.200', 'whiteAlpha.200')(props)
  const active = mode('blackAlpha.300', 'whiteAlpha.300')(props)

  return {
    px: 3,
    height: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 'md',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _hover: { bg: hover },
    _expanded: { bg: active },
    _focus: {
      bg: active,
      outline: 0,
      '&:focus-visible': {
        boxShadow: 'outline',
      },
    },

    '.saas-sidebar__condensed &': {
      px: 1,
    },
  }
}

export default {
  defaultProps: {
    colorScheme: 'gray',
  },
  baseStyle,
}
