import { DataGrid, ColumnDef, DataGridCell } from '@saas-ui-pro/react'
import { HStack, Progress, Text, Image } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { MetricsCard } from './metrics-card'

interface Data {
  id: string
  chain: string // Ensure this matches the field in your data
  activeWallets: number
  labels: number
}

const getPercentage = (value: number, total: number) => {
  return Math.round((100 / total) * value)
}

const WalletsCell: DataGridCell<Data> = (cell) => {
  return (
    <HStack justifyContent="space-between" flex="1">
      <Progress
        value={getPercentage(
          cell.getValue<number>(),
          cell.row.getValue('labels'),
        )}
        size="xs"
        colorScheme="primary"
        width="60px"
      />
      <Text>{cell.getValue<number>()}</Text> // Adjusted to ensure number
      display
    </HStack>
  )
}

const LabelsCell: DataGridCell<Data> = ({ getValue }) => {
  const intl = useIntl()

  // Get the value and divide by 1,000,000 to convert to millions
  const valueInMillions = getValue<number>() / 1000000

  return (
    <>
      {intl.formatNumber(valueInMillions, {
        maximumFractionDigits: 2, // Adjust for desired decimal places
        minimumFractionDigits: 2, // Ensures consistency in decimal places
      })}
      {'M'}
    </>
  )
}

const ChainCell: DataGridCell<Data> = ({ row }) => {
  const chain = row.getValue('chain') // Correctly using 'chain' field
  const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${chain}.jpg`

  return (
    <HStack spacing="4">
      <Image boxSize="24px" rounded="full" src={iconUrl} alt={chain} />
      <Text>{chain}</Text>
    </HStack>
  )
}

const columns: ColumnDef<Data>[] = [
  {
    id: 'chain',
    header: 'Chain',
    cell: ChainCell,
  },
  {
    id: 'activeWallets',
    header: 'Active Wallets',
    cell: WalletsCell, // Renamed for clarity
    meta: {
      isNumeric: true,
    },
    size: 100,
  },
  {
    id: 'labels',
    header: 'Total Labels',
    cell: LabelsCell, // Renamed for clarity
    meta: {
      isNumeric: true,
    },
    size: 100,
  },
]

export const IndexedChains = ({ data = [] }: { data: Data[] }) => {
  return (
    <MetricsCard title="Indexed Chains" noPadding>
      <DataGrid<Data>
        columns={columns}
        data={data}
        isSortable
        stickyHeader={false}
      />
    </MetricsCard>
  )
}
