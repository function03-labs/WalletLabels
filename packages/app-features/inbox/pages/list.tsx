import { useRouter } from 'next/router'
import { FiInbox, FiFilter } from 'react-icons/fi'
import { EmptyState } from '@saas-ui/react'
import {
  Page,
  PageBody,
  PageHeader,
  SplitPage,
  Toolbar,
  ToolbarButton,
} from '@saas-ui-pro/react'

import { InboxViewPage } from './view'
import { InboxList } from '../components/inbox-list'

import { useBreakpointValue } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getConversations } from '@api/client'

export function InboxListPage() {
  const { query } = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['Conversations'],
    queryFn: () => getConversations(),
  })

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const toolbar = (
    <Toolbar>
      <ToolbarButton icon={<FiFilter />} label="Filter" variant="tertiary" />
    </Toolbar>
  )

  const emptyState = (
    <EmptyState
      icon={FiInbox}
      title="Inbox zero"
      description="Nothing to do here"
      variant="centered"
      height="100%"
    />
  )

  let content

  if (query.id) {
    content = <InboxViewPage />
  } else {
    content = emptyState
  }

  return (
    <SplitPage>
      <Page
        isLoading={isLoading}
        borderRightWidth="1px"
        width="30%"
        maxWidth="400px"
      >
        <PageHeader title="Inbox" toolbar={toolbar} />
        <PageBody p="0">
          {!data?.conversations?.length && isMobile ? (
            emptyState
          ) : (
            <InboxList items={data?.conversations || []} />
          )}
        </PageBody>
      </Page>
      {content}
    </SplitPage>
  )
}
