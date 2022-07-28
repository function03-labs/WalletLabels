import * as React from 'react'
import {
  FormattedDate,
  FormattedMessage,
  FormattedRelativeTime,
  FormattedTime,
} from 'react-intl'
import { differenceInSeconds, format } from 'date-fns'

export interface RelativeTimeProps {
  date: Date
}

export const RelativeTime: React.FC<RelativeTimeProps> = (props) => {
  const { date } = props

  const diff = React.useMemo(
    () => differenceInSeconds(new Date(date), new Date()),
    [props.date],
  )

  if (diff < 0 && diff > -60) {
    return (
      <FormattedMessage id="timeAgo" defaultMessage="Less than a minute ago" />
    )
  }

  return (
    <>
      <FormattedRelativeTime
        value={diff}
        numeric="auto"
        updateIntervalInSeconds={60}
      />
    </>
  )
}

export interface DateTimeProps {
  date: Date
  format?: string
}

export const DateTime: React.FC<DateTimeProps> = (props) => {
  const { date } = props
  return (
    <>
      <FormattedDate value={date} day="numeric" month="long" year="numeric" />,{' '}
      <FormattedTime value={date} />
    </>
  )
}
