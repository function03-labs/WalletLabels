import { createPage } from '@app/nextjs'
import { MembersSettingsPage } from '@app/features/settings/pages/members'

const { Page, metadata } = createPage({
  title: 'Members',
  renderComponent: MembersSettingsPage,
})

export { metadata }
export default Page
