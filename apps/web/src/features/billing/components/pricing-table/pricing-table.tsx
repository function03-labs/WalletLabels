import * as React from 'react'

import {
  Button,
  Box,
  Heading,
  HStack,
  Icon,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tooltip,
  StackProps,
  Tag,
} from '@chakra-ui/react'

import { FiCheck } from 'react-icons/fi'

import { SegmentedControl } from '@ui/lib'

const defaultPeriods = [
  {
    id: 'monthly',
    label: 'Pay monthly',
  },
  {
    id: 'yearly',
    label: 'Pay yearly',
  },
]

export interface PricingPlan {
  id: string
  name: string
  description?: string
  period: string
  price: string
  priceLabel?: string
  features: {
    [key: string]: string | number | boolean
  }
  [key: string]: any
}

export interface PricingFeature {
  id: string
  label: string
  description?: string
}

export interface PricingPeriod {
  id: string
  label: string
}

export interface PricingTableProps {
  currentPlan?: string | null
  plans: PricingPlan[]
  features: PricingFeature[]
  onUpgrade?(plan: PricingPlan): void
  defaultPeriod?: string
  periods?: PricingPeriod[]
}

export const PricingTable: React.FC<PricingTableProps> = (props) => {
  const {
    currentPlan: planId,
    plans: allPlans,
    features,
    onUpgrade,
    defaultPeriod = 'monthly',
    periods = defaultPeriods,
    ...rest
  } = props
  const [period, setPeriod] = React.useState('monthly')

  const plans = React.useMemo(() => {
    return allPlans.filter((plan) => plan.period === period)
  }, [period])

  const currentPlan = allPlans.find((plan) => plan.id === planId)

  return (
    <Box {...rest}>
      <Table variant="unstyled" sx={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr>
            <Td rowSpan={2} verticalAlign="bottom">
              {periods?.length > 1 && (
                <PricingTablePeriod
                  periods={periods}
                  period={period}
                  onChange={(id) => setPeriod(id)}
                  pb="10"
                />
              )}
            </Td>
            {plans.map((plan) => {
              return (
                <Th key={plan.id} textTransform="none">
                  <Stack>
                    <Heading size="md">
                      {plan.name}{' '}
                      {plan.discount && <Tag size="sm">-{plan.discount}</Tag>}
                    </Heading>

                    {plan.description && (
                      <Text color="muted" fontWeight="normal">
                        {plan.description}
                      </Text>
                    )}
                  </Stack>
                </Th>
              )
            })}
          </Tr>
          <Tr borderBottomWidth="1px">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlan?.id
              const isDowngrade =
                currentPlan &&
                allPlans.indexOf(plan) < allPlans.indexOf(currentPlan)

              return (
                <Th key={plan.id} textTransform="none" fontWeight="normal">
                  <Stack pb="10" spacing="4">
                    <HStack>
                      <Heading size="lg">{plan.price}</Heading>
                      <Text color="muted">{plan.priceLabel}</Text>
                    </HStack>

                    {isCurrent ? (
                      <Button isDisabled>Current plan</Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => onUpgrade?.(plan)}
                      >
                        {isDowngrade ? 'Downgrade' : 'Upgrade'}
                      </Button>
                    )}
                  </Stack>
                </Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
          {features.map((feature) => {
            return (
              <Tr key={feature.id}>
                <Td borderBottomWidth="1px">
                  {feature.description ? (
                    <Tooltip label={feature.description} placement="auto-end">
                      <Box
                        as="span"
                        textDecoration="underline dotted rgb(100, 100, 100)"
                        cursor="default"
                      >
                        {feature.label}
                      </Box>
                    </Tooltip>
                  ) : (
                    feature.label
                  )}
                </Td>

                {plans.map((plan) => {
                  return (
                    <Td key={plan.id} borderBottomWidth="1px">
                      <PricingTableFeature
                        feature={plan.features[feature.id]}
                      />
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

interface PricingTableFeature {
  feature: string | number | boolean
}

const PricingTableFeature: React.FC<PricingTableFeature> = ({ feature }) => {
  return (
    <HStack>
      {feature && <Icon as={FiCheck} color="primary.500" />}
      {typeof feature !== 'boolean' && <Text color="muted">{feature}</Text>}
    </HStack>
  )
}

interface PricingTablePeriodProps extends Omit<StackProps, 'onChange'> {
  periods: PricingPeriod[]
  period: string
  onChange(id: string): void
}

const PricingTablePeriod: React.FC<PricingTablePeriodProps> = (props) => {
  const { periods, period, onChange, ...rest } = props
  return (
    <Stack {...rest} alignItems="flex-start">
      <Text>Billing period</Text>
      <SegmentedControl segments={periods} onChange={onChange} value={period} />
    </Stack>
  )
}
