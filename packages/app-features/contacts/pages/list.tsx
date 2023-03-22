import * as React from 'react'

import { z } from 'zod'

import {
  Box,
  Button,
  Tag,
  Spacer,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import { FiSliders, FiUser } from 'react-icons/fi'
import {
  EmptyState,
  OverflowMenu,
  useModals,
  useHotkeysShortcut,
  useLocalStorage,
} from '@saas-ui/react'
import { useParams } from '@saas-ui/router'
import {
  Command,
  Toolbar,
  ToolbarButton,
  useTenant,
  useDataGridFilter,
  DataGridCell,
  BulkActionsSelections,
  MenuProperty,
  ToggleButtonGroup,
  ToggleButton,
  useColumns,
} from '@saas-ui/pro'

import { ListPage, InlineSearch } from '@ui/lib'

import { Contact, createContact, getContacts } from '@api/client'

import { format } from 'date-fns'

import { ContactTypes } from '../components/contact-types'
import { filters, AddFilterButton } from '../components/contact-filters'
import { useMutation, useQuery } from '@tanstack/react-query'

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
  const status = contactStatus[cell.getValue<string>()] || contactStatus.new
  return (
    <Tag colorScheme={status.color} size="sm">
      {status.label}
    </Tag>
  )
}

const TypeCell: DataGridCell<Contact> = ({ cell }) => {
  const type = contactTypes[cell.getValue<string>()] || contactTypes.lead
  return (
    <Tag colorScheme={type.color} size="sm" variant="outline">
      {type.label}
    </Tag>
  )
}

const DateCell: DataGridCell<Contact> = ({ cell }) => {
  return <>{format(new Date(cell.getValue<string>()), 'PP')}</>
}

const ActionCell: DataGridCell<Contact> = (cell) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <OverflowMenu size="xs">
        <MenuItem onClick={() => console.log(cell.row.id)}>Delete</MenuItem>
      </OverflowMenu>
    </Box>
  )
}

const schema = z.object({
  firstName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('Name'),
  lastName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('Last name'),
  email: z.string().min(2, 'Too short').max(25, 'Too long').describe('Email'),
})

export function ContactsListPage() {
  const tenant = useTenant()
  const modals = useModals()
  const params = useParams()

  const [searchQuery, setSearchQuery] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: [
      'GetContacts',
      {
        type: params?.type as string,
      },
    ] as const,
    queryFn: ({ queryKey }) => getContacts(queryKey[1]),
  })

  const mutation = useMutation({
    mutationFn: createContact,
  })

  const columns = useColumns<Contact>(
    () => [
      {
        id: 'name',
        header: 'Name',
        size: 300,
        meta: {
          href: ({ id }) => `/app/${tenant}/contacts/view/${id}`,
        },
      },
      {
        id: 'email',
        header: 'Email',
        size: 300,
      },
      {
        id: 'createdAt',
        header: 'Created at',
        cell: DateCell,
        filterFn: useDataGridFilter('date'),
        enableGlobalFilter: false,
      },
      {
        id: 'updatedAt',
        header: 'Updated at',
        cell: DateCell,
        filterFn: useDataGridFilter('date'),
        enableGlobalFilter: false,
      },
      {
        id: 'type',
        header: 'Type',
        cell: TypeCell,
        filterFn: useDataGridFilter('string'),
        enableGlobalFilter: false,
        meta: {
          isNumeric: true,
        },
      },
      {
        id: 'status',
        header: 'Status',
        cell: StatusCell,
        filterFn: useDataGridFilter('string'),
        enableGlobalFilter: false,
        meta: {
          isNumeric: true,
        },
      },
      {
        id: 'action',
        header: '',
        cell: ActionCell,
        size: 100,
        enableGlobalFilter: false,
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [],
  )

  const addPerson = () => {
    modals.form?.({
      title: 'Add person',
      schema,
      submitLabel: 'Save',
      onSubmit: (contact) =>
        mutation.mutateAsync({
          // @todo fix onSubmit types
          ...(contact as z.infer<typeof schema>),
          type: params?.type as string,
        }),
    })
  }

  const addCommand = useHotkeysShortcut('contacts.add', addPerson)

  const [visibleColumns, setVisibleColumns] = useLocalStorage(
    'app.contacts.columns',
    ['name', 'email', 'createdAt', 'type', 'status'],
  )

  const displayProperties = (
    <ToggleButtonGroup
      type="checkbox"
      isAttached={false}
      size="xs"
      spacing="0"
      flexWrap="wrap"
      value={visibleColumns}
      onChange={setVisibleColumns}
    >
      {columns.map(({ id, enableHiding }) =>
        id && enableHiding !== false ? (
          <ToggleButton
            key={id}
            value={id}
            mb="1"
            me="1"
            color="muted"
            _checked={{ color: 'app-text', bg: 'whiteAlpha.200' }}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </ToggleButton>
        ) : null,
      )}
    </ToggleButtonGroup>
  )

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
      <Menu>
        <MenuButton as={ToolbarButton} leftIcon={<FiSliders />} label="View" />
        <Portal>
          <MenuList maxW="260px">
            <MenuProperty
              label="Display properties"
              value={displayProperties}
              orientation="vertical"
            />
          </MenuList>
        </Portal>
      </Menu>
    </>
  )

  const toolbar = (
    <Toolbar>
      <InlineSearch
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onReset={() => setSearchQuery('')}
      />
      {primaryAction}
    </Toolbar>
  )

  const tabbar = <Toolbar>{toolbarItems}</Toolbar>

  const bulkActions = ({
    selections,
  }: {
    selections: BulkActionsSelections
  }) => (
    <>
      <Button>Add to segment</Button>
      <Button>Add tags</Button>
    </>
  )

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
      visibleColumns={visibleColumns}
      data={data?.contacts as Contact[]}
      isLoading={isLoading}
    />
  )
}
