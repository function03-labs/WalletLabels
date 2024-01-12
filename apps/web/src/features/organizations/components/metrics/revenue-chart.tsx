import * as React from 'react'

import { AreaChart } from '@saas-ui/charts'

import { format } from 'date-fns'

import { useIntl } from 'react-intl'
import { MetricData } from '@api/client'

export const RevenueChart = ({ data = [] }: { data: MetricData[] }) => {
  const intl = useIntl()

  const parsedData = React.useMemo(
    () =>
      data?.map(({ timestamp, value }) => {
        return {
          date: format(timestamp, 'd/L'),
          Revenue: value,
        }
      }),
    [data],
  )

  return (
    <AreaChart
      data={parsedData}
      categories={['Revenue']}
      strokeWidth="2"
      variant="gradient"
      valueFormatter={(value: number) =>
        intl.formatNumber(value, {
          currency: 'EUR',
          style: 'currency',
          maximumFractionDigits: 0,
        })
      }
      yAxisWidth={60}
      showLegend={false}
      height="300px"
    />
  )
}
