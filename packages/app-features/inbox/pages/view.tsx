import { getConversation } from '@api/client'
import { useBreakpointValue } from '@chakra-ui/react'
import {
  BackButton,
  Page,
  PageBody,
  PageHeader,
  Toolbar,
  useSplitPage,
} from '@saas-ui-pro/react'
import { EmptyState } from '@saas-ui/react'
import { useQuery } from '@tanstack/react-query'

export interface InboxListPageProps {
  id?: string
}

export function InboxViewPage(props: InboxListPageProps) {
  const { onClose } = useSplitPage()

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const nav = isMobile ? <BackButton onClick={onClose} /> : null

  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ['Conversation', props.id],
    queryFn: () => (props.id ? getConversation(props.id) : null),
  })

  let content
  if ((isFetched && !data) || isError) {
    content = <EmptyState></EmptyState>
  }

  const title = data
    ? data.conversation.subject
    : !isLoading
    ? 'Conversation not found'
    : ''

  return (
    <Page isLoading={isError}>
      <PageHeader title={title} nav={nav} />
      <PageBody>{content}</PageBody>
    </Page>
  )
}
