import { format } from 'date-fns'

export {
  monthLabelFormat as monthLabelFormatFn,
  weekdayLabelFormat as weekdayLabelFormatFn,
} from '@datepicker-react/hooks'

export const dayLabelFormatFn = (date: Date) => format(date, 'd')

export const defaultDateFormat = 'MM/dd/yyyy'
