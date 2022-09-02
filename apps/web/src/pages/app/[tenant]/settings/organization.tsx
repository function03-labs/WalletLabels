import { createPage } from '@app/nextjs'
import { OrganizationSettingsPage } from '@modules/settings'

export default createPage({
  title: 'Organization Settings',
  layout: 'settings',
  renderComponent: () => {
    return <OrganizationSettingsPage />
  },
})
