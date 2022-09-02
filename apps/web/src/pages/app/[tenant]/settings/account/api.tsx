import { createPage } from '@app/nextjs'
import { AccountApiPage } from '@modules/settings'

export default createPage({
  title: 'Api',
  layout: 'settings',
  renderComponent: () => {
    return <AccountApiPage />
  },
})
