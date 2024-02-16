import { createPage } from '@app/nextjs'
import { DashboardPage } from '@app/features/organizations/pages/dashboard'
import { ApiKeysPage } from '@app/features/organizations/pages/apikeys'

const { Page, metadata } = createPage({
  title: 'API Keys',
  // renderComponent: () => <DashboardPage />,
  renderComponent: () => <ApiKeysPage />,
})

export { metadata }
export default Page
