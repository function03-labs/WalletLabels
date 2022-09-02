import { createPage } from '@app/nextjs'
import { AccountSecurityPage } from '@modules/settings'

export default createPage({
  title: 'Security',
  layout: 'settings',
  renderComponent: () => {
    return <AccountSecurityPage />
  },
})
