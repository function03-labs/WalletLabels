import * as React from 'react'
import { Meta } from '@storybook/react'

import {
  ButtonGroup,
  Container,
  Stack,
  Button,
  Box,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'

import { rand, randUser } from '@ngneat/falso'

import { DataGridPagination } from './data-grid-pagination'
import {
  DataGrid,
  DataGridProps,
  TableInstance,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  DataGridCell,
  DataGridCheckbox,
  PaginationState,
} from '../data-grid'

import {
  AppShell,
  ChevronDownIcon,
  ChevronUpIcon,
  OverflowMenu,
} from '@saas-ui/react'

import {
  RiAddFill,
  RiArrowDownFill,
  RiArrowUpFill,
  RiSubtractFill,
} from 'react-icons/ri'

export default {
  title: 'Components/Data Display/DataGrid',
  component: DataGrid,
  decorators: [
    (Story: any) => (
      <Container mb="40px" maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: React.FC<DataGridProps<ExampleData>> = ({
  data,
  columns,
  initialState,
  ...args
}) => (
  <DataGrid<ExampleData>
    data={data}
    columns={columns}
    initialState={initialState}
    {...args}
  />
)

const statuses = {
  new: {
    label: 'New',
  },
  active: {
    label: 'Active',
  },
  inactive: {
    label: 'Inactive',
  },
}

const StatusCell: DataGridCell<ExampleData> = (cell) => {
  const status = statuses[cell.getValue<keyof typeof statuses>()]
  return <Box>{status.label}</Box>
}

const ActionCell: DataGridCell<ExampleData> = () => {
  return (
    <Stack onClick={(e) => e.stopPropagation()} alignItems="flex-end">
      <OverflowMenu size="xs">
        <MenuItem>Delete</MenuItem>
      </OverflowMenu>
    </Stack>
  )
}

const columns: ColumnDef<ExampleData>[] = [
  {
    accessorKey: 'firstName',
    header: 'Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'address.country',
    header: 'Country',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: StatusCell,
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ActionCell,
    size: 10,
    enableSorting: false,
  },
]

const makeData = (length = 1000) => {
  return randUser({
    length,
  }).map((user) => {
    return {
      ...user,
      phone: user.phone.split(',')[0],
      status: rand(['new', 'active', 'inactive']),
    }
  })
}

const data = makeData()

type ExampleData = {
  status: string
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  img: string
  address: {
    street: string
    city: string
    zipCode: string
    country?: string
  }
  phone: string
}
const initialState = {
  columnVisibility: { phone: false, employees: false },
}

export const Basic = {
  render: Template,
  args: {
    columns,
    data,
    initialState,
  },
}

export const Sortable = {
  render: Template,
  args: {
    columns,
    data,
    initialState,
    isSortable: true,
  },
}

export const Selectable = {
  render: Template,
  args: {
    columns,
    data,
    initialState,
    isSelectable: true,
  },
}

export const ColorScheme = {
  render: Template,
  args: {
    columns,
    data,
    initialState,
    isSelectable: true,
    colorScheme: 'cyan',
  },
}

export const InitialSelected = {
  render: Template,
  args: {
    columns,
    data,
    initialState: {
      ...initialState,
      rowSelection: { 1: true },
    },
    isSelectable: true,
  },
}

export const SelectedChange = {
  render: Template,
  args: {
    columns,
    data,
    initialState,
    isSelectable: true,
    onSelectedRowsChange: (rows: string[]) => console.log(rows),
  },
}

export const SelectableAndSortable = {
  render: Template,
  args: {
    columns,
    data,
    initialState,
    isSortable: true,
    isSelectable: true,
  },
}

export const Numeric = {
  render: Template,
  args: {
    columns,
    data,
    initialState: {
      columnVisibility: { phone: false },
    },
  },
}

const withLinks = (columns.concat() as any).map((column: any) => {
  if (column.accessorKey === 'username') {
    return Object.assign({}, column, {
      meta: {
        href: (row: any) => {
          return `/customers/${row.id}`
        },
        ...column.meta,
      },
    })
  }
  return column
})

export const WithLink = {
  render: Template,
  args: {
    columns: withLinks,
    data,
    initialState,
  },
}

export const TableInstanceRef = () => {
  const ref = React.useRef<TableInstance<ExampleData>>(null)

  return (
    <>
      <Stack direction="row" mb="8">
        <Button onClick={() => ref.current?.toggleAllRowsSelected()}>
          Toggle select all
        </Button>
      </Stack>
      <DataGrid<ExampleData>
        instanceRef={ref}
        columns={columns}
        data={data}
        isSelectable
        isSortable
      />
    </>
  )
}

export const WithPagination = {
  render: () => {
    return (
      <Template
        data={data}
        columns={columns}
        initialState={{ pagination: { pageSize: 1 } }}
      >
        <DataGridPagination />
      </Template>
    )
  },
}

export const WithRemotePagination = {
  render: () => {
    const [page, setPage] = React.useState(0)

    const paginatedData = React.useMemo(() => {
      return data.slice(page, page + 100)
    }, [page])

    return (
      <Template
        data={paginatedData}
        columns={columns}
        pageCount={data.length}
        initialState={{
          pagination: {
            pageSize: 100,
          },
        }}
      >
        <DataGridPagination onChange={({ pageIndex }) => setPage(pageIndex)} />
      </Template>
    )
  },
}

export const WithControlledPagination = {
  render: () => {
    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })

    return (
      <Template
        data={data}
        columns={columns}
        onPaginationChange={setPagination}
        initialState={{
          pagination,
        }}
        state={{
          pagination,
        }}
      >
        <DataGridPagination />
      </Template>
    )
  },
}

export const WithRemoteSort = {
  render: () => {
    const [sort, setSort] = React.useState<SortingState>([])

    const sortedData = React.useMemo(() => {
      const key = sort[0]?.id
      const desc = sort[0]?.desc

      return data.concat().sort((a: any, b: any) => {
        if (key && a[key] > b[key]) {
          return desc ? -1 : 1
        }

        if (key && a[key] < b[key]) {
          return desc ? 1 : -1
        }

        return 0
      })
    }, [sort])

    return (
      <Template
        data={sortedData}
        columns={columns}
        isSortable
        state={{
          sorting: sort,
        }}
        enableMultiSort={false}
        onSortingChange={setSort}
      />
    )
  },
}

export const WithFilteredData = {
  render: () => {
    const ref = React.useRef<TableInstance<ExampleData>>(null)

    const filters = React.useMemo<ColumnFiltersState>(() => {
      return [
        {
          id: 'status',
          value: 'new',
        },
      ]
    }, [])

    const [status, setStatus] = React.useState('new')

    React.useEffect(() => {
      ref.current?.setColumnFilters(() => {
        return [
          {
            id: 'status',
            value: status,
          },
        ]
      })
    }, [status])

    return (
      <>
        <ButtonGroup isAttached mb="8">
          <Button isActive={status === 'new'} onClick={() => setStatus('new')}>
            New
          </Button>
          <Button
            isActive={status === 'active'}
            onClick={() => setStatus('active')}
          >
            Active
          </Button>
          <Button
            isActive={status === 'deleted'}
            onClick={() => setStatus('deleted')}
          >
            Deleted
          </Button>
        </ButtonGroup>
        <DataGrid<ExampleData>
          instanceRef={ref}
          columns={columns}
          data={data}
          isSelectable
          isSortable
          initialState={{
            pagination: {
              pageSize: 20,
            },
            columnFilters: filters,
          }}
        />
      </>
    )
  },
}

export const WithRemoteFilters = {
  render: () => {
    const ref = React.useRef<TableInstance<ExampleData>>(null)

    const [status, setStatus] = React.useState('new')

    const filteredData = React.useMemo(() => {
      return data.filter((row) => {
        return row.status === status
      })
    }, [status])

    return (
      <>
        <ButtonGroup isAttached mb="8">
          <Button isActive={status === 'new'} onClick={() => setStatus('new')}>
            New
          </Button>
          <Button
            isActive={status === 'active'}
            onClick={() => setStatus('active')}
          >
            Active
          </Button>
          <Button
            isActive={status === 'deleted'}
            onClick={() => setStatus('deleted')}
          >
            Deleted
          </Button>
        </ButtonGroup>
        <DataGrid<ExampleData>
          instanceRef={ref}
          columns={columns}
          data={filteredData}
          isSelectable
          isSortable
          initialState={{
            pagination: {
              pageSize: 20,
            },
          }}
        />
      </>
    )
  },
}

export const WithStickyHeaders = {
  render: () => {
    return (
      <AppShell height="400px" top="0">
        <DataGrid<ExampleData>
          sx={{
            '& thead tr': {
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bg: 'app-background',
              boxShadow: 'sm',
            },
          }}
          columns={columns}
          data={data}
          isSelectable
          isSortable
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
        />
      </AppShell>
    )
  },
}

const columnsWithSelection: ColumnDef<ExampleData>[] = [
  {
    id: 'selection',
    cell: ({ row }) =>
      row.getCanSelect() ? (
        <DataGridCheckbox
          isChecked={row.getIsSelected()}
          isIndeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label={row.getIsSelected() ? 'Deselect row' : 'Select row'}
        />
      ) : null,
  },
  ...columns,
]

export const WithCustomCheckbox = {
  render: () => {
    return (
      <DataGrid<ExampleData>
        columns={columnsWithSelection}
        data={data}
        isSelectable
        isSortable
        initialState={{
          pagination: {
            pageSize: 100,
          },
        }}
        enableRowSelection={(row) => {
          return row.original.status !== 'inactive'
        }}
      />
    )
  },
}

const withSubRows = data.map((row) => {
  return {
    ...row,
    subRows: [
      {
        ...row,
        id: `${row.id}-1`,
      },
      {
        ...row,
        id: `${row.id}-2`,
      },
    ],
  }
})

export const WithSubRows = {
  render: () => {
    return (
      <DataGrid<ExampleData>
        columns={columns}
        data={withSubRows}
        isSortable
        isExpandable
        initialState={{
          pagination: {
            pageSize: 100,
          },
          expanded: {
            0: true,
          },
        }}
      />
    )
  },
}

const withDeepSubRows = data.map((row, i) => {
  return {
    ...row,
    subRows: [
      {
        ...data[i + 1],
        id: `${row.id}-1`,
        subRows: [
          {
            ...data[i + 2],
            id: `${row.id}-1-1`,
            subRows: [
              {
                ...data[i + 3],
                id: `${row.id}-1-1-1`,
              },
            ],
          },
        ],
      },
    ],
  }
})

export const WithDeepSubRows = {
  render: () => {
    return (
      <DataGrid<ExampleData>
        tableLayout="auto"
        columns={columns}
        data={withDeepSubRows}
        isSortable
        isExpandable
        initialState={{
          pagination: {
            pageSize: 100,
          },
          columnVisibility: {
            phone: false,
          },
        }}
      />
    )
  },
}

const columnsWithExpander: ColumnDef<ExampleData>[] = [
  {
    id: 'expand',
    header: '',
    size: 1,
    enableSorting: false,
    meta: {
      cellProps: {
        px: 2,
        textOverflow: 'initial',
      },
    },
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <IconButton
          size="xs"
          isRound
          variant="ghost"
          fontSize="1.2em"
          aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          icon={row.getIsExpanded() ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={row.getToggleExpandedHandler()}
        />
      ) : null
    },
  },
  ...columns,
]

export const WithCustomExpander = {
  render: () => {
    return (
      <DataGrid<ExampleData>
        columns={columnsWithExpander}
        data={withSubRows}
        isSortable
        initialState={{
          pagination: {
            pageSize: 100,
          },
          expanded: {
            0: true,
          },
        }}
      />
    )
  },
}

export const WithCustomIcons = {
  render: () => {
    return (
      <DataGrid<ExampleData>
        columns={columns}
        data={withSubRows}
        isSortable
        isExpandable
        icons={{
          sortAscending: <RiArrowUpFill />,
          sortDescending: <RiArrowDownFill />,
          rowExpanded: <RiSubtractFill />,
          rowCollapsed: <RiAddFill />,
        }}
      />
    )
  },
}
