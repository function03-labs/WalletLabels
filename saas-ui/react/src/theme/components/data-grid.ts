import { anatomy, mode, transparentize } from '@chakra-ui/theme-tools'

import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'

const parts = anatomy('data-grid').parts(
  'container',
  'inner',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
)

const numericStyles: SystemStyleObject = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
  },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    maxWidth: '100%',
  },
  inner: {
    flex: 1,
    maxWidth: '100%',
    overflow: 'auto',
  },
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: 'full',
  },
  th: {
    fontFamily: 'heading',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
    textAlign: 'start',
  },
  td: {
    textAlign: 'start',
    a: {
      _hover: {
        textDecoration: 'none',
      },
    },
  },
  caption: {
    mt: 4,
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'medium',
  },
}

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  return {
    th: {
      color: mode('gray.600', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode('blackAlpha.200', 'whiteAlpha.100')(props),
      ...numericStyles,
    },
    td: {
      borderBottom: '1px',
      borderColor: mode('blackAlpha.200', 'whiteAlpha.100')(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
    tbody: {
      'tr[data-hover]:hover': {
        td: {
          background: mode('blackAlpha.50', 'whiteAlpha.50')(props),
        },
      },
      'tr[data-selected]': {
        td: {
          background: mode(
            `${c}.50`,
            transparentize(`${c}.500`, 0.1)(theme),
          )(props),
          borderColor: transparentize(
            mode(`${c}.400`, `${c}.500`)(props),
            0.2,
          )(theme),
        },
        '&[data-hover]:hover td': {
          background: mode(
            `${c}.100`,
            transparentize(`${c}.500`, 0.2)(theme),
          )(props),
        },
      },
      'tr:last-of-type td': {
        border: 0,
      },
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const variantStriped: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    th: {
      color: mode('gray.600', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      borderBottom: '1px',
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
    tbody: {
      tr: {
        '&:nth-of-type(odd)': {
          'th, td': {
            borderBottomWidth: '1px',
            borderColor: mode(`${c}.100`, `${c}.700`)(props),
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props),
          },
        },
        '&[data-hover]:hover td': {
          background: mode(`${c}.50`, `${c}.700`)(props),
        },
      },
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const variants = {
  simple: variantSimple,
  striped: variantStriped,
  unstyled: {},
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    th: {
      px: '4',
      py: '2',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '4',
      py: '2',
      fontSize: 'sm',
      lineHeight: '4',
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'xs',
    },
  },
  md: {
    th: {
      px: '6',
      py: '3',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '6',
      py: '3',
      lineHeight: '4',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  lg: {
    th: {
      px: '6',
      py: '4',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '6',
      py: '4',
      lineHeight: '5',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  xl: {
    th: {
      px: '8',
      py: '5',
      lineHeight: '5',
      fontSize: 'sm',
    },
    td: {
      px: '8',
      py: '5',
      lineHeight: '6',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'md',
    },
  },
}

const defaultProps = {
  variant: 'simple',
  size: 'md',
  colorScheme: 'primary',
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
