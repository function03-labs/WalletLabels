import { SimpleGrid } from '@chakra-ui/react'
import { Card, CardBody } from '@saas-ui/react'

import { Metric } from './metric'

const data = [
  {
    label: 'Revenue',
    value: '€43.400',
    change: 23,
    data: [10, 3, 7, 14, 6, 9, 12],
  },
  {
    label: 'New customers',
    value: '130',
    change: 29,
    data: [20, 14, 10, 18, 24, 10, 16],
  },
  {
    label: 'Churned customers',
    value: '5',
    change: -10,
    data: [2, 1, 4, 8, 4, 1, 6],
  },
  {
    label: 'Active users',
    value: '1337',
    change: 103,
    data: [11, 5, 8, 15, 20, 25, 20],
  },
]

export const Today = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} gap="4">
      {data.map((metric) => (
        <Card key={metric.label}>
          <CardBody>
            <Metric {...metric} color="primary" />
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  )
}
