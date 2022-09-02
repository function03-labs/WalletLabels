import { createPage } from '@app/nextjs'
import { AccountApiPage } from '@app/features/settings'

export default createPage({
  title: 'Api',
  layout: 'settings',
  renderComponent: () => {
    return <AccountApiPage />
  },
})
