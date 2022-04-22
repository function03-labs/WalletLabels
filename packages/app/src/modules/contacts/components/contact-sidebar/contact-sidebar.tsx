import * as React from 'react'

import { PropertyList, Property, Persona } from '@saas-ui/react'

import { PageSidebar, PageSidebarHeader, PageSidebarBody } from '@saas-ui/pro'

import { Contact } from '@app/graphql'

export interface ContactSidebarProps {
  contact?: Contact
}

export const ContactSidebar: React.FC<ContactSidebarProps> = (props) => {
  const { contact } = props

  const content = (
    <PropertyList>
      <Property label="Email" value={contact?.email} />
      <Property label="Type" value={contact?.type} />
      <Property label="Status" value={contact?.status} />
      <Property label="Signed up" value="Januari 10, 2022" />
    </PropertyList>
  )

  return (
    <PageSidebar minWidth="320px">
      <PageSidebarHeader>
        <Persona name={contact?.fullName || ''} size="xs" />
      </PageSidebarHeader>
      <PageSidebarBody>{content}</PageSidebarBody>
    </PageSidebar>
  )
}
