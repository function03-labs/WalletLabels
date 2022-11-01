export interface DateSingleInputMessages extends DatePickerMessages {
  dateAriaLabel: string
  datePlaceholder: string
}

export const datePickerMessages = {
  datepickerStartDatePlaceholder: 'Select',
  datepickerStartDateLabel: 'Start date:',
  datepickerEndDatePlaceholder: 'Select',
  datepickerEndDateLabel: 'End date:',
  resetDates: 'Reset dates',
  close: 'Close',
}

export type DatePickerMessages = typeof datePickerMessages

export const dateRangeInputMessages = {
  ...datePickerMessages,

  startDateAriaLabel: 'Start date',
  endDateAriaLabel: 'End date',

  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
}

export type DateRangeInputMessages = typeof dateRangeInputMessages

export const dateInputMessages = {
  ...datePickerMessages,
  dateAriaLabel: 'Select date',
  datePlaceholder: 'Select date',
}

export type DateInputMessages = typeof dateInputMessages
