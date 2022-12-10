import * as React from 'react'
import {
  Button as SButton,
  ButtonProps as SButtonProps,
  useLink,
} from '@saas-ui/react'

export interface LinkButtonProps extends SButtonProps {
  href?: string | object
}

export const LinkButton = React.forwardRef(
  (props: LinkButtonProps, ref: React.ForwardedRef<any>) => {
    const { href } = props

    const LinkWrapper = useLink()

    if (href) {
      return (
        <LinkWrapper href={href} passHref>
          <SButton as="a" {...props} ref={ref} />
        </LinkWrapper>
      )
    }

    return <SButton ref={ref} {...props} />
  },
)
