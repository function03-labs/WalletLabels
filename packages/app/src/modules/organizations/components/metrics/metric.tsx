import {
  Box,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'

import { Sparklines } from '@saas-ui/charts'

export interface MetricProps {
  label: string
  value: string
  change?: number
  data?: number[]
  color?: string
}

export const Metric = (props: MetricProps) => {
  const { label, value, change, data, color, ...rest } = props
  return (
    <HStack {...rest} position="relative">
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        {typeof change !== 'undefined' && (
          <StatHelpText margin="0">
            <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
            {change}%
          </StatHelpText>
        )}
      </Stat>
      {data && (
        <Box position="absolute" right="0" bottom="0">
          <Sparklines data={data} height="32px" strokeWidth={2} color={color} />
        </Box>
      )}
    </HStack>
  )
}
