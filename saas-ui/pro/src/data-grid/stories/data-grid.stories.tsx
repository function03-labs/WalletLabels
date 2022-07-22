import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Container, Stack, Button } from '@chakra-ui/react'

import { DataGridPagination } from '../data-grid-pagination'
import {
  DataGrid,
  DataGridProps,
  TableInstance,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '../data-grid'

import { ButtonGroup } from '@saas-ui/react'

export default {
  title: 'Components/Data Display/DataGrid',
  component: DataGrid,
  decorators: [
    (Story: any) => (
      <Container mt="40px" maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story<DataGridProps<ExampleData>> = ({
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

interface ExampleData {
  name: string
  phone: string
  email: string
  company: string
  country: string
  employees: number
  status: string
}

const columns: ColumnDef<ExampleData>[] = [
  {
    accessorKey: 'name',
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
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'employees',
    header: 'Employees',
    meta: { isNumeric: true },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

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
  columnVisibility: { phone: false, employees: false },
}

export const Default = Template.bind({})
Default.args = {
  columns,
  data,
  initialState,
}

export const Sortable = Template.bind({})
Sortable.args = {
  columns,
  data,
  initialState,
  isSortable: true,
}

export const Selectable = Template.bind({})
Selectable.args = {
  columns,
  data,
  initialState,
  isSelectable: true,
}

export const InitialSelected = Template.bind({})
InitialSelected.args = {
  columns,
  data,
  initialState: {
    ...initialState,
    rowSelection: { 1: true },
  },
  isSelectable: true,
}

export const SelectedChange = Template.bind({})
SelectedChange.args = {
  columns,
  data,
  initialState,
  isSelectable: true,
  onSelectedRowsChange: (rows: string[]) => console.log(rows),
}

export const SelectableAndSortable = Template.bind({})
SelectableAndSortable.args = {
  columns,
  data,
  initialState,
  isSortable: true,
  isSelectable: true,
}

export const Numeric = Template.bind({})
Numeric.args = {
  columns,
  data,
  initialState: {
    columnVisibility: { phone: false },
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

export const WithLink = Template.bind({})
WithLink.args = {
  columns: withLinks,
  data,
  initialState,
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

export const WithPagination = () => {
  return (
    <Template
      data={data}
      columns={columns}
      initialState={{ pagination: { pageSize: 1 } }}
    >
      <DataGridPagination />
    </Template>
  )
}

export const WithRemotePagination = () => {
  const [page, setPage] = React.useState(0)

  const paginatedData = React.useMemo(() => {
    return data.slice(page, page + 1)
  }, [page])

  return (
    <Template
      data={paginatedData}
      columns={columns}
      pageCount={data.length}
      initialState={{
        pagination: {
          pageSize: 1,
        },
      }}
    >
      <DataGridPagination onChange={({ pageIndex }) => setPage(pageIndex)} />
    </Template>
  )
}

export const WithRemoteSort = () => {
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
    ></Template>
  )
}

export const WithFilteredData = () => {
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
}

export const WithRemoteFilters = () => {
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
}
