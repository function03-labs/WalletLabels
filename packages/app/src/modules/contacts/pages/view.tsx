import { useRouter } from 'next/router'

import { useGetContactQuery } from '@app/graphql'

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from '@chakra-ui/react'

import * as Yup from 'yup'

import { SplitPage } from '@saas-ui/pro'

import { ContactSidebar } from '../components/contact-sidebar'

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

  const breadcrumbs = (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Contacts</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{data?.contact?.fullName}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )

  const sidebar = <ContactSidebar contact={data?.contact} />

  return (
    <SplitPage
      title={breadcrumbs}
      isLoading={isLoading}
      fullWidth
      width="auto"
      maxW="100%"
      content={sidebar}
    ></SplitPage>
  )
}
