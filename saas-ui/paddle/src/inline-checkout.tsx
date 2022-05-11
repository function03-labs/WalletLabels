import * as React from 'react'

import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { usePaddle } from './use-paddle'

export interface InlineCheckoutProps extends BoxProps {
  product: number
  email?: string
  passthrough?: string
  allowQuantity?: boolean
  disableLogout?: boolean
  successCallback?(data: any): void
  closeCallback?(data: any): void
}

export const InlineCheckout: React.FC<InlineCheckoutProps> = (props) => {
  const {
    product,
    email,
    passthrough = {},
    allowQuantity,
    disableLogout,
    successCallback,
    closeCallback,
    ...rest
  } = props

  const className = 'saas-ui-paddle__inline-checkout'
  const { colorMode: displayModeTheme } = useColorMode()

  const Paddle = usePaddle()

  React.useEffect(() => {
    if (!product || !Paddle) {
      return
    }

    Paddle.Checkout.open({
      method: 'inline',
      product,
      email,
      passthrough,
      successCallback,
      closeCallback,
      allowQuantity,
      disableLogout,
      displayModeTheme,
      frameTarget: className,
      frameInitialHeight: 416,
      frameStyle:
        'width:100%; min-width:312px; background-color: transparent; border: none;',
    })
  }, [product, Paddle, displayModeTheme])

  return <Box {...rest} className={cx(className, props.className)} />
}
