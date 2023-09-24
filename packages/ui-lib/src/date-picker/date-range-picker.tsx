import React from 'react'

import {
  DatePickerDialog,
  DatePickerTrigger,
  DateRangePicker as DateRangePickerBase,
  DateRangePickerProps as DateRangePickerBaseProps,
  DateRangePickerCalendar,
  getLocalTimeZone,
  today,
  DateFormatter,
  CalendarDate,
} from '@saas-ui/date-picker'
import { Button, useControllableState } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export type DateRange = { start: CalendarDate; end: CalendarDate }
export type DateRangePresets = '1d' | '3d' | '7d' | '30d'

export const getRangeValue = (range: DateRangePresets) => {
  const end = today(getLocalTimeZone())

  return {
    start: end.subtract({ days: Number.parseInt(range) }),
    end: end,
  }
}

export const getRangeDiff = (range: DateRange) => {
  return range.end.compare(range.start)
}

export const formatRange = (
  { start, end }: DateRange,
  locale: string,
  tz = getLocalTimeZone(),
) => {
  return new DateFormatter(locale).formatRange(start.toDate(tz), end.toDate(tz))
}

export interface DatePickerProps
  extends Omit<DateRangePickerBaseProps, 'value' | 'onChange'> {
  value?: DateRange
  onChange?: (value: DateRange) => void
}

export const DateRangePicker: React.FC<DatePickerProps> = (props) => {
  const { value: valueProp, onChange: onChangeProp, ...rest } = props

  const [value, setValue] = useControllableState<DateRange>({
    value: valueProp,
    defaultValue: {
      start: today(getLocalTimeZone()).subtract({ days: 30 }),
      end: today(getLocalTimeZone()),
    },
    onChange: onChangeProp,
  })

  const onChange = (value: DateRange) => {
    setValue(value)
  }

  const { locale, timeZone } = useIntl()

  return (
    <DateRangePickerBase {...rest} value={value} onChange={onChange}>
      <DatePickerTrigger>
        <Button>{formatRange(value, locale, timeZone)}</Button>
      </DatePickerTrigger>
      <DatePickerDialog>
        <DateRangePickerCalendar />
      </DatePickerDialog>
    </DateRangePickerBase>
  )
}
