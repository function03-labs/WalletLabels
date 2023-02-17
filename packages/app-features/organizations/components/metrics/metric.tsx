import {
  Box,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
} from '@chakra-ui/react'

import { Sparklines } from '@saas-ui/charts'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

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
          <StatHelpText
            margin="0"
            display="flex"
            gap="1"
            alignItems="center"
            color="muted"
          >
            {change > 0 ? (
              <Icon as={FiTrendingUp} />
            ) : (
              <Icon as={FiTrendingDown} />
            )}
            {change}%
          </StatHelpText>
        )}
      </Stat>
      {data && (
        <Box position="absolute" right="0" bottom="0">
          <Sparklines
            data={data}
            height="32px"
            width="100px"
            strokeWidth={1}
            color={color}
            variant="gradient"
            gradientOpacity={0.2}
          />
        </Box>
      )}
    </HStack>
  )
}
