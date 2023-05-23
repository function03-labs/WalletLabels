import * as React from 'react'

import {
  Box,
  Heading,
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
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

import { useCurrentUser } from '@app/features/core/hooks/use-current-user'
import { usePath } from '@app/features/core/hooks/use-path'

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
  id: string
}

export function ContactsViewPage({ id }: ContactsViewPageProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Contact', id],
    queryFn: () => getContact({ id }),
    enabled: !!id,
  })

  const sidebar = useDisclosure({
    defaultIsOpen: true,
  })

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
      <PageHeader title={breadcrumbs} toolbar={toolbar} />
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
            size="md"
          >
            <TabList borderBottomWidth="1px" px="3" pt="2">
              <Tab borderTopRadius="md">Activity</Tab>
            </TabList>
            <TabPanels
              py="8"
              px="20"
              overflowY="auto"
              maxW="container.xl"
              margin="0 auto"
              flex="1"
            >
              <TabPanel>
                <ErrorBoundary>
                  <ActivitiesPanel contactId={id} />
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['ContactActivities', contactId],
    queryFn: () => getContactActivities({ id: contactId }),
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addComment,
    onSettled: (data) => {
      queryClient.invalidateQueries(['ContactActivities', contactId])
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSettled: () => {
      queryClient.invalidateQueries(['ContactActivities', contactId])
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
          <Heading size="md" mb="8">
            Activity
          </Heading>
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
