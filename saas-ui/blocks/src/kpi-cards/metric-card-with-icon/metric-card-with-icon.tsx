import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { IconBadge } from '@saas-ui/react'
import * as React from 'react'
import {
  LuChevronDown,
  LuChevronUp,
  LuMousePointerClick,
  LuUsers,
  LuWallet,
} from 'react-icons/lu'

const metrics = [
  {
    label: 'Active users',
    value: '676',
    difference: '12.4%',
    isPositive: true,
    icon: LuUsers,
  },
  {
    label: 'Revenue',
    value: '$ 29,294',
    difference: '21%',
    isPositive: false,
    icon: LuWallet,
  },
  {
    label: 'Avg. click rate',
    value: '14%',
    difference: '5%',
    isPositive: true,
    icon: LuMousePointerClick,
  },
]

export const MetricCardWithIcon = () => {
  return (
    <HStack p="8">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </HStack>
  )
}

export interface MetricCardProps {
  label: string
  value: string
  difference: string
  isPositive: boolean
  icon: React.ElementType
}

const MetricCard: React.FC<MetricCardProps> = (props) => {
  const { label, value, difference, isPositive, icon } = props
  return (
    <Card flex="1">
      <CardBody position="relative">
        <HStack spacing="3">
          <IconBadge size="xl">
            <Icon as={icon} />
          </IconBadge>
          <Stat>
            <StatLabel color="muted">{label}</StatLabel>
            <StatNumber display="inline-block" me="2">
              {value}
            </StatNumber>
            <StatHelpText color="muted" display="inline-block">
              {isPositive ? (
                <Flex alignItems="center">
                  <Icon as={LuChevronUp} color="green.500" />{' '}
                  <Box as="span" color="green.500" fontWeight="medium">
                    {difference}
                  </Box>
                </Flex>
              ) : (
                <Flex alignItems="center">
                  <Icon as={LuChevronDown} color="red.500" />{' '}
                  <Box as="span" color="red.500" fontWeight="medium">
                    {difference}
                  </Box>
                </Flex>
              )}
            </StatHelpText>
          </Stat>
        </HStack>
      </CardBody>
    </Card>
  )
}
