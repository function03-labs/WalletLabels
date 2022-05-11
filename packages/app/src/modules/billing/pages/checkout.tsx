import * as React from 'react'
import { Page, useTenant } from '@saas-ui/pro'
import { InlineCheckout } from '@saas-ui/paddle'
import { useCurrentUser, useSnackbar } from '@saas-ui/react'
import { useNavigate } from '@saas-ui/router'

interface CheckoutPageProps {
  product: number
}

export function CheckoutPage({ product }: CheckoutPageProps) {
  const tenant = useTenant()
  const user = useCurrentUser()
  const navigate = useNavigate()

  const snackbar = useSnackbar()

  const onSuccess = (data: any) => {
    snackbar.success({
      title: 'Upgrade successful',
      description: `Your account has been upgraded to ${data.product.name}`,
    })
    onClose(data)
  }

  const onClose = (data: any) => {
    navigate(`/app/${tenant}/settings/billing`)
  }

  return (
    <Page title="Checkout" description="Upgrade Saas UI">
      <InlineCheckout
        product={product}
        email={user?.email}
        passthrough={user?.id}
        py={[8, null, 20]}
        successCallback={onSuccess}
        closeCallback={onClose}
      />
    </Page>
  )
}
