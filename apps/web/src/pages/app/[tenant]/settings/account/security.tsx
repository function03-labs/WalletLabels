import { createPage } from '@app/nextjs'
import { AccountSecurityPage } from '@app/features/settings'

export default createPage({
  title: 'Security',
  layout: 'settings',
  renderComponent: () => {
    return <AccountSecurityPage />
  },
})
