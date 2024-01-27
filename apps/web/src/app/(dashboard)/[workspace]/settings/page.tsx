import { createPage } from '@app/nextjs'
import { SettingsOverviewPage } from '@app/features/settings/pages/overview'

const { Page, metadata } = createPage({
  title: 'Organization Settings',
  renderComponent: SettingsOverviewPage,
})

export { metadata }
export default Page
