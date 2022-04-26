import * as React from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { BaseModalProps } from '@saas-ui/react'

import { DatePickerStaticProps } from './date-picker'

import { OnDatesChangeProps } from '@datepicker-react/hooks'

export interface DatePickerModalOptions extends BaseModalProps {
  defaultIsOpen?: boolean
  onSubmit?(date: Date): void
  date?: Date
}

export const useDatePickerModal = (props: DatePickerModalOptions) => {
  const {
    title,
    footer,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    defaultIsOpen,
    onSubmit: onSubmitProp,
    date: dateProp,
    ...datePickerProps
  } = props

  const [date, setDate] = React.useState<Date>(dateProp || new Date())

  const { isOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    onClose: onCloseProp,
    defaultIsOpen,
  })

  const getModalProps = React.useCallback(
    (props?: Partial<BaseModalProps>) => {
      return {
        title,
        footer,
        isOpen,
        onClose,
        ...props,
      }
    },
    [title, footer, isOpen, onClose],
  )

  const getDatePickerProps = React.useCallback(
    (props?: Partial<DatePickerStaticProps>) => {
      return {
        numberOfMonths: 2,
        ...props,
        ...datePickerProps,
        onDatesChange: ({ startDate }: OnDatesChangeProps) =>
          startDate && setDate(startDate),
        startDate: date,
        endDate: date,
        minBookingDays: 1,
        exactMinBookingDays: true,
      }
    },
    [datePickerProps, date],
  )

  const onSubmit = () => {
    onSubmitProp?.(date)
    onClose()
  }

  return { getModalProps, getDatePickerProps, isOpen, onClose, onSubmit }
}
