import * as React from 'react'

import { Card, CardBody } from '@saas-ui/react'

import { LineChart, LineChartProps, ChartData } from '@saas-ui/charts'

import { format, subDays, eachDayOfInterval } from 'date-fns'

import { useIntl, IntlShape } from 'react-intl'

// @todo move this to Graphql mock
const createData = ({
  date = new Date(),
  intl,
}: {
  date?: Date
  intl: IntlShape
}): ChartData[] => {
  const start = subDays(date, 30)

  const days = eachDayOfInterval({
    start,
    end: date,
  })

  let r = 30000

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
    <Card title="Monthly recurring revenue">
      <CardBody>
        <LineChart
          data={data}
          name="Revenue"
          strokeWidth="2"
          tickFormatter={(value: number) =>
            intl.formatNumber(value, {
              currency: 'EUR',
              style: 'currency',
              maximumFractionDigits: 0,
            })
          }
          height="290px"
        />
      </CardBody>
    </Card>
  )
}
