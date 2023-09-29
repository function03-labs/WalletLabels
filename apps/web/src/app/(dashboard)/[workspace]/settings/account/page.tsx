import { createPage } from '@app/nextjs'
import { AccountProfilePage } from '@app/features/settings'

const { Page, metadata } = createPage({
  title: 'Account Settings',
  renderComponent: () => null,
})

export { metadata }
export default Page
