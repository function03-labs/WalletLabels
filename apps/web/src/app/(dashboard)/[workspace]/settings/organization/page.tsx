import { createPage } from '@app/nextjs'
import { OrganizationSettingsPage } from '@app/features/settings/pages/organization'

const { Page, metadata } = createPage({
  title: 'Organization Settings',
  renderComponent: OrganizationSettingsPage,
})

export { metadata }
export default Page
