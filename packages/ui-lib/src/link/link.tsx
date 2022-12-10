import * as React from 'react'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { useLink } from '@saas-ui/react'

export const Link = React.forwardRef(
  (props: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
    const { href } = props

    const LinkWrapper = useLink()

    return (
      <LinkWrapper href={href} passHref>
        <ChakraLink href={href} {...props} ref={ref} />
      </LinkWrapper>
    )
  },
)
