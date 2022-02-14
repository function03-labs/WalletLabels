import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

import { theme as baseTheme } from '@chakra-ui/theme'

import { getStateColors } from '@saas-ui/theme'

const parts = anatomy('sidebar-link').parts(
  'container',
  'link',
  'icon',
  'label',
  'meta',
)

const variantNeutral: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive } = props
  const { hover, active } = getStateColors({
    ...props,
    colorScheme: 'gray',
  })
  return {
    link: {
      bg: isActive && active,
      _hover: {
        bg: hover,
      },
      _active: {
        bg: active,
      },
    },
    icon: {
      opacity: isActive ? 1 : 0.6,
      sx: {
        '.chakra-link:hover &': {
          opacity: '1',
        },
      },
    },
  }
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive, colorScheme: c } = props
  const { active } = getStateColors({
    ...props,
    colorScheme: 'gray',
  })
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
          color: mode(`${c}.500`, `${c}.400`)(props),
        },
        icon: {
          color: mode(`${c}.500`, `${c}.400`)(props),
        },
        label: {
          fontWeight: 'semibold',
        },
      }
    : {
        link: {
          _hover: {
            bg: active,
          },
          _focus: {
            bg: active,
          },
        },
        icon: {
          color: mode(`${c}.500`, `${c}.400`)(props),
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
  baseStyle: {
    container: {
      padding: '2px',
    },
    link: {
      display: 'flex',
      rounded: 'md',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
      },
    },
    label: {
      flex: 1,
    },
    icon: {
      boxSize: '1.2em',
    },
  },
  sizes: {
    xs: {
      link: baseTheme.components.Button.sizes.xs,
      icon: {
        mr: 2,
      },
    },
    sm: {
      link: baseTheme.components.Button.sizes.sm,
      icon: {
        mr: 2,
      },
    },
    md: {
      link: baseTheme.components.Button.sizes.md,
      icon: {
        mr: 3,
      },
    },
    lg: {
      link: baseTheme.components.Button.sizes.lg,
      icon: {
        mr: 4,
      },
    },
  },
  variants: {
    neutral: variantNeutral,
    subtle: variantSubtle,
    solid: variantSolid,
  },
}
