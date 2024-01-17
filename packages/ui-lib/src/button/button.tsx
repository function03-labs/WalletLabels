import * as React from 'react'
import { Button, ButtonProps, LinkProps } from '@chakra-ui/react'
import { useLink } from '@saas-ui/react'

export interface LinkButtonProps
  extends Pick<LinkProps, 'href' | 'target' | 'rel'>,
    ButtonProps {}

export const LinkButton = React.forwardRef(
  (props: LinkButtonProps, ref: React.ForwardedRef<any>) => {
    const Link = useLink()
    const { href } = props

    if (href) {
      return (
        <Button
          as={Link}
          _hover={{ textDecoration: 'none' }}
          {...props}
          ref={ref}
        />
      )
    }

    return <Button ref={ref} {...props} />
  },
)
