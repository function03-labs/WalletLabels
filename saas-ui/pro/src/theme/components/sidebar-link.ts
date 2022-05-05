import {
  anatomy,
  mode,
  transparentize,
  PartsStyleFunction,
} from '@chakra-ui/theme-tools'

import { theme as baseTheme } from '@chakra-ui/theme'

import { getStateColors } from '@saas-ui/theme'

const parts = anatomy('sidebar-link').parts(
  'container',
  'link',
  'inner',
  'icon',
  'label',
  'meta',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      padding: '2px',
      '.saas-sidebar__condensed &': {
        px: 0,
      },
    },
    link: {
      display: 'flex',
      rounded: 'md',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textDecoration: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      _hover: {
        textDecoration: 'none',
      },
      _focus: {
        outline: 0,
        boxShadow: 'outline',
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
      '.saas-sidebar__condensed &': {
        padding: 0,
        justifyContent: 'center',
      },
    },
    inner: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      flex: 1,
      '.saas-sidebar__condensed &': {
        display: 'none',
      },
    },
    icon: {
      display: 'flex',
      '.saas-sidebar__condensed &': {
        me: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  }
}

const variantNeutral: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive } = props

  const hoverBg = mode('blackAlpha.100', 'whiteAlpha.100')(props)
  const activeBg = mode('blackAlpha.200', 'whiteAlpha.200')(props)

  return {
    link: {
      bg: isActive && activeBg,
      _hover: {
        bg: isActive ? activeBg : hoverBg,
      },
      _active: {
        bg: activeBg,
      },
    },
    icon: {
      opacity: isActive ? 1 : 0.6,
      '.sui-sidebar-link:hover &': {
        opacity: '1',
      },
    },
  }
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive, colorScheme: c, theme } = props

  const hoverBg = mode('blackAlpha.100', 'whiteAlpha.100')(props)

  const color = mode(`${c}.700`, `${c}.400`)(props)
  const activeBg = mode(
    `${c}.50`,
    transparentize(`${c}.500`, 0.3)(theme),
  )(props)

  return isActive
    ? {
        link: {
          bg: activeBg,
          _hover: {
            bg: activeBg,
          },
          _active: {
            bg: activeBg,
          },
          color,
        },
        icon: {
          color,
        },
        label: {
          fontWeight: 'semibold',
        },
      }
    : {
        link: {
          _hover: {
            bg: hoverBg,
          },
          _focus: {
            bg: hoverBg,
          },
        },
        icon: {
          color: mode('black', 'white')(props),
        },
      }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive, colorScheme: c } = props

  const { active } = getStateColors(props)
  const { hover } = getStateColors({ ...props, colorScheme: 'gray' })

  return isActive
    ? {
        link: {
          bg: active,
          _hover: {
            bg: active,
          },
          _active: {
            bg: active,
          },
          color: 'white',
        },
        icon: {
          color: 'white',
        },
        label: {},
      }
    : {
        link: {
          _hover: {
            bg: hover,
          },
          _focus: {
            bg: hover,
          },
        },
        icon: {
          color: active,
        },
      }
}

export default {
  parts: parts.keys,
  defaultProps: {
    size: 'sm',
    colorScheme: 'primary',
    variant: 'neutral',
  },
  baseStyle,
  sizes: {
    xs: {
      link: baseTheme.components.Button.sizes.xs,
      icon: {
        me: 2,
        fontSize: '1em',
      },
    },
    sm: {
      link: baseTheme.components.Button.sizes.sm,
      icon: {
        me: 2,
        fontSize: '1.1em',
      },
    },
    md: {
      link: baseTheme.components.Button.sizes.md,
      icon: {
        me: 2,
        fontSize: '1.2em',
      },
    },
    lg: {
      link: baseTheme.components.Button.sizes.lg,
      icon: {
        me: 3,
        fontSize: '1.4em',
      },
    },
  },
  variants: {
    neutral: variantNeutral,
    subtle: variantSubtle,
    solid: variantSolid,
  },
}
