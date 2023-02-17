import * as React from 'react'
import { FiInbox, FiFilter } from 'react-icons/fi'
import { EmptyState } from '@saas-ui/react'
import { SplitPage, Toolbar, ToolbarButton } from '@saas-ui/pro'

import { InboxViewPage } from './view'
import { InboxList } from '../components/inbox-list'

import { useParams } from '@saas-ui/router'
import { useBreakpointValue } from '@chakra-ui/react'

const items = [
  {
    id: 1,
    name: 'Elliot Alderson',
    avatar: 'https://bit.ly/2Z4KKcF',
    subject: 'A bug is never just a mistake.',
    message:
      'It represents something bigger. An error of thinking that makes you who you are.',
    time: '3:56 PM',
  },
  {
    id: 2,
    name: 'Darlene Alderson',
    avatar: 'https://bit.ly/2Z4KKcF',
    subject: 'A bug is never just a mistake.',
    message:
      'It represents something bigger. An error of thinking that makes you who you are.',
    time: '3:56 PM',
  },
  {
    id: 3,
    name: 'Angela Moss',
    avatar: 'https://bit.ly/2Z4KKcF',
    subject: 'A bug is never just a mistake.',
    message:
      'It represents something bigger. An error of thinking that makes you who you are.',
    time: '3:56 PM',
  },
  {
    id: 4,
    name: 'Tyrell Wellick',
    avatar: 'https://bit.ly/2Z4KKcF',
    subject: 'A bug is never just a mistake.',
    message:
      'It represents something bigger. An error of thinking that makes you who you are.',
    time: '3:56 PM',
  },
]

export function InboxListPage() {
  const params = useParams()

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const toolbar = (
    <Toolbar>
      <ToolbarButton icon={<FiFilter />} label="Filter" />
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

  if (params.id) {
    content = <InboxViewPage />
  } else {
    content = emptyState
  }

  return (
    <SplitPage title="Inbox" toolbar={toolbar} content={content}>
      {!items.length && isMobile ? emptyState : <InboxList items={items} />}
    </SplitPage>
  )
}
