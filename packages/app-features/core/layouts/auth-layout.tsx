'use client'

import { Flex, FlexProps } from '@chakra-ui/react'

export const AuthLayout: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex minH="$100vh" align="center" justify="center" {...rest}>
      {children}
    </Flex>
  )
}
