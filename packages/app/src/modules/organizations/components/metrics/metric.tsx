import {
  Box,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'

import { Sparklines } from '@saas-ui/pro'

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
    <HStack {...rest}>
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
        <Box flex="1">
          <Sparklines data={data} height="32px" strokeWidth="1" color={color} />
        </Box>
      )}
    </HStack>
  )
}
