import { createPage } from '@app/nextjs'
import { BillingPage } from '@modules/settings'

export default createPage({
  title: 'Billing',
  layout: 'settings',
  renderComponent: () => {
    return <BillingPage />
  },
})
