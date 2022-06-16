import { Card } from '@saas-ui/react'
import { DataGrid, Column } from '@saas-ui/pro'
import { Sparklines } from '@saas-ui/charts'
import { CellProps } from 'react-table'
import { Progress } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

// @todo get this from graphql
interface Data {
  id: string
  country: string
  customers: number
  revenue: number
}

const total = 43400

const getPercentage = (value: number) => {
  return Math.round((100 / total) * value)
}

const data: Data[] = [
  {
    id: 'us',
    country: 'US',
    customers: 70,
    revenue: 21700,
  },
  {
    id: 'ca',
    country: 'Canada',
    customers: 40,
    revenue: 13020,
  },
  {
    id: 'nl',
    country: 'Netherlands',
    customers: 15,
    revenue: 4990,
  },
  {
    id: 'Germany',
    country: 'Germany',
    customers: 5,
    revenue: 1500,
  },
]

const MetricsCell = ({ value }: CellProps<Data>) => {
  return <Sparklines data={value} height="20px" width="100px" color="primary" />
}

const ProgressCell = ({ row }: CellProps<Data>) => {
  return (
    <Progress
      value={getPercentage(row.values.revenue)}
      size="sm"
      colorScheme="primary"
    />
  )
}

const CurrencyCell = ({ value }: CellProps<Data>) => {
  const intl = useIntl()

  return intl.formatNumber(value, {
    currency: 'EUR',
    style: 'currency',
    maximumFractionDigits: 0,
  })
}

const columns: Column<Data>[] = [
  {
    id: 'country',
    Header: 'Country',
  },
  {
    id: 'bar',
    Header: '',
    Cell: ProgressCell,
  },
  {
    id: 'customers',
    Header: 'Customers',
    isNumeric: true,
  },
  {
    id: 'revenue',
    Header: 'Revenue',
    isNumeric: true,
    Cell: CurrencyCell,
  },
]

export const SalesByCountry = () => {
  return (
    <Card title="By country" overflowX="auto">
      <DataGrid<Data> columns={columns} data={data} isSortable />
    </Card>
  )
}
