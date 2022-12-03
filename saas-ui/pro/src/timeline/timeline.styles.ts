import { PartsStyleFunction, mode, cssVar } from '@chakra-ui/theme-tools'

const $bg = cssVar('timeline-bg')

const baseStyle: PartsStyleFunction = (props) => {
  const color = mode('gray.300', 'gray.600')(props)

  return {
    container: {
      [$bg.variable]: 'colors.chakra-body-bg',
    },
    item: {},
    separator: {
      width: '24px',
      flexShrink: 0,
      me: 4,
    },
    icon: {
      bg: [$bg.reference],
      color,
      py: '4px',
    },
    dot: {
      width: '9px',
      height: '9px',
      bg: 'currentColor',
      borderRadius: 'full',
    },
    track: {
      bg: color,
      width: '1px',
    },
    content: {},
  }
}

const variantSolid: PartsStyleFunction = () => {
  return {
    icon: {},
  }
}

const variantOutline: PartsStyleFunction = () => {
  return {
    dot: {
      bg: 'transparent',
      borderColor: 'currentColor',
      borderWidth: '2px',
    },
  }
}

export const timelineStyleConfig = {
  defaultProps: { variant: 'solid', size: 'sm' },
  baseStyle,
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  sizes: {
    sm: {
      icon: {
        minH: '8px',
        minW: '8px',
      },
    },
  },
}
