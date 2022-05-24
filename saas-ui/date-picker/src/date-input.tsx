import { useDisclosure, useMergeRefs, useOutsideClick } from '@chakra-ui/react'
import {
  getInputValue,
  OnDatesChangeProps,
  parseDate,
  START_DATE,
} from '@datepicker-react/hooks'
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { Input, InputProps } from './components'
import {
  DatePicker,
  DatePickerDialog,
  DatePickerProps,
  DatePickerAnchor,
  DatePickerElement,
} from './date-picker'
import { DateInputMessages, dateInputMessages } from './i18n'
import { InputDate } from './date-picker-provider'
import { defaultDateFormat } from './utils/formatters'

export interface OnDateChangeProps {
  date: InputDate
  showDatePicker: boolean
}

export interface DateInputProps
  extends Partial<InputProps>,
    Partial<DatePickerProps> {
  messages?: DateInputMessages
  placement?: 'top' | 'bottom'
  showDatePicker?: boolean
  date?: InputDate
  closeOnSelect?: boolean
  openOnFocus?: boolean
}

export const DateInput = forwardRef(
  (props: DateInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      date: dateProp = null,
      changeActiveMonthOnSelect,
      dayLabelFormat,
      dateFormat = defaultDateFormat,
      firstDayOfWeek,
      icon,
      initialVisibleMonth,
      isDateBlocked = () => false,
      maxBookingDate,
      minBookingDate,
      monthLabelFormat,
      name = 'date',
      numberOfMonths = 1,
      onChange: onChange,
      onClick,
      onClose: onCloseProp,
      onDayRender,
      openOnFocus,
      messages = dateInputMessages,
      placeholder,
      placement = 'bottom',
      showCalendarIcon = true,
      hideCloseButton,
      unavailableDates = [],
      value,
      orientation = 'horizontal',
      weekdayLabelFormat,
      allowEditableInputs,
      closeOnSelect = true,
      children,
      ...inputProps
    } = props

    const dialogRef = useRef<HTMLDivElement>(null)
    const datePickerRef = useRef<DatePickerElement>(null)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const { isOpen, onOpen, onClose } = useDisclosure({})

    const [date, setDate] = useState<InputDate>(
      value ? new Date(value) : dateProp,
    )

    useOutsideClick({
      ref: inputRef,
      handler: (e: Event) => {
        if (!dialogRef.current?.contains(e.target as Element)) {
          onClose()
        }
      },
    })

    useEffect(() => {
      onChange?.(date)
    }, [date, onChange])

    const onDatesChange = (data: OnDatesChangeProps) => {
      setDate(data.startDate)
      if (closeOnSelect) {
        onClose()
      }
    }

    const onInputChange = (date: Date) => {
      datePickerRef.current?.onDateSelect?.(date)
      setDate(date)
    }

    return (
      <DatePicker
        ref={datePickerRef}
        changeActiveMonthOnSelect={changeActiveMonthOnSelect}
        dayLabelFormat={dayLabelFormat}
        displayFormat={dateFormat}
        endDate={date}
        exactMinBookingDays
        firstDayOfWeek={firstDayOfWeek}
        focusedInput={isOpen ? START_DATE : null}
        initialVisibleMonth={initialVisibleMonth}
        isDateBlocked={isDateBlocked}
        maxBookingDate={maxBookingDate}
        minBookingDate={minBookingDate}
        minBookingDays={1}
        monthLabelFormat={monthLabelFormat}
        numberOfMonths={numberOfMonths}
        isOpen={isOpen}
        onClose={onClose}
        onDatesChange={onDatesChange}
        onDayRender={onDayRender}
        messages={messages}
        hideCloseButton={hideCloseButton}
        startDate={date}
        unavailableDates={unavailableDates}
        orientation={orientation}
        weekdayLabelFormat={weekdayLabelFormat}
        autoFocus={false}
        closeOnBlur={false}
        closeOnSelect={closeOnSelect}
      >
        <DatePickerAnchor>
          <Input
            ref={useMergeRefs(ref, inputRef)}
            name={name}
            aria-label={messages.dateAriaLabel}
            value={getInputValue(date, dateFormat, '')}
            placeholder={placeholder}
            dateFormat={dateFormat}
            showCalendarIcon={showCalendarIcon}
            onCalendarClick={onOpen}
            isActive={isOpen}
            onChange={onInputChange}
            onFocus={() => {
              if (openOnFocus && !isOpen) {
                onOpen()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                if (!isOpen) {
                  return onOpen()
                }
              }
            }}
            icon={icon}
            isReadOnly={allowEditableInputs === false}
            {...inputProps}
          />
        </DatePickerAnchor>
        <DatePickerDialog ref={dialogRef} />
      </DatePicker>
    )
  },
)
