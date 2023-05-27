import * as React from 'react'
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

import { useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getConversations } from '@api/client'

export interface InboxListPageProps {
  id?: string
}

export function InboxListPage(props: InboxListPageProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['Conversations'],
    queryFn: () => getConversations(),
  })

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: !!props.id,
  })

  React.useEffect(() => {
    if (props.id) {
      onOpen()
    }
    // the isMobile dep is needed so that the SplitPage
    // will open again when the screen size changes to lg
  }, [props.id, isMobile])

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

  if (props.id) {
    content = <InboxViewPage id={props.id} />
  } else {
    content = emptyState
  }

  const pageProps = isMobile
    ? {}
    : {
        borderRightWidth: '1px',
        width: '30%',
        maxWidth: '400px',
      }

  return (
    <SplitPage isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Page isLoading={isLoading} {...pageProps}>
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
