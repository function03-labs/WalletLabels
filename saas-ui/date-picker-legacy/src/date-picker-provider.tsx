import {
  FocusedInput,
  FormatFunction,
  useDatepicker,
} from '@datepicker-react/hooks'
import React, { useContext } from 'react'
import { datePickerMessages, DatePickerMessages } from './i18n'

import {
  dayLabelFormatFn,
  defaultDateFormat,
  monthLabelFormatFn,
  weekdayLabelFormatFn,
} from './utils/formatters'

export type InputDate = Date | null

export type UseDatePickerReturnType = ReturnType<typeof useDatepicker> & {
  orientation: 'horizontal' | 'vertical'
  setAction: (action: DatePickerAction) => void
  action: DatePickerAction
}

export interface DatePickerFormatProps {
  dayLabelFormat: typeof dayLabelFormatFn
  weekdayLabelFormat: typeof weekdayLabelFormatFn
  monthLabelFormat: typeof monthLabelFormatFn
}

export type OnDayRenderType = {
  isFirst: boolean
  isLast: boolean
  isSelected: boolean
  isWithinHoverRange: boolean
  isSelectedStartOrEnd: boolean
  disabledDate: boolean
}

export interface DatePickerContextBaseProps {
  dateFormat: FormatFunction | string
  startDate: InputDate
  endDate: InputDate
  messages: DatePickerMessages
  focusedInput: FocusedInput
  onDayRender?(date: Date, state: OnDayRenderType): React.ReactNode
}

export interface DatePickerContextProps
  extends DatePickerContextBaseProps,
    DatePickerFormatProps,
    UseDatePickerReturnType {}

export interface DatePickerProviderProps
  extends Partial<DatePickerContextProps> {
  children: React.ReactNode
}

export type DatePickerAction = 'calendar' | 'years'

const defaultBase: DatePickerContextBaseProps = {
  startDate: null,
  endDate: null,
  focusedInput: null,
  onDayRender: undefined,
  dateFormat: defaultDateFormat,
  messages: datePickerMessages,
}

const defaultFormatters: DatePickerFormatProps = {
  monthLabelFormat: monthLabelFormatFn,
  weekdayLabelFormat: weekdayLabelFormatFn,
  dayLabelFormat: dayLabelFormatFn,
}

const defaultUseDatePicker: UseDatePickerReturnType = {
  numberOfMonths: 2,
  activeMonths: [],
  firstDayOfWeek: 0,
  focusedDate: null,
  hoveredDate: null,
  goToDate: () => undefined,
  goToNextMonths: () => undefined,
  goToNextMonthsByOneMonth: () => undefined,
  goToNextYear: () => undefined,
  goToPreviousMonths: () => undefined,
  goToPreviousMonthsByOneMonth: () => undefined,
  goToPreviousYear: () => undefined,
  isDateBlocked: () => false,
  isDateFocused: () => false,
  isDateHovered: () => false,
  isDateSelected: () => false,
  isEndDate: () => false,
  isFirstOrLastSelectedDate: () => false,
  isStartDate: () => false,
  onDateFocus: () => undefined,
  onDateHover: () => undefined,
  onDateSelect: () => undefined,
  onResetDates: () => undefined,
  orientation: 'horizontal',
  setAction: () => undefined,
  action: 'calendar',
}

export const datepickerContextDefaultValue: DatePickerContextProps = {
  ...defaultBase,
  ...defaultFormatters,
  ...defaultUseDatePicker,
}

export const DatePickerContext = React.createContext(
  datepickerContextDefaultValue,
)

export const useDatePickerContext = () => useContext(DatePickerContext)

export const DatePickerProvider: React.FC<DatePickerProviderProps> = ({
  children,
  ...props
}) => (
  <DatePickerContext.Provider
    value={{ ...datepickerContextDefaultValue, ...props }}
  >
    {children}
  </DatePickerContext.Provider>
)
