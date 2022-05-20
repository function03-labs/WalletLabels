import * as React from 'react'

import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { usePaddle } from './use-paddle'

interface PaddleCheckoutParams {
  product: number | string
  title?: string
  message?: string
  coupon?: string
  email?: string
  marketingConsent?: string
  country?: string
  postcode?: string
  allowQuantity?: string | boolean
  quantity?: string | number
  disableLogout?: string | boolean
  locale?: string
  passthrough?: string
  referring_domain?: string
  success?: string
  successCallback?(data: any): void
  closeCallback?(data: any): void
  loadCallback?(): void
  upsell?: string | number
  upsellTitle?: string
  upsellText?: string
  upsellAction?: string
  upsellCoupon?: string
  upsellPassthrough?: string
  override?: string
  displayModeTheme?: string
}

export interface InlineCheckoutProps extends BoxProps, PaddleCheckoutParams {}

export const InlineCheckout: React.FC<InlineCheckoutProps> = (props) => {
  const { colorMode } = useColorMode()
  const {
    product,
    title,
    message,
    coupon,
    email,
    marketingConsent,
    country,
    postcode,
    allowQuantity,
    quantity,
    disableLogout = true,
    locale,
    passthrough,
    referring_domain,
    success,
    successCallback,
    closeCallback,
    loadCallback,
    upsell,
    upsellTitle,
    upsellText,
    upsellAction,
    upsellCoupon,
    upsellPassthrough,
    override,
    displayModeTheme = colorMode,
    ...rest
  } = props

  const className = 'saas-ui-paddle__inline-checkout'

  const Paddle = usePaddle()

  React.useEffect(() => {
    if (!product || !Paddle) {
      return
    }

    Paddle.Checkout.open({
      method: 'inline',
      product,
      title,
      message,
      coupon,
      email,
      marketingConsent,
      country,
      postcode,
      allowQuantity,
      quantity,
      disableLogout,
      locale,
      passthrough,
      referring_domain,
      success,
      successCallback,
      closeCallback,
      loadCallback,
      upsell,
      upsellTitle,
      upsellText,
      upsellAction,
      upsellCoupon,
      upsellPassthrough,
      override,
      displayModeTheme,
      frameTarget: className,
      frameInitialHeight: 416,
      frameStyle:
        'width:100%; min-width:312px; background-color: transparent; border: none;',
    })
  }, [product, Paddle, displayModeTheme])

  return <Box {...rest} className={cx(className, props.className)} />
}
