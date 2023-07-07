import { createPage } from '@app/nextjs'

import { DashboardPage } from '@app/features/organizations'

export default createPage({
  title: 'Dashboard',
  renderComponent: () => {
    return <DashboardPage />
  },
})
