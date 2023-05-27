import { createPage } from '@app/nextjs'

import { InboxListPage } from '@app/features/inbox'

export default createPage({
  title: 'Inbox',
  renderComponent: ({ query }) => {
    return <InboxListPage id={query.id} />
  },
})
