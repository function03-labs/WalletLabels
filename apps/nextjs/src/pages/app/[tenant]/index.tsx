import { createPage } from '@app/nextjs'

import { OverviewPage } from '@modules/organizations'

export default createPage({
  title: 'Project Overview',
  renderComponent: () => {
    return <OverviewPage />
  },
})
