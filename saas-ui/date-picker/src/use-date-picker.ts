import * as React from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { dataAttr } from '@chakra-ui/utils'

import setYear from 'date-fns/setYear'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import isSameYear from 'date-fns/isSameYear'

import { useDatePickerContext } from './date-picker-provider'

import { useMonth } from '@datepicker-react/hooks'

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

  const getLabelProps = (props?: ButtonProps) => {
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
