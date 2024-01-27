import { createPage } from '@app/nextjs'
import { AccountNotificationsPage } from '@app/features/settings/pages/account/notifications'

const { Page, metadata } = createPage({
  title: 'Notifications',
  renderComponent: AccountNotificationsPage,
})

export { metadata }
export default Page
