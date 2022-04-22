export interface DateSingleInputLocale extends DatePickerLocale {
  dateAriaLabel: string
  datePlaceholder: string
}

export const datePickerLocale = {
  datepickerStartDatePlaceholder: 'Select',
  datepickerStartDateLabel: 'Start date:',
  datepickerEndDatePlaceholder: 'Select',
  datepickerEndDateLabel: 'End date:',
  resetDates: 'Reset dates',
  close: 'Close',
}

export type DatePickerLocale = typeof datePickerLocale

export const dateRangeInputLocale = {
  ...datePickerLocale,

  startDateAriaLabel: 'Start date',
  endDateAriaLabel: 'End date',

  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
}

export type DateRangeInputLocale = typeof dateRangeInputLocale

export const dateInputLocale = {
  ...datePickerLocale,
  dateAriaLabel: 'Select date',
  datePlaceholder: 'Select date',
}

export type DateInputLocale = typeof dateInputLocale
