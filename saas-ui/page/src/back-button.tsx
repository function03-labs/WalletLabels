import * as React from 'react'
import { IconButton, IconButtonProps } from '@saas-ui/button'

import { ArrowBackIcon } from '@chakra-ui/icons'

export interface BackButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label'?: string
}

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const icon = props.icon || <ArrowBackIcon />
  return <IconButton aria-label="back" {...props} icon={icon} />
}

BackButton.defaultProps = {
  variant: 'ghost',
  mr: 2,
}
