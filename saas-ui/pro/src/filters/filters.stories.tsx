import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  Button,
  Badge,
  BadgeProps,
  Stack,
  Box,
  Text,
  Tag,
} from '@chakra-ui/react'

import { FiCircle, FiUser } from 'react-icons/fi'

import { FiltersProvider, FiltersProviderProps } from './provider'
import { FiltersAddButton } from './filters'
import { ActiveFiltersList } from './active-filter'
import {
  DataGrid,
  DataGridCell,
  TableInstance,
  ColumnFiltersState,
  useColumns,
} from '../data-grid'
import { useDataGridFilter } from './use-data-grid-filter'
import { NoFilteredResults } from './no-filtered-results'
import { Filter } from './use-active-filter'
import { FilterItem, FilterItems } from './filter-menu'

export default {
  title: 'Components/Filters/Filters',
  decorators: [(Story: any) => <Story />],
} as Meta

const Template: StoryFn<FiltersProviderProps> = (args) => {
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

const filters: FilterItem[] = [
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
    <Tag colorScheme={cell.getValue() === 'new' ? 'orange' : 'green'} size="sm">
      {cell.getValue<string>()}
    </Tag>
  )
}

export const WithDataGrid = () => {
  const gridRef = React.useRef<TableInstance<ExampleData>>(null)

  const filters = React.useMemo(
    () =>
      [
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
      ] as FilterItem[],
    [],
  )

  const columns = useColumns<ExampleData>(() => {
    return [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
        filterFn: useDataGridFilter('string'),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterFn: useDataGridFilter('string'),
      },
      {
        accessorKey: 'company',
        header: 'Company',
        filterFn: useDataGridFilter('string'),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: StatusCell,
        filterFn: useDataGridFilter('string'),
      },
      {
        accessorKey: 'employees',
        header: 'Employees',
        meta: {
          isNumeric: true,
        },
      },
    ]
  }, [])

  const onFilter = React.useCallback((filters: Filter[]) => {
    gridRef.current?.setColumnFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          value: {
            value: filter.value,
            operator: filter.operator,
          },
        }
      }) as ColumnFiltersState,
    )
  }, [])

  const defaultFilters: Filter[] = [
    { id: 'status', operator: 'isNot', value: 'new' },
  ]

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
          instanceRef={gridRef}
          columns={columns}
          data={data}
          noResults={NoFilteredResults}
          initialState={{
            columnVisibility: { isLead: false },
            columnFilters: defaultFilters.map(({ id, value, operator }) => ({
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
