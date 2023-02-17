import * as React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useLink } from '@saas-ui/react'

export interface LinkButtonProps extends ButtonProps {
  href?: string | object
}

export const LinkButton = React.forwardRef(
  (props: LinkButtonProps, ref: React.ForwardedRef<any>) => {
    const { href } = props

    const LinkWrapper = useLink()

    if (href) {
      return (
        <LinkWrapper href={href} passHref>
          <Button as="a" {...props} ref={ref} />
        </LinkWrapper>
      )
    }

    return <Button ref={ref} {...props} />
  },
)
