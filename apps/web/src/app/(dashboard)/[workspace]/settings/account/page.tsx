import { createPage } from '@app/nextjs'
import { AccountProfilePage } from '@app/features/settings/pages/account/index'

const { Page, metadata } = createPage({
  title: 'Account Settings',
  renderComponent: () => <AccountProfilePage />,
})

export { metadata }
export default Page
