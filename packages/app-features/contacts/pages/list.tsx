import * as React from 'react'

import { z } from 'zod'

import {
  Box,
  Button,
  Spacer,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  Tooltip,
  HStack,
  Text,
} from '@chakra-ui/react'
import { FiSliders, FiUser } from 'react-icons/fi'
import {
  EmptyState,
  OverflowMenu,
  useModals,
  useHotkeysShortcut,
  // useLocalStorage,
} from '@saas-ui/react'
import {
  Command,
  Toolbar,
  ToolbarButton,
  useTenant,
  DataGridCell,
  BulkActionsSelections,
  MenuProperty,
  ToggleButtonGroup,
  ToggleButton,
  useColumns,
  getDataGridFilter,
  Filter,
  useLocalStorage,
} from '@saas-ui-pro/react'

import { ListPage, InlineSearch } from '@ui/lib'

import { Contact, createContact, getContacts } from '@api/client'

import { format } from 'date-fns'

import { ContactTypes } from '../components/contact-types'
import { filters, AddFilterButton } from '../components/contact-filters'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ContactStatus } from '../components/contact-status'
import { ContactType } from '../components/contact-type'
import { CommandIcon, TagIcon } from 'lucide-react'
import { ContactTag } from '../components/contact-tag'
import { useRouter } from 'next/router'

const DateCell = ({ date }: { date: string }) => {
  return <>{format(new Date(date), 'PP')}</>
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
    .describe('First name'),
  lastName: z
    .string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .describe('Last name'),
  email: z.string().email().describe('Email'),
})

export function ContactsListPage() {
  const tenant = useTenant()
  const modals = useModals()
  const { query } = useRouter()

  const type = query?.type?.toString()

  const [searchQuery, setSearchQuery] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: [
      'GetContacts',
      {
        type,
      },
    ] as const,
    queryFn: ({ queryKey }) => getContacts(queryKey[1]),
  })

  const mutation = useMutation({
    mutationFn: createContact,
  })

  const columns = useColumns<Contact>(
    (helper) => [
      helper.accessor('name', {
        header: 'Name',
        size: 300,
        meta: {
          href: ({ id }: any) => `/app/${tenant}/contacts/view/${id}`,
        },
      }),
      helper.accessor('email', {
        header: 'Email',
        size: 300,
        cell: (cell) => <Text color="muted">{cell.getValue()}</Text>,
      }),
      helper.accessor('createdAt', {
        header: 'Created at',
        cell: (cell) => <DateCell date={cell.getValue()} />,
        filterFn: getDataGridFilter('date'),
        enableGlobalFilter: false,
      }),
      helper.accessor('updatedAt', {
        header: 'Updated at',
        cell: (cell) => <DateCell date={cell.getValue()} />,
        filterFn: getDataGridFilter('date'),
        enableGlobalFilter: false,
      }),
      helper.accessor('type', {
        header: 'Type',
        cell: (cell) => <ContactType type={cell.getValue()} />,
        filterFn: getDataGridFilter('string'),
        enableGlobalFilter: false,
      }),
      helper.accessor('tags', {
        header: 'Tags',
        cell: (cell) => (
          <HStack>
            {cell.getValue()?.map((tag) => (
              <ContactTag key={tag} tag={tag} />
            ))}
          </HStack>
        ),
        filterFn: getDataGridFilter('string'),
        enableGlobalFilter: false,
      }),
      helper.accessor('status', {
        header: 'Status',
        cell: (cell) => (
          <ContactStatus status={cell.getValue()} color="muted" />
        ),
        filterFn: getDataGridFilter('string'),
        enableGlobalFilter: false,
      }),
      helper.display({
        id: 'action',
        header: '',
        cell: ActionCell,
        size: 100,
        enableGlobalFilter: false,
        enableHiding: false,
        enableSorting: false,
      }),
    ],
    [],
  )

  const addPerson = () => {
    modals.form?.({
      title: 'Add person',
      schema,
      submitLabel: 'Save',
      /* @ts-ignore @todo fix submit types on FormDialog */
      onSubmit: (contact: z.infer<typeof schema>) =>
        mutation.mutateAsync({
          ...contact,
          type: query?.type as string,
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
      {columns.map((col) => {
        if ('accessorKey' in col && col.enableHiding !== false) {
          const id = col.id || col.accessorKey
          return (
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
          )
        }
        return null
      })}
    </ToggleButtonGroup>
  )

  const primaryAction = (
    <ToolbarButton
      label="Add person"
      variant="solid"
      size="md"
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
        <MenuButton
          as={ToolbarButton}
          leftIcon={<FiSliders />}
          label="View"
          size="sm"
          variant="tertiary"
        />
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
    <Toolbar size="sm">
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
      <Tooltip
        placement="top"
        label={
          <>
            Add tags <Command>⇧ T</Command>
          </>
        }
      >
        <Button colorScheme="gray" leftIcon={<TagIcon size="1em" />}>
          Add tags
        </Button>
      </Tooltip>
      <Tooltip
        placement="top"
        label={
          <>
            Command <Command>⇧ K</Command>
          </>
        }
      >
        <Button leftIcon={<CommandIcon size="1em" />}>Command</Button>
      </Tooltip>
    </>
  )

  let defaultFilters: Filter[] = []

  if (query?.tag) {
    defaultFilters = [{ id: 'tags', operator: 'contains', value: query.tag }]
  }

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
      defaultFilters={defaultFilters}
      searchQuery={searchQuery}
      emptyState={emptyState}
      columns={columns}
      visibleColumns={visibleColumns}
      data={data?.contacts as Contact[]}
      isLoading={isLoading}
    />
  )
}
