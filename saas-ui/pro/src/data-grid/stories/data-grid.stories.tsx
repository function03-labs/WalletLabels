import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Container, Stack, Button } from '@chakra-ui/react'

import { SortingRule } from 'react-table'

import { DataGridPagination } from '../data-grid-pagination'
import {
  DataGrid,
  DataGridProps,
  TableInstance,
  Column,
  Row,
  DataGridSortProps,
} from '../data-grid'
import { ActiveFilter } from '../../filters'
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

const columns: Column<ExampleData>[] = [
  {
    accessor: 'name',
    Header: 'Name',
  },
  {
    accessor: 'phone',
    Header: 'Phone',
  },
  {
    accessor: 'email',
    Header: 'Email',
  },
  {
    accessor: 'company',
    Header: 'Company',
  },
  {
    accessor: 'country',
    Header: 'Country',
  },
  {
    accessor: 'employees',
    Header: 'Employees',
    isNumeric: true,
  },
  {
    accessor: 'status',
    Header: 'Status',
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
  hiddenColumns: ['phone', 'employees'],
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
    selectedRowIds: { 1: true },
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
    hiddenColumns: ['phone'],
  },
}

export const WithLink = Template.bind({})
WithLink.args = {
  columns: Object.assign(columns).map((column: Column) => {
    if (column.accessor === 'name') {
      return Object.assign({}, column, {
        href: (row: Row) => `#${row.id}`,
      })
    }
    return column
  }),
  data,
  isHoverable: true,
  initialState: {
    hiddenColumns: ['phone'],
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
        ref={ref}
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
    <Template data={data} columns={columns} initialState={{ pageSize: 1 }}>
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
      autoResetPage={false}
      initialState={{
        pageSize: 1,
      }}
    >
      <DataGridPagination onChange={({ pageIndex }) => setPage(pageIndex)} />
    </Template>
  )
}

export const WithRemoteSort = () => {
  const [sort, setSort] = React.useState<SortingRule<ExampleData>[]>([])

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
      manualSortBy
      disableMultiSort
      onSortChange={(sort) => {
        setSort(sort)
      }}
    ></Template>
  )
}

export const WithFilteredData = () => {
  const ref = React.useRef<TableInstance<ExampleData>>(null)

  const filters = React.useMemo(() => {
    return [
      {
        id: 'status',
        value: 'new',
      },
    ]
  }, [])

  const [status, setStatus] = React.useState('new')

  React.useEffect(() => {
    ref.current?.setFilter('status', status)
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
        ref={ref}
        columns={columns}
        data={data}
        isSelectable
        isSortable
        initialState={{
          pageSize: 20,
          filters,
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
        ref={ref}
        columns={columns}
        data={filteredData}
        isSelectable
        isSortable
        initialState={{
          pageSize: 20,
        }}
      />
    </>
  )
}
