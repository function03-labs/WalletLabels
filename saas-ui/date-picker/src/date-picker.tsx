import {
  chakra,
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
  PopoverAnchor,
  ThemingProps,
  SystemProps,
  useMultiStyleConfig,
  SystemStyleObject,
  createStylesContext,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { cx, __DEV__ } from '@chakra-ui/utils'
import {
  END_DATE,
  MonthType,
  START_DATE,
  useDatepicker,
} from '@datepicker-react/hooks'
import { ButtonGroup } from '@saas-ui/react'
import React, { Ref, useImperativeHandle, useRef } from 'react'
import { ActionButton, Month, Years } from './components'
import {
  DatePickerProvider,
  DatePickerAction,
  useDatePickerContext,
} from './date-picker-provider'
import { datePickerMessages } from './i18n'
import {
  dayLabelFormatFn,
  defaultDateFormat,
  monthLabelFormatFn,
  weekdayLabelFormatFn,
} from './utils/formatters'

import { useDatePicker, DatePickerOptions } from './use-date-picker'

import defaultStyleConfig from './styles'

import { StylesProvider, useStyles } from './styles.provider'

export interface DatePickerElement {
  onDateSelect?(date: Date): void
}

export interface DatePickerContainerProps
  extends DatePickerOptions,
    ThemingProps<'DatePicker'> {
  children: React.ReactNode
}

export const DatePickerContainer = React.forwardRef(
  (props: DatePickerContainerProps, ref: Ref<DatePickerElement>) => {
    const {
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
      children,
    } = props

    const theme = useTheme()

    const styleConfig = theme.components.DatePicker || defaultStyleConfig

    const styles = useMultiStyleConfig('DatePicker', {
      styleConfig,
      ...props,
    }) as Record<string, SystemStyleObject>

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

    useImperativeHandle(ref, () => ({
      onDateSelect: (date: Date) => {
        dp.onDateSelect(date)
      },
    }))

    const [action, setAction] = React.useState<DatePickerAction>('calendar')

    return (
      <DatePickerProvider
        {...dp}
        focusedInput={focusedInput}
        dayLabelFormat={dayLabelFormat || dayLabelFormatFn}
        dateFormat={dateFormat}
        endDate={endDate}
        monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
        onDayRender={onDayRender}
        messages={messages}
        startDate={startDate}
        weekdayLabelFormat={weekdayLabelFormat || weekdayLabelFormatFn}
        orientation={orientation}
        setAction={setAction}
        action={action}
      >
        <StylesProvider value={styles}>{children}</StylesProvider>
      </DatePickerProvider>
    )
  },
)

export const DatePickerNav = forwardRef((props, ref) => {
  const { goToNextMonths, goToPreviousMonths, orientation } =
    useDatePickerContext()

  const styles = useStyles()

  return (
    <ButtonGroup ref={ref} {...props} sx={styles.nav}>
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
})

export const DatePickerContent = forwardRef((props, ref) => {
  const { orientation, activeMonths, action } = useDatePickerContext()
  const monthGridRef = useRef<HTMLDivElement>(null)

  const isMobile = useBreakpointValue({ base: true, md: false })
  const isVertical = orientation === 'vertical' || isMobile

  React.useEffect(() => {
    if (monthGridRef && monthGridRef.current && isVertical) {
      monthGridRef.current.scrollTop = 0
    }
  }, [activeMonths, isVertical])

  let content
  if (action === 'years') {
    content = <Years />
  } else {
    content = (
      <>
        <DatePickerCalendar ref={monthGridRef} />
        <DatePickerNav />
      </>
    )
  }

  return (
    <chakra.div ref={ref} {...props}>
      {content}
    </chakra.div>
  )
})

export interface DatePickerProps
  extends Omit<DatePickerContainerProps, 'children'>,
    Omit<PopoverProps, 'variant' | 'size'> {}

export const DatePicker = forwardRef((props: DatePickerProps, ref) => {
  const { containerProps, contentProps } = useDatePicker(props)

  const theme = useTheme()

  const styleConfig = theme.components.DatePicker || defaultStyleConfig

  return (
    <DatePickerContainer ref={ref} {...containerProps}>
      <Popover {...contentProps} styleConfig={styleConfig} />
    </DatePickerContainer>
  )
})

export interface DatePickerDialog extends PopoverContentProps {
  hideArrow?: boolean
  arrowOffset?: SystemProps['marginStart']
}

export const DatePickerDialog = forwardRef<DatePickerDialog, 'div'>(
  (props, ref) => {
    const { children, hideArrow, arrowOffset, ...rest } = props
    return (
      <PopoverContent
        ref={ref}
        {...rest}
        className={cx('saas-date-picker', props.className)}
      >
        {!hideArrow && <PopoverArrow marginLeft={arrowOffset} />}

        <DatePickerContent />
      </PopoverContent>
    )
  },
)

export interface DatePickerStaticProps extends DatePickerContainerProps {}

const DatePickerStaticContent = forwardRef<HTMLChakraProps<'div'>, 'div'>(
  (props, ref) => {
    const styles = useStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        __css={styles.container}
        className={cx('saas-date-picker', props.className)}
      >
        <DatePickerContent />
      </chakra.div>
    )
  },
)

export const DatePickerStatic = forwardRef<DatePickerStaticProps, 'div'>(
  (props, ref) => {
    const { containerProps, contentProps } = useDatePicker(props)

    return (
      <DatePickerContainer {...containerProps}>
        <DatePickerStaticContent ref={ref} {...contentProps} />
      </DatePickerContainer>
    )
  },
)

export const DatePickerCalendar = forwardRef((props, ref) => {
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

export const DatePickerTrigger: React.FC<React.PropsWithChildren<unknown>> = (
  props,
) => {
  return <PopoverTrigger {...props} />
}

export const DatePickerAnchor: React.FC<React.PropsWithChildren<unknown>> = (
  props,
) => {
  return <PopoverAnchor {...props} />
}
