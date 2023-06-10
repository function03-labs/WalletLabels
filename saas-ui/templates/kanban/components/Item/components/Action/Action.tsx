import React, { forwardRef, CSSProperties } from 'react'

import { Button, ButtonProps } from '@chakra-ui/react'

export interface ActionProps extends ButtonProps {}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ className, style, ...props }, ref) => {
    return <Button ref={ref} {...props} tabIndex={0} variant="ghost" />
  },
)
