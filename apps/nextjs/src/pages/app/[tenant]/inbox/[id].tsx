import { useRouter } from 'next/router'
import { createPage } from '@app/nextjs'

import { InboxListPage } from '@modules/inbox'

export default createPage({
  title: 'Inbox',
  renderComponent: () => {
    const router = useRouter()

    return <InboxListPage query={router.query} />
  },
})
