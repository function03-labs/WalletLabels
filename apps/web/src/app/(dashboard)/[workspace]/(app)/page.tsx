import { createPage } from '@app/nextjs'
import { DashboardPage } from '@app/features/organizations'

const { Page, metadata } = createPage({
  title: 'Dashboard',
  renderComponent: () => <DashboardPage />,
})

export { metadata }
export default Page
