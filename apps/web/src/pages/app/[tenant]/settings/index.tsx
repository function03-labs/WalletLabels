import { createPage } from '@app/nextjs'
import { SettingsOverviewPage } from '@modules/settings'

export default createPage({
  title: 'Organization Settings',
  layout: 'settings',
  renderComponent: () => {
    return <SettingsOverviewPage />
  },
})
