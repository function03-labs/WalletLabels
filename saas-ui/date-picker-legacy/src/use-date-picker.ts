import * as React from 'react'

import { ButtonProps } from '@chakra-ui/react'
import { PropGetterV2 } from '@chakra-ui/react-utils'
import { dataAttr } from '@chakra-ui/utils'

import { setYear, getYear, getMonth, isSameYear } from 'date-fns'

import {
  useDatePickerContext,
  DatePickerFormatProps,
} from './date-picker-provider'
import { datePickerMessages, DatePickerMessages } from './i18n'
import { defaultDateFormat } from './utils/formatters'

import { START_DATE } from '@datepicker-react/hooks'

import { useMonth, UseDatepickerProps } from '@datepicker-react/hooks'

export interface DatePickerOptions
  extends Partial<UseDatepickerProps>,
    Partial<DatePickerFormatProps> {
  dateFormat?: string
  onDayRender?(date: Date): React.ReactNode
  messages?: DatePickerMessages
  hideCloseButton?: boolean
  closeOnSelect?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export const useDatePicker = (props: DatePickerOptions) => {
  const {
    closeOnSelect,
    changeActiveMonthOnSelect,
    dayLabelFormat,
    dateFormat = defaultDateFormat,
    endDate = null,
    exactMinBookingDays = false,
    firstDayOfWeek,
    focusedInput = START_DATE,
    initialVisibleMonth,
    isDateBlocked = () => false,
    maxBookingDate,
    minBookingDate,
    minBookingDays = 1,
    monthLabelFormat,
    numberOfMonths = 1,
    onDatesChange = () => null,
    onDayRender,
    messages = datePickerMessages,
    startDate = null,
    unavailableDates = [],
    weekdayLabelFormat,
    orientation = 'horizontal',
    ...contentProps
  } = props

  const containerProps = {
    closeOnSelect,
    changeActiveMonthOnSelect,
    dayLabelFormat,
    dateFormat,
    endDate,
    exactMinBookingDays,
    firstDayOfWeek,
    focusedInput,
    initialVisibleMonth,
    isDateBlocked,
    maxBookingDate,
    minBookingDate,
    minBookingDays,
    monthLabelFormat,
    numberOfMonths,
    onDatesChange,
    onDayRender,
    messages,
    startDate,
    unavailableDates,
    weekdayLabelFormat,
    orientation,
  }

  return {
    containerProps,
    contentProps,
  }
}

export const useYears = () => {
  const {
    startDate,
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
    setAction,
  } = useDatePickerContext()

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

  const getLabelProps: PropGetterV2<'button', ButtonProps> = (
    props?: ButtonProps,
  ) => {
    return {
      variant: 'ghost',
      ...props,
      onClick: () => setAction('calendar'),
    }
  }

  return {
    date,
    yearsLabel: monthLabel,
    years,
    getLabelProps,
  }
}

export interface UseYearProps {
  date: Date
  year: number
}

export const useYear = (props: UseYearProps) => {
  const { date, year } = props

  const { goToDate, onDateSelect, setAction } = useDatePickerContext()

  const ref = React.useRef<HTMLButtonElement>(null)

  const isCurrent = isSameYear(date, setYear(new Date(), year))

  React.useEffect(() => {
    if (isCurrent) {
      ref.current?.scrollIntoView({ block: 'center', inline: 'center' })
    }
  }, [isCurrent])

  const onClick = () => {
    goToDate(setYear(date, year))
    onDateSelect(setYear(date, year))
    setAction('calendar')
  }

  return {
    ref,
    ['data-active']: dataAttr(isCurrent),
    onClick,
  }
}
