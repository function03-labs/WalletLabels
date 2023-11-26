import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  StackProps,
} from '@chakra-ui/react'
import { DeltaBadge } from '@ui/lib'

export interface MetricProps extends StackProps {
  /**
   * The metric label
   */
  label: string
  /**
   * The metric value
   */
  value: string
  /**
   * Previous range value
   */
  previousValue: string
  /**
   * Change from previous value
   */
  change?: number
  /**
   * Show increase as positive or negative
   * @default true
   */
  isIncreasePositive?: boolean
}

export const Metric = (props: MetricProps) => {
  const {
    label,
    value,
    previousValue,
    change = 0,
    isIncreasePositive,
    ...rest
  } = props

  const deltaType =
    change === 0 ? 'neutral' : change > 0 ? 'increase' : 'decrease'

  return (
    <Stack {...rest} position="relative" px="4" py="4" width="full">
      <Stat>
        <StatLabel color="muted">{label}</StatLabel>
        <StatNumber>
          {value}{' '}
          {change && (
            <DeltaBadge
              deltaType={deltaType}
              isIncreasePositive={isIncreasePositive}
            >
              {change}%
            </DeltaBadge>
          )}
        </StatNumber>
        {typeof previousValue !== 'undefined' && (
          <StatHelpText margin="0" color="muted">
            vs. {previousValue} last period
          </StatHelpText>
        )}
      </Stat>
    </Stack>
  )
}
