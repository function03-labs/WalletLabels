import { createPage } from '@app/nextjs'
import { PlansPage } from '@app/features/settings/pages/plans'

const { Page, metadata } = createPage({
  title: 'Plans',
  renderComponent: PlansPage,
})

export { metadata }
export default Page
