import { createPage } from '@app/nextjs'
import { AccountProfilePage } from '@app/features/settings'

export default createPage({
  title: 'Profile',
  layout: 'settings',
  renderComponent: () => {
    return <AccountProfilePage />
  },
})
