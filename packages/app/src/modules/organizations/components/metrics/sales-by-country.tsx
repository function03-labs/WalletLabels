import { Card, DataTable, Column, DataTableCell } from '@saas-ui/react'
import { Sparklines } from '@saas-ui/charts'

// @todo get this from graphql
interface Data {
  id: string
  country: string
  sales: number
  revenue: string
  metrics: number[]
}

const data: Data[] = [
  {
    id: 'us',
    country: 'US',
    sales: 454433,
    revenue: '€244543,-',
    metrics: [10, 20, 15, 22, 30, 40, 26],
  },
  {
    id: 'nl',
    country: 'Netherlands',
    sales: 3232,
    revenue: '€54432,-',
    metrics: [10, 20, 15, 22, 30, 40, 26],
  },
  {
    id: 'Germany',
    country: 'Germany',
    sales: 2343,
    revenue: '€34842,-',
    metrics: [10, 20, 15, 22, 30, 40, 26],
  },
]

const MetricsCell: typeof DataTableCell = ({ value }) => {
  return <Sparklines data={value} height="20px" width="100px" color="primary" />
}

const columns: Column<Data>[] = [
  {
    id: 'country',
    Header: 'Country',
  },
  {
    id: 'sales',
    Header: 'Sales',
    isNumeric: true,
  },
  {
    id: 'revenue',
    Header: 'Revenue',
    isNumeric: true,
  },
  {
    id: 'metrics',
    Header: '',
    width: '5%',
    Cell: MetricsCell,
  },
]

export const SalesByCountry = () => {
  return (
    <Card title="Sales by country">
      <DataTable<Data> columns={columns} data={data} />
    </Card>
  )
}
