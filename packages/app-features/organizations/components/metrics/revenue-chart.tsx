import * as React from 'react'

import { LineChart } from '@saas-ui/charts'

import { format } from 'date-fns'

import { useIntl } from 'react-intl'
import { MetricData } from '@api/client'

export const RevenueChart = ({ data = [] }: { data: MetricData[] }) => {
  const intl = useIntl()

  const parsedData = React.useMemo(
    () =>
      data?.map(({ timestamp, value }) => {
        return {
          xv: format(timestamp, 'd/L'),
          x: timestamp,
          y: value,
          yv: intl.formatNumber(value, {
            currency: 'EUR',
            style: 'currency',
          }),
        }
      }),
    [data],
  )

  return (
    <LineChart
      data={parsedData}
      name="Revenue"
      strokeWidth="2"
      variant="gradient"
      gradientOpacity={0.2}
      tickFormatter={(value: number) =>
        intl.formatNumber(value, {
          currency: 'EUR',
          style: 'currency',
          maximumFractionDigits: 0,
        })
      }
      height="300px"
    />
  )
}
