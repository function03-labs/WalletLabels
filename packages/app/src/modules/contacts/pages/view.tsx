import { useGetContactQuery } from '@app/graphql'

import {
  Box,
  HStack,
  Skeleton,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { FiSidebar } from 'react-icons/fi'

import * as Yup from 'yup'

import { Page, PageBody, Toolbar, ToolbarButton } from '@saas-ui/pro'

import { ContactSidebar } from '../components/contact-sidebar'
import { usePath } from '@modules/core/hooks/use-path'
import { Breadcrumbs } from '@modules/core/components/breadcrumbs'

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

interface ContactsViewPageProps {
  id: string
}

export function ContactsViewPage({ id }: ContactsViewPageProps) {
  const { data, isLoading, error } = useGetContactQuery({
    id: String(id),
  })

  const sidebar = useDisclosure({
    defaultIsOpen: true,
  })

  const breadcrumbs = (
    <Breadcrumbs
      items={[
        { href: usePath('/contacts'), title: 'Contacts' },
        { title: data?.contact?.fullName },
      ]}
    />
  )

  const toolbar = (
    <Toolbar>
      <Spacer />
      <ToolbarButton
        icon={<FiSidebar />}
        label={sidebar.isOpen ? 'Hide sidebar' : 'Show sidebar'}
        onClick={sidebar.onToggle}
      />
    </Toolbar>
  )

  return (
    <Page title={breadcrumbs} toolbar={toolbar} isLoading={isLoading} fullWidth>
      <HStack alignItems="stretch" height="100%">
        <Box overflowY="auto" flex="1" py="8" px="20"></Box>
        <ContactSidebar contact={data?.contact} isOpen={sidebar.isOpen} />
      </HStack>
    </Page>
  )
}
