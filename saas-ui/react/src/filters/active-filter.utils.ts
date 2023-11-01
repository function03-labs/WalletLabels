import { formatDistanceToNowStrict, isAfter, format } from 'date-fns'

import { FilterValue } from './use-active-filter'

export const defaultFormatter = (value: FilterValue) => {
  if (value instanceof Date) {
    if (isAfter(value, new Date())) {
      return format(value, 'PP')
    }
    return formatDistanceToNowStrict(value, { addSuffix: true })
  }

  return value?.toString()
}
