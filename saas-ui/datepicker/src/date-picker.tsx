import {
  forwardRef,
  Stack,
  useBreakpointValue,
  useTheme,
  Popover,
  PopoverProps,
  PopoverContent,
  PopoverContentProps,
  PopoverArrow,
  PopoverTrigger,
  PopoverBody,
  useStyles,
  ThemingProps,
  SystemProps,
} from '@chakra-ui/react'
import { cx, __DEV__ } from '@chakra-ui/utils'
import {
  END_DATE,
  MonthType,
  START_DATE,
  useDatepicker,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import { ButtonGroup } from '@saas-ui/react'
import React, { Ref, useImperativeHandle, useRef } from 'react'
import { ActionButton, Month } from './components'
import {
  DatePickerFormatProps,
  DatePickerProvider,
  useDatePickerContext,
} from './date-picker-provider'
import { DatePickerLocale, datePickerLocale } from './locale'
import {
  dayLabelFormatFn,
  defaultDisplayFormat,
  monthLabelFormatFn,
  weekdayLabelFormatFn,
} from './utils/formatters'

import styles from './styles'

export interface DatePickerElement {
  onDateSelect?(date: Date): void
}

export interface DatePickerProps
  extends Omit<PopoverProps, 'variant' | 'size'>,
    ThemingProps<'DataPicker'>,
    Partial<DatePickerFormatProps>,
    Partial<UseDatepickerProps> {
  displayFormat?: string
  onClose?(): void
  onDayRender?(date: Date): React.ReactNode
  locale?: DatePickerLocale
  hideCloseButton?: boolean
  hideArrow?: boolean
  arrowOffset?: SystemProps['marginLeft']
  orientation?: 'horizontal' | 'vertical'
  closeOnSelect?: boolean
  dpRef?: Ref<DatePickerElement>
}

export const DatePicker = React.forwardRef(
  (props: DatePickerProps, ref: Ref<HTMLDivElement>) => {
    const {
      dpRef,
      changeActiveMonthOnSelect,
      dayLabelFormat,
      displayFormat = defaultDisplayFormat,
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
      numberOfMonths = 2,
      isOpen,
      onClose = () => null,
      onDatesChange = () => null,
      onDayRender,
      locale = datePickerLocale,
      hideCloseButton,
      hideArrow,
      arrowOffset,
      startDate = null,
      unavailableDates = [],
      weekdayLabelFormat,
      orientation = 'horizontal',
      closeOnSelect,
      children,
      ...rest
    } = props

    const dp = useDatepicker({
      changeActiveMonthOnSelect,
      endDate,
      exactMinBookingDays,
      firstDayOfWeek,
      focusedInput,
      initialVisibleMonth,
      isDateBlocked,
      maxBookingDate,
      minBookingDate,
      minBookingDays,
      numberOfMonths,
      onDatesChange,
      startDate,
      unavailableDates,
    })

    useImperativeHandle(dpRef, () => ({
      onDateSelect: (date: Date) => {
        dp.onDateSelect(date)
      },
    }))

    const monthGridRef = useRef<HTMLDivElement>(null)

    const isMobile = useBreakpointValue({ base: true, md: false })

    const isVertical = orientation === 'vertical' || isMobile

    function scrollTopToMonthGrid() {
      if (monthGridRef && monthGridRef.current && isVertical) {
        monthGridRef.current.scrollTop = 0
      }
    }

    function _goToNextMonths() {
      dp.goToNextMonths()
      scrollTopToMonthGrid()
    }

    function _goToPreviousMonths() {
      dp.goToPreviousMonths()
      scrollTopToMonthGrid()
    }

    return (
      <DatePickerProvider
        activeMonths={dp.activeMonths}
        dayLabelFormat={dayLabelFormat || dayLabelFormatFn}
        displayFormat={displayFormat}
        endDate={endDate}
        firstDayOfWeek={dp.firstDayOfWeek}
        focusedDate={dp.focusedDate}
        focusedInput={focusedInput}
        goToDate={dp.goToDate}
        goToNextMonths={_goToNextMonths}
        goToNextMonthsByOneMonth={dp.goToNextMonthsByOneMonth}
        goToNextYear={dp.goToNextYear}
        goToPreviousMonths={_goToPreviousMonths}
        goToPreviousMonthsByOneMonth={dp.goToPreviousMonthsByOneMonth}
        goToPreviousYear={dp.goToPreviousYear}
        hoveredDate={dp.hoveredDate}
        isDateBlocked={dp.isDateBlocked}
        isDateFocused={dp.isDateFocused}
        isDateHovered={dp.isDateHovered}
        isDateSelected={dp.isDateSelected}
        isEndDate={dp.isEndDate}
        isFirstOrLastSelectedDate={dp.isFirstOrLastSelectedDate}
        isStartDate={dp.isStartDate}
        monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
        numberOfMonths={dp.numberOfMonths}
        onDateFocus={dp.onDateFocus}
        onDateHover={dp.onDateHover}
        onDateSelect={dp.onDateSelect}
        onDayRender={onDayRender}
        onResetDates={dp.onResetDates}
        locale={locale}
        startDate={startDate}
        weekdayLabelFormat={weekdayLabelFormat || weekdayLabelFormatFn}
        orientation={orientation}
      >
        <DatePickerContainer isOpen={isOpen} onClose={onClose} {...rest}>
          {children}
          <DatePickerDialog ref={ref}>
            {!hideArrow && <PopoverArrow marginLeft={arrowOffset} />}

            <DatePickerBody>
              <DatePickerMonths ref={monthGridRef} />
              <DatePickerNav />
            </DatePickerBody>
          </DatePickerDialog>
        </DatePickerContainer>
      </DatePickerProvider>
    )
  },
)

export const DatePickerContainer: React.FC<DatePickerProps> = (props) => {
  const { children, ...rest } = props

  const theme = useTheme()

  const styleConfig = theme.components.DatePicker || styles

  return (
    <Popover {...rest} styleConfig={styleConfig}>
      {children}
    </Popover>
  )
}

export const DatePickerNav = () => {
  const { goToNextMonths, goToPreviousMonths, orientation } =
    useDatePickerContext()

  const styles = useStyles()

  return (
    <ButtonGroup sx={styles.nav}>
      <ActionButton
        direction={orientation === 'vertical' ? 'up' : 'left'}
        onClick={goToPreviousMonths}
        aria-label="Previous month"
        sx={styles.previousButton}
      />
      <ActionButton
        direction={orientation === 'vertical' ? 'down' : 'right'}
        onClick={goToNextMonths}
        aria-label="Next month"
        sx={styles.nextButton}
      />
    </ButtonGroup>
  )
}

export const DatePickerDialog = forwardRef(
  (props: PopoverContentProps, ref) => {
    const { children, ...rest } = props
    return (
      <PopoverContent
        ref={ref}
        {...rest}
        className={cx('saas-date-picker', props.className)}
      >
        {children}
      </PopoverContent>
    )
  },
)

export const DatePickerMonths = forwardRef((props, ref) => {
  const { activeMonths, hoveredDate, onDateHover, orientation } =
    useDatePickerContext()

  return (
    <Stack
      overflow={orientation === 'vertical' ? 'auto' : undefined}
      isInline={orientation !== 'vertical'}
      padding={1}
      onMouseLeave={() => {
        if (hoveredDate) {
          onDateHover(null)
        }
      }}
      {...props}
      ref={ref}
    >
      {activeMonths.map((month: MonthType) => (
        <Month
          key={`month-${month.year}-${month.month}`}
          year={month.year}
          month={month.month}
        />
      ))}
    </Stack>
  )
})

export const DatePickerTrigger: React.FC = (props) => {
  return <PopoverTrigger {...props} />
}

export const DatePickerBody: React.FC = (props) => {
  return <PopoverBody {...props} />
}
