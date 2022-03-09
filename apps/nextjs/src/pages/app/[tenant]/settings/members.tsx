import { createPage } from '@app/nextjs'
import { MembersSettingsPage } from '@modules/settings'

export default createPage({
  title: 'Members',
  layout: 'settings',
  renderComponent: () => {
    return <MembersSettingsPage />
  },
})
