import { createPage } from '@app/nextjs'
import { AccountSecurityPage } from '@app/features/settings/pages/account/security'

const { Page, metadata } = createPage({
  title: 'Security',
  renderComponent: AccountSecurityPage,
})

export { metadata }
export default Page
