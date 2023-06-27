import { SystemStyleFunction } from '@chakra-ui/theme-tools'
import { keyframes } from '@chakra-ui/react'

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  55% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const baseStyle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    bg: `${c}.400`,
    borderRadius: '50%',
    h: '4',
    w: '4',

    _before: {
      content: '""',
      display: 'block',
      w: '4',
      h: '4',
      borderRadius: '50%',
      animation: `${pulse} 1s ease-in-out infinite`,
      boxShadow: '0 0 2px 2px',
      color: `${c}.400`,
    },
  }
}

export default {
  defaultProps: {
    colorScheme: 'primary',
    size: 'sm',
  },
  baseStyle,
  sizes: {
    xs: {
      h: '1',
      w: '1',
      _before: {
        h: '1',
        w: '1',
      },
    },
    sm: {
      h: '2',
      w: '2',
      _before: {
        h: '2',
        w: '2',
      },
    },
    md: {
      h: '3',
      w: '3',
      _before: {
        h: '3',
        w: '3',
      },
    },
    lg: {
      h: '4',
      w: '4',
      _before: {
        h: '4',
        w: '4',
      },
    },
  },
}
