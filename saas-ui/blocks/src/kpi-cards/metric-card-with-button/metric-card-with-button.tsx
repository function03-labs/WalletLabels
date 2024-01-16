import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Stat,
  StatDownArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatUpArrow,
} from '@chakra-ui/react'
import { IconBadge } from '@saas-ui/react'
import { is } from 'date-fns/locale'
import * as React from 'react'
import {
  FiBarChart,
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiDollarSign,
  FiUser,
} from 'react-icons/fi'

export interface MetricCardWithButtonProps {
  children: React.ReactNode
}

const metrics = [
  {
    label: 'New Users',
    value: '1,294',
    difference: '12.4%',
    isPositive: true,
    icon: FiUser,
  },
  {
    label: 'Sales',
    value: '$ 1,294',
    difference: '12.4%',
    isPositive: false,
    icon: FiDollarSign,
  },
  {
    label: 'Traffic',
    value: '1,294',
    difference: '12.4%',
    isPositive: true,
    icon: FiBarChart,
  },
]

export const MetricCardWithButton: React.FC<MetricCardWithButtonProps> = () => {
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
        <Stat>
          <StatLabel color="muted">{label}</StatLabel>
          <StatNumber>{value}</StatNumber>
          <StatHelpText color="muted">
            {isPositive ? (
              <Flex alignItems="center" gap="1">
                <Icon as={FiChevronUp} color="green.500" />{' '}
                <Box as="span" color="green.500" fontWeight="medium">
                  {difference}
                </Box>
                more than last week
              </Flex>
            ) : (
              <Flex alignItems="center" gap="1">
                <Icon as={FiChevronDown} color="red.500" />{' '}
                <Box as="span" color="red.500" fontWeight="medium">
                  {difference}
                </Box>
                less than last week
              </Flex>
            )}
          </StatHelpText>
          <IconBadge
            position="absolute"
            top="0"
            right="0"
            size="lg"
            variant="solid"
            bg="gray.200"
            color="inherit"
            _dark={{
              bg: 'whiteAlpha.300',
            }}
          >
            <Icon as={icon} />
          </IconBadge>
        </Stat>
      </CardBody>
      <Button
        rightIcon={<FiChevronRight />}
        borderTopRadius="0"
        justifyContent="space-between"
        fontWeight="medium"
        h="10"
        px="4"
        bg="gray.50"
        _hover={{ bg: 'gray.100' }}
        _dark={{
          bg: 'whiteAlpha.50',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        }}
      >
        View reports
      </Button>
    </Card>
  )
}
