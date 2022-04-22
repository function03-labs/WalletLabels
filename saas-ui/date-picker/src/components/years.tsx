import * as React from 'react'

import {
  chakra,
  forwardRef,
  Stack,
  Flex,
  Button,
  SimpleGrid,
  useStyles,
  Box,
} from '@chakra-ui/react'
import { dataAttr } from '@chakra-ui/utils'

import setYear from 'date-fns/setYear'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import isSameYear from 'date-fns/isSameYear'

import { useDatePickerContext } from '../date-picker-provider'

import { useMonth } from '@datepicker-react/hooks'

export const Years = forwardRef((props, ref) => {
  const {
    startDate,
    goToDate,
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
    setAction,
  } = useDatePickerContext()

  const styles = useStyles()

  const date = startDate || new Date()

  const { monthLabel } = useMonth({
    year: getYear(date),
    month: getMonth(date),
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
  })

  const years = []
  for (let i = 1900; i < 2100; i++) {
    years.push(i)
  }

  return (
    <Stack flexDirection="column" py="1">
      <Flex sx={styles.yearsLabel}>
        <Button onClick={() => setAction('calendar')} variant="ghost">
          {monthLabel}
        </Button>
      </Flex>
      <Box overflow="auto" maxH="254px">
        <SimpleGrid columns={4} gap="2" columnGap="5">
          {years.map((year) => (
            <Year key={year} date={date} year={year} />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  )
})

interface YearProps {
  date: Date
  year: number
}

const Year: React.FC<YearProps> = ({ date, year }) => {
  const { goToDate, onDateSelect, setAction } = useDatePickerContext()
  const styles = useStyles()

  const ref = React.useRef<HTMLButtonElement>(null)

  const isCurrent = isSameYear(date, setYear(new Date(), year))

  React.useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView({ block: 'center', inline: 'center' })
    }
  }, [isCurrent])

  const onClick = () => {
    // goToDate(setYear(date, year))
    onDateSelect(setYear(date, year))
    setAction('calendar')
  }

  return (
    <chakra.button
      ref={ref}
      key={year}
      onClick={onClick}
      data-active={dataAttr(isCurrent)}
      __css={styles.year}
    >
      {year}
    </chakra.button>
  )
}
