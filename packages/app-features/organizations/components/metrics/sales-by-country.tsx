import { Card } from '@saas-ui/react'
import { DataGrid, ColumnDef, DataGridCell } from '@saas-ui/pro'
import { Sparklines } from '@saas-ui/charts'
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

const ProgressCell: DataGridCell<Data> = (cell) => {
  return (
    <Progress
      value={getPercentage(cell.row.getValue('revenue'))}
      size="sm"
      colorScheme="primary"
    />
  )
}

const CurrencyCell: DataGridCell<Data> = ({ getValue }) => {
  const intl = useIntl()

  return (
    <>
      {intl.formatNumber(getValue<number>(), {
        currency: 'EUR',
        style: 'currency',
        maximumFractionDigits: 0,
      })}
    </>
  )
}

const columns: ColumnDef<Data>[] = [
  {
    id: 'country',
    header: 'Country',
  },
  {
    id: 'bar',
    header: '',
    cell: ProgressCell,
  },
  {
    id: 'customers',
    header: 'Customers',
    meta: {
      isNumeric: true,
    },
  },
  {
    id: 'revenue',
    header: 'Revenue',
    cell: CurrencyCell,
    meta: {
      isNumeric: true,
    },
  },
]

export const SalesByCountry = () => {
  return (
    <Card title="By country" overflowX="auto">
      <DataGrid<Data> columns={columns} data={data} isSortable />
    </Card>
  )
}
