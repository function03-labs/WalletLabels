import * as React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useLink } from '@saas-ui/react'

export interface LinkButtonProps extends ButtonProps {
  href?: string | object
}

export const LinkButton = React.forwardRef(
  (props: LinkButtonProps, ref: React.ForwardedRef<any>) => {
    const Link = useLink()
    const { href } = props

    if (href) {
      return <Button as={Link} {...props} ref={ref} />
    }

    return <Button ref={ref} {...props} />
  },
)
