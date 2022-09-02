import { createPage } from '@app/nextjs'

import { CheckoutPage } from '@app/features/billing'

export default createPage({
  title: 'Checkout',
  layout: 'fullscreen',
  renderComponent: (props) => {
    const { query } = props

    return <CheckoutPage plan={query.plan} />
  },
})
