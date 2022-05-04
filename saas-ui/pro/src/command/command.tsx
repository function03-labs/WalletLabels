import * as React from 'react'

import { chakra, Kbd, HTMLChakraProps, useStyleConfig } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

const Key: React.FC<HTMLChakraProps<'span'>> = ({ children }) => {
  if (typeof children !== 'string') {
    return <>{children}</>
  }

  if (children === 'then') {
    return <chakra.span>{children}</chakra.span>
  }

  return <Kbd>{children}</Kbd>
}

export const Command: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const { children, className, ...rest } = props
  if (typeof children !== 'string') {
    return <>{children}</>
  }
  const keys = children.split(/\s|\+/)

  const styles = useStyleConfig('Command')

  const commandStyles = {
    '& > *:not(style) ~ *:not(style)': { marginEnd: 1 },
    color: 'muted',
    ...styles,
  }

  return (
    <chakra.span
      className={cx('saas-command', className)}
      __css={commandStyles}
      {...rest}
    >
      {keys.map((key) => (
        <Key key={key}>{key}</Key>
      ))}
    </chakra.span>
  )
}
