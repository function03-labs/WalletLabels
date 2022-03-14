import * as React from 'react'
import { HStack, StackProps } from '@chakra-ui/react'

export const PageActions: React.FC<StackProps> = ({ children }) => {
  return (
    <HStack as={'nav'} spacing={2} display={'flex'} role="nav">
      {children}
    </HStack>
  )
}
