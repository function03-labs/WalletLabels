import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Badge, BadgeProps, Stack, Box, Text, Tag } from '@chakra-ui/react'

import { FiCircle, FiUser } from 'react-icons/fi'

import { FiltersProvider, FiltersProviderProps } from '../provider'
import { FiltersAddButton } from '../filters'
import { ActiveFiltersList } from '../active-filter'
import { Column, DataGrid, DataGridCell } from '../../data-grid'
import { useDataGridFilter } from '../use-data-grid-filter'
import { Cell, Filters, TableInstance } from 'react-table'
import { Button } from '@saas-ui/react'
import { NoFilteredResults } from '../no-filtered-results'
import { Filter } from '../use-active-filter'

export default {
  title: 'Components/Filters/Filters',
  decorators: [(Story: any) => <Story />],
} as Meta

const Template: Story<FiltersProviderProps> = (args) => {
  return (
    <FiltersProvider {...args}>
      <Stack alignItems="flex-start" width="400px">
        <Box px="3">
          <FiltersAddButton />
        </Box>

        <ActiveFiltersList px="3" py="2" borderBottomWidth="1px" zIndex="2" />
      </Stack>
    </FiltersProvider>
  )
}

const StatusBadge = (props: BadgeProps) => (
  <Badge boxSize="8px" mx="2px" borderRadius="full" {...props} />
)

const filters = [
  {
    id: 'status',
    label: 'Status',
    icon: <FiCircle />,
    items: [
      {
        id: 'new',
        label: 'New',
        icon: <StatusBadge bg="blue.400" />,
      },
      {
        id: 'active',
        label: 'Active',
        icon: <StatusBadge bg="green.400" />,
      },
    ],
  },
  {
    id: 'lead',
    label: 'Contact is lead',
    type: 'boolean',
    icon: <FiUser />,
    value: true,
    format: () => 'lead',
  },
]

export const Basic = Template.bind({})
Basic.args = {
  filters,
  onChange: (filters) => console.log(filters),
}

export const DefaultFilters = Template.bind({})
DefaultFilters.args = {
  filters,
  defaultFilters: [{ id: 'status', operator: 'is', value: 'new' }],
}

interface ExampleData {
  name: string
  phone: string
  email: string
  company: string
  country: string
  employees: number
  status: string
}

const data = [
  {
    id: 1,
    name: 'TaShya Charles',
    phone: '(651) 467-2240',
    email: 'urna.nec.luctus@icloud.couk',
    company: 'Luctus Et Industries',
    country: 'China',
    employees: 139,
    status: 'new',
  },
  {
    id: 2,
    name: 'Donovan Mosley',
    phone: '(154) 698-4775',
    email: 'lacinia.mattis.integer@icloud.couk',
    company: 'Nunc Ullamcorper Industries',
    country: 'Sweden',
    employees: 234,
    status: 'new',
  },
  {
    id: 3,
    name: 'Quynn Moore',
    phone: '1-362-643-1030',
    email: 'ipsum.primis@aol.couk',
    company: 'Venenatis Lacus LLC',
    country: 'Italy',
    employees: 32,
    status: 'new',
  },
  {
    id: 4,
    name: 'Hashim Huff',
    phone: '(202) 481-9204',
    email: 'pede.ultrices.a@icloud.couk',
    company: 'Maecenas Ornare Incorporated',
    country: 'China',
    employees: 1322,
    status: 'active',
  },
  {
    id: 5,
    name: 'Fuller Mcleod',
    phone: '1-186-271-2202',
    email: 'auctor.velit@hotmail.com',
    company: 'Hendrerit Consectetuer Associates',
    country: 'Peru',
    employees: 4,
    status: 'active',
  },
]

const initialState = {
  hiddenColumns: ['phone', 'employees'],
}

const StatusCell: DataGridCell<ExampleData> = (cell) => {
  return (
    <Tag colorScheme={cell.value === 'new' ? 'orange' : 'green'} size="sm">
      {cell.value}
    </Tag>
  )
}

export const WithDataGrid = () => {
  const gridRef = React.useRef<TableInstance<ExampleData>>(null)

  const filters = React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        icon: <FiCircle />,
        items: [
          {
            id: 'new',
            label: 'New',
            icon: <StatusBadge bg="blue.400" />,
          },
          {
            id: 'active',
            label: 'Active',
            icon: <StatusBadge bg="green.400" />,
          },
        ],
      },
      {
        id: 'isLead',
        label: 'Is lead',
        type: 'boolean',
        icon: <FiUser />,
        value: true,
      },
    ],
    [],
  )

  const columns = React.useMemo<Column<ExampleData>[]>(() => {
    return [
      {
        accessor: 'name',
        Header: 'Name',
        width: '200px',
        filter: useDataGridFilter('string'),
      },
      {
        accessor: 'email',
        Header: 'Email',
        filter: useDataGridFilter('string'),
      },
      {
        accessor: 'company',
        Header: 'Company',
        filter: useDataGridFilter('string'),
      },
      {
        accessor: 'status',
        Header: 'Status',
        Cell: StatusCell,
        filter: useDataGridFilter('string'),
      },
      {
        accessor: 'employees',
        Header: 'Employees',
        isNumeric: true,
      },
    ]
  }, [])

  const onFilter = React.useCallback((filters: Filter[]) => {
    gridRef.current?.setAllFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          value: {
            value: filter.value,
            operator: filter.operator,
          },
        }
      }) as Filters<ExampleData>,
    )
  }, [])

  const defaultFilters = [{ id: 'status', operator: 'isNot', value: 'new' }]

  return (
    <FiltersProvider
      filters={filters}
      onChange={onFilter}
      defaultFilters={defaultFilters}
    >
      <Stack alignItems="flex-start" height="400px">
        <FiltersAddButton />
        <ActiveFiltersList />
        <DataGrid<ExampleData>
          ref={gridRef}
          columns={columns}
          data={data}
          noResults={NoFilteredResults}
          initialState={{
            hiddenColumns: ['isLead'],
            filters: defaultFilters.map(({ id, value, operator }) => ({
              id,
              value: {
                value,
                operator,
              },
            })),
          }}
        />
      </Stack>
    </FiltersProvider>
  )
}
