import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
} from '@chakra-ui/react'

export interface MetricsCard extends Omit<CardProps, 'title'> {
  title?: React.ReactNode
  noPadding?: boolean
}

export const MetricsCard: React.FC<MetricsCard> = (props) => {
  const { title, noPadding, children, ...rest } = props
  const bodyProps = noPadding ? { px: 0 } : {}
  return (
    <Card {...rest}>
      {title && (
        <CardHeader>
          <Heading as="h3" size="sm" fontWeight="medium">
            {title}
          </Heading>
        </CardHeader>
      )}
      <CardBody pt="0" {...bodyProps}>
        {children}
      </CardBody>
    </Card>
  )
}
