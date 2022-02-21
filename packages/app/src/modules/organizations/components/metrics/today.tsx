import { Card, CardBody } from '@saas-ui/react'

import { Metric } from './metric'

export const Today = () => {
  return (
    <Card title="Today">
      <CardBody>
        <Metric
          label="Revenue"
          value="€43.400"
          change={23}
          data={[10, 3, 7, 14, 6, 9, 12]}
          color="primary"
        />
      </CardBody>
      <CardBody borderTopWidth="1px">
        <Metric
          label="New customers"
          value="130"
          change={29}
          data={[20, 14, 10, 18, 24, 10, 16]}
          color="primary"
        />
      </CardBody>
      <CardBody borderTopWidth="1px">
        <Metric
          label="Active users"
          value="5304"
          change={-20}
          data={[11, 5, 8, 15, 20, 25, 20]}
          color="primary"
        />
      </CardBody>
    </Card>
  )
}
