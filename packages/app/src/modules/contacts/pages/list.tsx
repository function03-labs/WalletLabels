import * as React from 'react'

import {
  useGetContactsQuery,
  Contact,
  useCreateContactMutation,
} from '@app/graphql'

import * as Yup from 'yup'

import {
  Box,
  Tag,
  Spacer,
  MenuItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiUser } from 'react-icons/fi'
import {
  EmptyState,
  OverflowMenu,
  Column,
  useModals,
  useHotkeysShortcut,
} from '@saas-ui/react'
import {
  Command,
  Toolbar,
  ToolbarButton,
  useTenant,
  useDataGridFilter,
  DataGridCell,
} from '@saas-ui/pro'
import { useParams } from '@saas-ui/router'

import { ListPage } from '@modules/core/components/list-page'

import { format } from 'date-fns'
import { InlineSearch } from '@modules/core/components/inline-search'
import { Button } from '@modules/core/components/button'

import { ContactTypes } from '../components/contact-types'
import { filters, AddFilterButton } from '../components/contact-filters'

const contactTypes: Record<string, { label: string; color: string }> = {
  lead: {
    label: 'Lead',
    color: 'cyan',
  },
  customer: {
    label: 'Customer',
    color: 'purple',
  },
}

const contactStatus: Record<string, { label: string; color: string }> = {
  active: {
    label: 'Active',
    color: 'green',
  },
  inactive: {
    label: 'Inactive',
    color: 'orange',
  },
  new: {
    label: 'New',
    color: 'blue',
  },
}

const StatusCell: DataGridCell<Contact> = (cell) => {
  const status = contactStatus[cell.value] || contactStatus.new
  return (
    <Tag colorScheme={status.color} size="sm">
      {status.label}
    </Tag>
  )
}

const TypeCell: DataGridCell<Contact> = (cell) => {
  const type = contactTypes[cell.value] || contactTypes.lead
  return (
    <Tag colorScheme={type.color} size="sm" variant="outline">
      {type.label}
    </Tag>
  )
}

const DateCell: DataGridCell<Contact> = (cell) => {
  return <>{format(new Date(cell.value), 'PP')}</>
}

const ActionCell: DataGridCell<Contact> = () => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <OverflowMenu size="xs">
        <MenuItem>Delete</MenuItem>
      </OverflowMenu>
    </Box>
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
  const params = useParams()

  const [searchQuery, setSearchQuery] = React.useState('')

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const { data, isLoading } = useGetContactsQuery({
    type: params?.type as string,
  })

  const mutation = useCreateContactMutation()

  const addPerson = () => {
    modals.form?.({
      title: 'Add person',
      schema,
      submitLabel: 'Save',
      onSubmit: (contact) =>
        mutation.mutateAsync({
          name: contact.name,
        }),
    })
  }

  const addCommand = useHotkeysShortcut('contacts.add', addPerson)

  const primaryAction = (
    <ToolbarButton
      label="Add person"
      variant="solid"
      colorScheme="primary"
      onClick={addPerson}
      tooltipProps={{
        label: (
          <>
            Add a person <Command>{addCommand}</Command>
          </>
        ),
      }}
    />
  )

  const toolbarItems = (
    <>
      <ContactTypes />
      <AddFilterButton />
      <Spacer />
      <InlineSearch
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onReset={() => setSearchQuery('')}
      />
    </>
  )

  const toolbar = (
    <Toolbar>
      {!isMobile && toolbarItems} {primaryAction}
    </Toolbar>
  )

  const tabbar = isMobile && <Toolbar>{toolbarItems}</Toolbar>

  const bulkActions = (
    <>
      <Button>Add to segment</Button>
      <Button>Add tags</Button>
    </>
  )

  const columns: Column<Contact>[] = [
    {
      id: 'name',
      accessor: 'fullName',
      Header: 'Name',
      href: ({ id }) => `/app/${tenant}/contacts/view/${id}`,
      width: '300px',
    },
    {
      id: 'email',
      Header: 'Email',
      width: '300px',
    },
    {
      id: 'createdAt',
      Header: 'Created at',
      Cell: DateCell,
      filter: useDataGridFilter('date'),
      disableGlobalFilter: true,
    },
    {
      id: 'type',
      Header: 'Type',
      Cell: TypeCell,
      filter: useDataGridFilter('string'),
      disableGlobalFilter: true,
      isNumeric: true,
    },
    {
      id: 'status',
      Header: 'Status',
      Cell: StatusCell,
      filter: useDataGridFilter('string'),
      disableGlobalFilter: true,
      isNumeric: true,
    },
    {
      id: 'action',
      disableSortBy: true,
      Header: '',
      Cell: ActionCell,
      width: '100px',
      disableGlobalFilter: true,
      isNumeric: true,
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
      tabbar={tabbar}
      bulkActions={bulkActions}
      filters={filters}
      searchQuery={searchQuery}
      emptyState={emptyState}
      columns={columns}
      data={data?.contacts as Contact[]}
      isLoading={isLoading}
    />
  )
}
