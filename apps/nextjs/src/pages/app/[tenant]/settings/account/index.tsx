import { createPage } from '@app/nextjs'
import { AccountProfilePage } from '@modules/settings'

export default createPage({
  title: 'Profile',
  layout: 'settings',
  renderComponent: () => {
    return <AccountProfilePage />
  },
})
