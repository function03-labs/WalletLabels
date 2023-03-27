import * as React from 'react'

import { LineChart, ChartData } from '@saas-ui/charts'

import { format, subDays, eachDayOfInterval } from 'date-fns'

import { useIntl, IntlShape } from 'react-intl'
import { MetricsCard } from './metrics-card'

// @todo move this to Graphql mock
const createData = ({
  date = new Date(),
  intl,
}: {
  date?: Date
  intl: IntlShape
}): ChartData[] => {
  const start = subDays(date, 14)

  const days = eachDayOfInterval({
    start,
    end: date,
  })

  let r = 20000

  return days.map((date) => {
    r = r += Math.random() * 1000

    return {
      xv: format(date, 'd/L'),
      x: date.getTime(),
      y: r,
      yv: intl.formatNumber(r, {
        currency: 'EUR',
        style: 'currency',
      }),
    }
  })
}

export const MRR = () => {
  const intl = useIntl()

  const data = React.useMemo(() => createData({ intl }), [])

  return (
    <MetricsCard title="Monthly recurring revenue">
      <LineChart
        data={data}
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
        height="290px"
      />
    </MetricsCard>
  )
}
