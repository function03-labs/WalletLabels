import * as React from 'react'
import { StoryFn, StoryObj, Meta } from '@storybook/react'
import {
  Badge,
  BadgeProps,
  Stack,
  Box,
  Text,
  Tag,
  HStack,
} from '@chakra-ui/react'

import { FiShoppingBag, FiUser } from 'react-icons/fi'

import { FiltersProvider, FiltersProviderProps } from './provider'
import { FiltersAddButton } from './filters'
import { ActiveFiltersList, FilterRenderFn } from './active-filter'
import {
  DataGrid,
  DataGridCell,
  TableInstance,
  ColumnFiltersState,
  useColumns,
} from '../data-grid'
import { getDataGridFilter } from './use-data-grid-filter'
import { NoFilteredResults } from './no-filtered-results'
import { Filter } from './use-active-filter'
import { FilterItem } from './filter-menu'

const values: Record<string, FilterRenderFn> = {
  status: (context) => {
    if (Array.isArray(context.value) && Array.isArray(context.items)) {
      if (context.value?.length > 1 || context.value?.length === 0) {
        let icons
        if (context.items.length) {
          icons = (
            <HStack spacing="-2">
              {context.items
                .filter((item) => context.value?.includes(item.id) && item.icon)
                .map(({ icon, id }) =>
                  React.isValidElement(icon)
                    ? React.cloneElement(icon, {
                        key: id,
                        outline: '1px solid white',
                        _notFirst: { ms: '-4px' },
                      } as any)
                    : icon,
                )}
            </HStack>
          )
        }

        return (
          <HStack>
            {icons}
            <Text>{context.value.length} states</Text>
          </HStack>
        )
      }

      const item = context.items?.find((item) => item.id === context.value?.[0])
      return item ? (
        <HStack>
          {item.icon}
          <Text>{item.label}</Text>
        </HStack>
      ) : null
    }

    if (Array.isArray(context.items)) {
      const item = context.items.find((item) => item.id === context.value)
      return item ? <Text>{item.label}</Text> : null
    }
  },
  lead: () => {
    return 'lead'
  },
}

const renderLabel: FilterRenderFn = (context) => {
  if (context.id === 'type') {
    return 'Contact'
  }

  return context.label
}

const renderValue: FilterRenderFn = (context) => {
  return values[context.id]?.(context) || context.value?.toLocaleString()
}

const Template: StoryFn<FiltersProviderProps> = (args) => {
  return (
    <FiltersProvider {...args}>
      <Stack alignItems="flex-start">
        <Box px="3">
          <FiltersAddButton />
        </Box>

        <ActiveFiltersList
          px="3"
          py="2"
          borderBottomWidth="1px"
          zIndex="2"
          renderLabel={renderLabel}
          renderValue={renderValue}
        />
      </Stack>
    </FiltersProvider>
  )
}

export default {
  title: 'Components/Filters/Filters',
  decorators: [(Story) => <Story />],
  component: Template,
} as Meta

type Story = StoryObj<typeof Template>

const StatusBadge = (props: BadgeProps) => (
  <Badge
    boxSize="12px"
    padding="0"
    borderRadius="full"
    variant="outline"
    bg="transparent"
    borderWidth="2px"
    boxShadow="none"
    {...props}
  />
)

const filters: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    icon: <StatusBadge borderColor="currentColor" />,
    items: [
      {
        id: 'new',
        label: 'New',
        icon: <StatusBadge borderColor="blue.400" />,
      },
      {
        id: 'active',
        label: 'Active',
        icon: <StatusBadge borderColor="green.400" />,
      },
    ],
  },
  {
    id: 'type',
    label: 'Contact is lead',
    icon: <FiUser />,
    value: 'lead',
  },
]

const getItems = async (query: string) => {
  return new Promise<{ id: string; label: string; color: string }[]>(
    (resolve) => {
      setTimeout(() => {
        resolve(
          [
            {
              id: 'new',
              label: 'New',
              color: 'blue.400',
            },
            {
              id: 'active',
              label: 'Active',
              color: 'green.400',
            },
            {
              id: 'inactive',
              label: 'Inactive',
              color: 'gray.400',
            },
          ].filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      }, 1000)
    },
  )
}

const asyncFilters: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    icon: <StatusBadge borderColor="currentColor" />,
    items: async (query) => {
      const items = await getItems(query)
      return items.map((item) => ({
        id: item.id,
        label: item.label,
        icon: <StatusBadge borderColor={item.color} />,
      }))
    },
  },
  {
    id: 'type',
    label: 'Contact is lead',
    icon: <FiUser />,
    value: 'lead',
  },
  {
    id: 'type',
    label: 'Contact is customer',
    icon: <FiShoppingBag />,
    value: 'customer',
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

export const AsyncItems = Template.bind({})
AsyncItems.args = {
  filters: asyncFilters,
  onChange: (filters) => console.log(filters),
}

const multiFilters: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    icon: <StatusBadge borderColor="currentColor" />,
    type: 'enum',
    multiple: true,
    items: [
      {
        id: 'new',
        label: 'New',
        icon: <StatusBadge borderColor="blue.400" />,
      },
      {
        id: 'active',
        label: 'Active',
        icon: <StatusBadge borderColor="green.400" />,
      },
    ],
  },
  {
    id: 'type',
    label: 'Contact is lead',
    icon: <FiUser />,
    value: 'lead',
  },
  {
    id: 'type',
    label: 'Contact is customer',
    icon: <FiShoppingBag />,
    value: 'customer',
  },
]

export const MultiSelect: Story = {
  args: {
    filters: multiFilters,
    onChange: (filters) => console.log(filters),
  },
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
    type: 'lead',
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
    type: 'customer',
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
    type: 'customer',
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
    type: 'customer',
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
    type: 'customer',
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
    <Tag colorScheme={cell.getValue() === 'new' ? 'blue' : 'green'} size="sm">
      {cell.getValue<string>()}
    </Tag>
  )
}

export const WithDataGrid = () => {
  const gridRef = React.useRef<TableInstance<ExampleData>>(null)

  const filters = React.useMemo<FilterItem[]>(
    () => [
      {
        id: 'status',
        label: 'Status',
        type: 'enum',
        icon: <StatusBadge borderColor="currentColor" />,
        items: [
          {
            id: 'new',
            label: 'New',
            icon: <StatusBadge borderColor="blue.400" />,
          },
          {
            id: 'active',
            label: 'Active',
            icon: <StatusBadge borderColor="green.400" />,
          },
        ],
      },
      {
        id: 'type',
        label: 'Contact is lead',
        type: 'enum',
        operators: ['is', 'isNot'],
        icon: <FiUser />,
        value: 'lead',
      },
    ],
    [],
  )

  const columns = useColumns<ExampleData>(() => {
    return [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
        filterFn: getDataGridFilter('string'),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        filterFn: getDataGridFilter('string'),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterFn: getDataGridFilter('string'),
      },
      {
        accessorKey: 'company',
        header: 'Company',
        filterFn: getDataGridFilter('string'),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: StatusCell,
        filterFn: getDataGridFilter('string'),
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
        <ActiveFiltersList renderLabel={renderLabel} />
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

export const WithAsyncFilters = () => {
  const [items, setItems] = React.useState<FilterItem[]>(asyncFilters)
  const [query, setQuery] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const onChange = (value: string, key: string) => {
    setQuery(value)

    if (key) {
      // we handle this in async items of the filter
      return
    }

    // this simulates a fetch from the backend.
    setLoading(true)
    setTimeout(() => {
      setItems(
        filters.filter((filter) => {
          return filter.id.match(value)
        }),
      )
      setLoading(false)
    }, 1000)
  }

  return (
    <FiltersProvider filters={items}>
      <Stack alignItems="flex-start" width="400px">
        <Box px="3">
          <FiltersAddButton
            inputValue={query}
            onInputChange={onChange}
            buttonProps={{ isLoading }}
          />
        </Box>

        <ActiveFiltersList px="3" py="2" borderBottomWidth="1px" zIndex="2" />
      </Stack>
    </FiltersProvider>
  )
}
