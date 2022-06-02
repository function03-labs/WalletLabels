import * as React from 'react'

import { PropertyList, Property, Persona } from '@saas-ui/react'

import {
  PageSidebar,
  PageSidebarHeader,
  PageSidebarBody,
  PageSidebarProps,
} from '@saas-ui/pro'

import { Contact } from '@app/graphql'

export interface ContactSidebarProps extends PageSidebarProps {
  contact?: Contact | null
}

export const ContactSidebar: React.FC<ContactSidebarProps> = (props) => {
  const { contact, ...rest } = props

  const content = (
    <PropertyList>
      <Property label="Email" value={contact?.email} />
      <Property label="Type" value={contact?.type} />
      <Property label="Status" value={contact?.status} />
      <Property label="Signed up" value="Januari 10, 2022" />
    </PropertyList>
  )

  return (
    <PageSidebar
      defaultWidth={400}
      minWidth="200px"
      maxWidth="500px"
      borderLeftWidth="1px"
      isResizable
      {...rest}
    >
      <PageSidebarHeader>
        <Persona name={contact?.fullName || ''} size="xs" />
      </PageSidebarHeader>
      <PageSidebarBody>{content}</PageSidebarBody>
    </PageSidebar>
  )
}
