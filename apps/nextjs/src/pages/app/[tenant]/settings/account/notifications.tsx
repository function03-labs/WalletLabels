import { createPage } from '@app/nextjs'
import { AccountNotificationsPage } from '@modules/settings'

export default createPage({
  title: 'Notifications',
  layout: 'settings',
  renderComponent: () => {
    return <AccountNotificationsPage />
  },
})
