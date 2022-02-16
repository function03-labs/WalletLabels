import { useRouter } from 'next/router'

import {
  useGetContactsQuery,
  Contact,
  useCreateContactMutation,
} from '@app/graphql'

import * as Yup from 'yup'

import { Tag, Kbd, MenuItem } from '@chakra-ui/react'
import { FiUser, FiUploadCloud } from 'react-icons/fi'
import {
  Button,
  EmptyState,
  Column,
  useModals,
  useHotkeysShortcut,
} from '@saas-ui/react'
import { Toolbar, ToolbarButton, useTenant } from '@saas-ui/pro'
import { ListPage } from '@modules/core/components/list-page'

import { OverflowMenu } from '@ui/overflow-menu'

const StatusCell = (cell: any) => {
  switch (cell.status) {
    case 'active':
      return (
        <Tag colorScheme="green" size="sm">
          Active
        </Tag>
      )
    case 'inactive':
      return (
        <Tag colorScheme="orange" size="sm">
          Inactive
        </Tag>
      )
    case 'new':
    default:
      return (
        <Tag colorScheme="blue" size="sm">
          New
        </Tag>
      )
  }
}

const ActionCell = () => {
  return (
    <OverflowMenu size="xs">
      <MenuItem>Delete</MenuItem>
    </OverflowMenu>
  )
}

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

export function ContactsListPage() {
  const tenant = useTenant()
  const modals = useModals()

  const { data, isLoading } = useGetContactsQuery({
    organizationId: tenant,
  })

  const mutation = useCreateContactMutation()

  const addPerson = () => {
    modals.form?.({
      title: 'Add person',
      schema: schema,
      submitLabel: 'Save',
      onSubmit: (contact) => mutation.mutateAsync(contact),
    })
  }

  const addCommand = useHotkeysShortcut('contacts.add', addPerson)

  const toolbar = (
    <Toolbar>
      <ToolbarButton icon={<FiUploadCloud />} label="Import data" />
      <ToolbarButton
        label="Add person"
        variant="solid"
        onClick={addPerson}
        tooltipProps={{
          label: (
            <>
              Add a person <Kbd>{addCommand}</Kbd>
            </>
          ),
        }}
      />
    </Toolbar>
  )

  const columns: Column<Contact>[] = [
    {
      id: 'fullName',
      Header: 'Name',
      href: ({ id }) => `/app/${tenant}/contacts/${id}`,
    },
    {
      id: 'email',
      Header: 'Email',
    },
    {
      id: 'status',
      Header: 'Status',
      Cell: StatusCell,
      width: '1%',
    },
    {
      id: 'action',
      disableSortBy: true,
      Header: '',
      Cell: ActionCell,
      width: '1%',
    },
  ]

  const emptyState = (
    <EmptyState
      title="No people added yet"
      description="Add a person or import data to get started."
      colorScheme="primary"
      icon={FiUser}
      actions={
        <>
          <Button colorScheme="primary" variant="solid" onClick={addPerson}>
            Add a person
          </Button>
          <Button>Import data</Button>
        </>
      }
    />
  )

  return (
    <ListPage<Contact>
      title="Contacts"
      toolbar={toolbar}
      emptyState={emptyState}
      columns={columns}
      data={data?.contacts as Contact[]}
      isLoading={isLoading}
    />
  )
}
