import { createPage } from '@app/nextjs'
import { BillingPage } from '@app/features/settings'

export default createPage({
  title: 'Billing',
  layout: 'settings',
  renderComponent: () => {
    return <BillingPage />
  },
})
