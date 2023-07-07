import { createPage } from '@app/nextjs'
import { PlansPage } from '@app/features/settings'

export default createPage({
  title: 'Plans',
  layout: 'settings',
  renderComponent: () => {
    return <PlansPage />
  },
})
