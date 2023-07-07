import { createPage } from '@app/nextjs'
import { MembersSettingsPage } from '@app/features/settings'

export default createPage({
  title: 'Members',
  layout: 'settings',
  renderComponent: () => {
    return <MembersSettingsPage />
  },
})
