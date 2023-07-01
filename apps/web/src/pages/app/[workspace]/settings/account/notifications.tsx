import { createPage } from '@app/nextjs'
import { AccountNotificationsPage } from '@app/features/settings'

export default createPage({
  title: 'Notifications',
  layout: 'settings',
  renderComponent: () => {
    return <AccountNotificationsPage />
  },
})
