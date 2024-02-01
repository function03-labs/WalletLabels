'use client'

import * as React from 'react'

import {
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ErrorBoundary, LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { FiSidebar } from 'react-icons/fi'

import {
  Page,
  PageBody,
  PageHeader,
  Toolbar,
  ToolbarButton,
} from '@saas-ui-pro/react'
import { Breadcrumbs } from '@ui/lib'

import { useCurrentUser } from '@app/features/common/hooks/use-current-user'
import { usePath } from '@app/features/common/hooks/use-path'

import { ContactSidebar } from '../components/contact-sidebar'
import { Activities, ActivityTimeline } from '../components/activity-timeline'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addComment,
  deleteComment,
  getContact,
  getContactActivities,
} from '@api/client'

interface ContactsViewPageProps {
  params: {
    workspace: string
    id: string
  }
  /**
   * Whether the page is embedded in another page, eg the inbox
   */
  isEmbedded?: boolean
}

export function ContactsViewPage({
  params,
  isEmbedded,
}: ContactsViewPageProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['Contact', params.id],
    queryFn: () => getContact({ id: params.id }),
    enabled: !!params.id,
  })

  const isMobile = useBreakpointValue(
    { base: true, lg: false },
    {
      fallback: undefined,
    },
  )

  const sidebar = useDisclosure({
    defaultIsOpen: true,
  })

  React.useEffect(() => {
    if (isMobile === true) {
      sidebar.onClose()
    }
  }, [isMobile])

  const breadcrumbs = (
    <Breadcrumbs
      items={[
        { href: usePath('/contacts'), title: 'Contacts' },
        { title: data?.contact?.name },
      ]}
    />
  )

  const toolbar = (
    <Toolbar>
      <Spacer />
      <ToolbarButton
        icon={<FiSidebar />}
        label={sidebar.isOpen ? 'Hide contact details' : 'Show contact details'}
        onClick={sidebar.onToggle}
      />
    </Toolbar>
  )

  return (
    <Page isLoading={isLoading}>
      <PageHeader
        title={breadcrumbs}
        toolbar={toolbar}
        sx={
          isEmbedded
            ? {
                // @todo improve this in the Page theme.
                '& > .sui-page__header-content': {
                  ps: '4',
                },
              }
            : {}
        }
      />
      <PageBody contentWidth="full" p="0">
        <HStack
          alignItems="stretch"
          width="100%"
          height="100%"
          overflowX="hidden"
          position="relative"
          spacing="0"
        >
          <Tabs
            variant="line"
            isLazy
            flex="1"
            minH="0"
            display="flex"
            flexDirection="column"
            size="sm"
          >
            <TabList borderBottomWidth="1px" px="3" pt="2">
              <Tab borderTopRadius="md">Activity</Tab>
            </TabList>
            <TabPanels
              overflowY="auto"
              maxW="container.xl"
              margin="0 auto"
              flex="1"
            >
              <TabPanel px="8">
                <ErrorBoundary>
                  <ActivitiesPanel contactId={params.id} />
                </ErrorBoundary>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <ContactSidebar contact={data?.contact} isOpen={sidebar.isOpen} />
        </HStack>
      </PageBody>
    </Page>
  )
}

const ActivitiesPanel: React.FC<{ contactId: string }> = ({ contactId }) => {
  const currentUser = useCurrentUser()

  const { data, isLoading } = useQuery({
    queryKey: ['ContactActivities', contactId],
    queryFn: () => getContactActivities({ id: contactId }),
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addComment,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['ContactActivities', contactId],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['ContactActivities', contactId],
      })
    },
  })

  return (
    <>
      {!currentUser || isLoading ? (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      ) : (
        <>
          <ActivityTimeline
            activities={(data?.activities || []) as Activities}
            currentUser={currentUser}
            onAddComment={async (data) => {
              return addMutation.mutate({
                contactId,
                comment: data.comment,
              })
            }}
            onDeleteComment={async (id) => {
              return deleteMutation.mutate({
                id: id as string,
              })
            }}
          />
        </>
      )}
    </>
  )
}
