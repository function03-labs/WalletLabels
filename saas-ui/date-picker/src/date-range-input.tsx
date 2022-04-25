import { CalendarIcon } from '@chakra-ui/icons'
import {
  Box,
  PopoverAnchor,
  Stack,
  StackDivider,
  useBreakpointValue,
  useDisclosure,
  useMergeRefs,
  useOutsideClick,
} from '@chakra-ui/react'
import {
  END_DATE,
  FocusedInput,
  getInputValue,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import React, { Ref, useEffect, useRef, useState } from 'react'
import { Input, InputProps } from './components'
import {
  DatePicker,
  DatePickerAnchor,
  DatePickerDialog,
  DatePickerElement,
  DatePickerProps,
} from './date-picker'
import { dateRangeInputMessages, DateRangeInputMessages } from './i18n'
import { InputDate } from './date-picker-provider'
import { defaultDateFormat } from './utils/formatters'

export interface DateRangeInputProps extends Partial<DatePickerProps> {
  startDateInputProps?: Partial<InputProps>
  endDateInputProps?: Partial<InputProps>
  messages?: DateRangeInputMessages
  showDivider?: boolean
  placement?: 'top' | 'bottom'
  onFocusChange?(focusedInput: FocusedInput): void
  openOnFocus?: boolean
  endIcon?: typeof CalendarIcon
  endId?: string
  endName?: string
  endPlaceholder?: string
  endRef?: Ref<HTMLInputElement>
  endShowCalendarIcon?: boolean
  startIcon?: typeof CalendarIcon
  startId?: string
  startName?: string
  startPlaceholder?: string
  startRef?: Ref<HTMLInputElement>
  startShowCalendarIcon?: boolean
  allowEditableInputs?: boolean
}

export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
  const {
    endDate: endDateProp = null,
    startDate: startDateProp = null,
    focusedInput: focusedInputProp = null,
    dateFormat = defaultDateFormat,
    endShowCalendarIcon = true,
    isDateBlocked = () => false,
    minBookingDays = 1,
    messages = dateRangeInputMessages,
    placement = 'bottom-start',
    hideCloseButton,
    showDivider = false,
    startShowCalendarIcon = true,
    onClose: onCloseProp,
    closeOnSelect,
    onDatesChange: onDatesChangeProp = () => null,
    onFocusChange: onFocusChangeProp = () => null,
    openOnFocus,
    startIcon,
    startName,
    startPlaceholder,
    startRef: startRefProp,
    endName,
    endRef: endRefProp,
    endIcon,
    endPlaceholder,
    changeActiveMonthOnSelect,
    dayLabelFormat,
    exactMinBookingDays,
    firstDayOfWeek,
    initialVisibleMonth,
    maxBookingDate,
    minBookingDate,
    monthLabelFormat,
    numberOfMonths = 2,
    onDayRender,
    unavailableDates,
    weekdayLabelFormat,
    allowEditableInputs,
    orientation,
  } = props

  const dpRef = useRef<DatePickerElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: onCloseProp,
  })

  const [startDate, setStartDate] = useState<InputDate>(startDateProp)
  const [endDate, setEndDate] = useState<InputDate>(endDateProp)
  const [focusedInput, setFocusedInput] =
    useState<FocusedInput>(focusedInputProp)

  useEffect(() => {
    setStartDate(startDateProp)
    setEndDate(endDateProp)
  }, [startDateProp, endDateProp])

  useOutsideClick({
    ref: startRef,
    handler: (e: Event) => {
      const target = e.target as Element
      if (
        !datePickerRef.current?.contains(target) &&
        endRef.current !== target
      ) {
        onClose()
      }
    },
  })

  useOutsideClick({
    ref: endRef,
    handler: (e: Event) => {
      const target = e.target as Element
      if (
        !datePickerRef.current?.contains(e.target as Element) &&
        startRef.current !== target
      ) {
        onClose()
      }
    },
  })

  const onFocusChange = (_focusedInput: FocusedInput) => {
    setFocusedInput(_focusedInput)
    onFocusChangeProp(_focusedInput)
  }

  const onDatesChange = (data: OnDatesChangeProps) => {
    setStartDate(data.startDate)
    setEndDate(data.endDate)

    if (closeOnSelect && data.endDate && data.focusedInput === null) {
      onClose()
    }

    if (data.focusedInput) {
      setFocusedInput(data.focusedInput)
    }
    onDatesChangeProp(data)
  }

  const onInputChange = (date: Date) => {
    dpRef.current?.onDateSelect?.(date)
  }

  const onFocus = () => {
    if (openOnFocus && !isOpen) {
      onOpen()
    }
  }

  const isMobile = useBreakpointValue({ base: true, md: false })
  const isVertical = props.orientation === 'vertical' || isMobile
  const isReadOnly = allowEditableInputs === false

  const startInput = (
    <Input
      icon={startIcon}
      name={startName || 'startDate'}
      placeholder={startPlaceholder || messages.startDatePlaceholder}
      ref={useMergeRefs(startRefProp, startRef)}
      showCalendarIcon={startShowCalendarIcon}
      aria-label={messages.startDateAriaLabel}
      dateFormat={dateFormat}
      isActive={isOpen && focusedInput === START_DATE}
      onChange={onInputChange}
      onCalendarClick={onOpen}
      onFocus={() => {
        onFocusChange(START_DATE)
        onFocus()
      }}
      value={getInputValue(startDate, dateFormat, '')}
      isReadOnly={isReadOnly}
    />
  )

  const endInput = (
    <Input
      name={endName || 'endDate'}
      ref={useMergeRefs(endRefProp, endRef)}
      icon={endIcon}
      placeholder={endPlaceholder || messages.endDatePlaceholder}
      showCalendarIcon={endShowCalendarIcon}
      aria-label={messages.endDateAriaLabel}
      dateFormat={dateFormat}
      disableAccessibility={focusedInput === START_DATE}
      isActive={isOpen && focusedInput === END_DATE}
      onChange={onInputChange}
      onCalendarClick={onOpen}
      onFocus={() => {
        onFocusChange(!startDate ? START_DATE : END_DATE)
        onFocus()
      }}
      value={getInputValue(endDate, dateFormat, '')}
      isReadOnly={isReadOnly}
    />
  )

  const arrowOffset = React.useMemo(() => {
    return focusedInput === END_DATE
      ? (endRef.current?.getBoundingClientRect().width || 0) / 2
      : ((startRef.current?.getBoundingClientRect().width || 0) / 2) * -1
  }, [focusedInput, isOpen])

  return (
    <DatePicker
      dpRef={dpRef}
      isOpen={isOpen}
      onClose={onClose}
      startDate={startDate}
      endDate={endDate}
      focusedInput={focusedInput}
      onDatesChange={onDatesChange}
      changeActiveMonthOnSelect={changeActiveMonthOnSelect}
      dayLabelFormat={dayLabelFormat}
      exactMinBookingDays={exactMinBookingDays}
      firstDayOfWeek={firstDayOfWeek}
      initialVisibleMonth={initialVisibleMonth}
      isDateBlocked={isDateBlocked}
      maxBookingDate={maxBookingDate}
      minBookingDate={minBookingDate}
      minBookingDays={minBookingDays}
      monthLabelFormat={monthLabelFormat}
      numberOfMonths={isVertical ? 1 : numberOfMonths}
      onDayRender={onDayRender}
      messages={messages}
      unavailableDates={unavailableDates}
      dateFormat={dateFormat}
      hideCloseButton={hideCloseButton}
      orientation={orientation}
      weekdayLabelFormat={weekdayLabelFormat}
      placement={placement}
      autoFocus={false}
      closeOnBlur={false}
      arrowOffset={arrowOffset}
    >
      <DatePickerAnchor>
        <Stack
          isInline={!isMobile}
          divider={showDivider ? <StackDivider /> : undefined}
        >
          {startInput}
          {endInput}
        </Stack>
      </DatePickerAnchor>
      <DatePickerDialog ref={datePickerRef} />
    </DatePicker>
  )
}
