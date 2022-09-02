import { createPage } from '@app/nextjs'
import { PlansPage } from '@modules/settings'

export default createPage({
  title: 'Plans',
  layout: 'settings',
  renderComponent: () => {
    return <PlansPage />
  },
})
