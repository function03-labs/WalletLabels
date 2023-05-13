import { Link } from '@saas-ui/react'
import { IconButton, IconButtonProps, forwardRef } from '@chakra-ui/react'
import { ArrowLeftIcon } from './icons'

export interface BackButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label'?: string
  href?: string | object
}

export const BackButton = forwardRef<BackButtonProps, 'button'>(
  (props, ref) => {
    const { href, ...rest } = props
    const icon = rest.icon || <ArrowLeftIcon />

    let as
    if (href) {
      as = Link
    }

    return (
      <IconButton
        aria-label="back"
        href={href}
        as={as}
        icon={icon}
        ref={ref}
        {...rest}
      />
    )
  },
)

BackButton.defaultProps = {
  variant: 'ghost',
  mr: 2,
}
