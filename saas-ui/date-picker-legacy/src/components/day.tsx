import * as React from 'react'
import { chakra } from '@chakra-ui/react'
import { dataAttr } from '@chakra-ui/utils'
import { isEndDate, isStartDate, useDay } from '@datepicker-react/hooks'
import { getDay, isFirstDayOfMonth, isLastDayOfMonth } from 'date-fns'

import { useDatePickerContext } from '../date-picker-provider'

import { useStyles } from '../styles.provider'

interface DayProps {
  day: string
  date: Date
}

export const Day: React.FC<DayProps> = (props) => {
  const { day, date } = props

  const dayRef = React.useRef<any>(null)

  const {
    firstDayOfWeek,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
    onDayRender,
    startDate,
    endDate,
  } = useDatePickerContext()

  const dayProps = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  })

  const {
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
    isSelectedStartOrEnd,
    isSelected,
    isWithinHoverRange,
    disabledDate,
  } = dayProps

  const weekday = getDay(date)

  const isFirst = isStartDate(date, startDate)
  const isLast = isEndDate(date, endDate)
  const isStartOfWeek = weekday === firstDayOfWeek
  const isEndOfWeek = weekday === firstDayOfWeek - 7 + 6

  const styles = useStyles()

  return (
    <chakra.button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      ref={dayRef}
      disabled={disabledDate}
      aria-label={`Day-${date.toDateString()}`}
      data-first={dataAttr(isFirst)}
      data-last={dataAttr(isLast)}
      data-selected={dataAttr(isSelected)}
      data-highlighted={dataAttr(isWithinHoverRange)}
      data-week-start={dataAttr(isStartOfWeek)}
      data-week-end={dataAttr(isEndOfWeek)}
      data-month-start={dataAttr(isFirstDayOfMonth(date))}
      data-month-end={dataAttr(isLastDayOfMonth(date))}
      __css={styles.day}
    >
      <chakra.span __css={styles.dayLabel}>
        {typeof onDayRender === 'function'
          ? onDayRender(date, {
              isFirst,
              isLast,
              isSelected,
              isWithinHoverRange,
              isSelectedStartOrEnd,
              disabledDate,
            })
          : day}
      </chakra.span>
    </chakra.button>
  )
}
