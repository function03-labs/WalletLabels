import { FiInbox, FiFilter } from 'react-icons/fi'
import { EmptyState } from '@saas-ui/react'
import { Toolbar, ToolbarButton } from '@saas-ui/pro'
import { SplitPage } from '@modules/core/components/split-page'

import { InboxViewPage } from './view'
import { InboxList } from '../components/inbox-list'

export function InboxListPage({ query }) {
  const toolbar = (
    <Toolbar>
      <ToolbarButton icon={<FiFilter />} label="Filter" />
    </Toolbar>
  )

  let content

  if (query?.id) {
    content = <InboxViewPage flex="1" />
  } else {
    content = (
      <EmptyState
        icon={FiInbox}
        title="Inbox zero"
        description="Nothing to do here"
        variant="centered"
      />
    )
  }

  return (
    <SplitPage title="Inbox" toolbar={toolbar} content={content}>
      <InboxList />
    </SplitPage>
  )
}
