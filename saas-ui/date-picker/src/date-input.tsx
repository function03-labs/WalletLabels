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
} from './date-picker'
import { DateInputLocale, dateInputLocale } from './locale'
import { InputDate } from './date-picker-provider'
import { defaultDisplayFormat } from './utils/formatters'

export interface OnDateChangeProps {
  date: InputDate
  showDatePicker: boolean
}

export interface DateInputProps
  extends Partial<InputProps>,
    Partial<DatePickerProps> {
  locale?: DateInputLocale
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
      displayFormat = defaultDisplayFormat,
      firstDayOfWeek,
      icon,
      initialVisibleMonth,
      isDateBlocked = () => false,
      maxBookingDate,
      minBookingDate,
      monthLabelFormat,
      name = 'startDate',
      numberOfMonths = 1,
      onChange: onChange,
      onClick,
      onClose: onCloseProp,
      onDayRender,
      openOnFocus,
      locale = dateInputLocale,
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
      ...inputProps
    } = props

    const datePickerRef = useRef<HTMLDivElement>(null)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const { isOpen, onOpen, onClose } = useDisclosure({})

    const [date, setDate] = useState<InputDate>(
      value ? new Date(value) : dateProp,
    )

    useOutsideClick({
      ref: inputRef,
      handler: (e: Event) => {
        if (!datePickerRef.current?.contains(e.target as Element)) {
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
      // datepickerRef.current?.onDateSelect?.(date)
    }

    return (
      <DatePicker
        changeActiveMonthOnSelect={changeActiveMonthOnSelect}
        dayLabelFormat={dayLabelFormat}
        displayFormat={displayFormat}
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
        locale={locale}
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
            aria-label={locale.dateAriaLabel}
            value={getInputValue(date, displayFormat, '')}
            placeholder={placeholder}
            dateFormat={displayFormat}
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
            disableAccessibility={false}
            icon={icon}
            isReadOnly={allowEditableInputs === false}
            {...inputProps}
          />
        </DatePickerAnchor>
        <DatePickerDialog ref={datePickerRef} />
      </DatePicker>
    )
  },
)
