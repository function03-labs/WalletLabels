import * as React from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Link(props: any) {
  const { href } = props
  return (
    <NextLink href={href} passHref>
      <ChakraLink href={href} {...props} />
    </NextLink>
  )
}
