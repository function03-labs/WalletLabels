import * as React from 'react'
import { Box, Flex, SimpleGrid, Text, Button } from '@chakra-ui/react'
import { CalendarDay, useMonth } from '@datepicker-react/hooks'
import { useDatePickerContext } from '../date-picker-provider'
import { useStyles } from '../styles.provider'

import { Day } from './day'

export interface MonthProps {
  year: number
  month: number
}

export const Month = ({ year, month }: MonthProps) => {
  const styles = useStyles()

  const {
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
    setAction,
  } = useDatePickerContext()

  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
  })

  return (
    <Box sx={styles.month}>
      <Flex sx={styles.monthLabel}>
        <Button onClick={() => setAction('years')} variant="ghost">
          {monthLabel}
        </Button>
      </Flex>
      <SimpleGrid columns={7}>
        {weekdayLabels.map((weekdayLabel: string) => (
          <Flex key={weekdayLabel} sx={styles.weekdayLabel}>
            <Text>{weekdayLabel}</Text>
          </Flex>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={7}>
        {days.map((day: CalendarDay, index: number) =>
          typeof day === 'object' ? (
            <Day
              date={day.date}
              key={`${day.dayLabel}-${index}`}
              day={day.dayLabel}
            />
          ) : (
            <div key={index} />
          ),
        )}
      </SimpleGrid>
    </Box>
  )
}
