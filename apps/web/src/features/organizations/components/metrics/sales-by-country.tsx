import { DataGrid, ColumnDef, DataGridCell } from '@saas-ui-pro/react'
import { HStack, Progress, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { MetricsCard } from './metrics-card'

interface Data {
  id: string
  country: string
  sales: number
  total: number
}

const total = 43400

const getPercentage = (value: number) => {
  return Math.round((100 / total) * value)
}

const SalesCell: DataGridCell<Data> = (cell) => {
  return (
    <HStack justifyContent="space-between">
      <Progress
        value={getPercentage(cell.row.getValue('total'))}
        size="xs"
        colorScheme="primary"
        width="60px"
      />
      <Text>{cell.getValue<string>()}</Text>
    </HStack>
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
    id: 'sales',
    header: 'Sales',
    cell: SalesCell,
    meta: {
      isNumeric: true,
    },
    size: 100,
  },
  {
    id: 'total',
    header: 'Total',
    cell: CurrencyCell,
    meta: {
      isNumeric: true,
    },
    size: 80,
  },
]

export const SalesByCountry = ({ data }: any) => {
  return (
    <MetricsCard title="By country" noPadding>
      <DataGrid<Data> columns={columns} data={data} isSortable />
    </MetricsCard>
  )
}
