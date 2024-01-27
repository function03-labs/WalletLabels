import { createPage } from '@app/nextjs'
import { DashboardPage } from '@app/features/organizations/pages/dashboard'

const { Page, metadata } = createPage({
  title: 'Dashboard',
  renderComponent: () => <DashboardPage />,
})

export { metadata }
export default Page
