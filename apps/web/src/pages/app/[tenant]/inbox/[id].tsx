import { createPage } from '@app/nextjs'

import { InboxListPage } from '@modules/inbox'

export default createPage({
  title: 'Inbox',
  renderComponent: () => {
    return <InboxListPage />
  },
})
