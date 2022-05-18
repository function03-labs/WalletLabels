import { createPage } from '@app/nextjs'

import { CheckoutPage } from '@modules/billing'

export default createPage({
  title: 'Checkout',
  layout: 'fullscreen',
  renderComponent: (props) => {
    const { query } = props

    return <CheckoutPage plan={query.plan} />
  },
})
