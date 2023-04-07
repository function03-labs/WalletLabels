import { createField } from '@saas-ui/forms'
import { createZodForm } from '@saas-ui/forms/zod'
import { DatePickerInput } from '@saas-ui/date-picker'

const DatePickerField = createField(DatePickerInput)

export const Form = createZodForm({
  fields: {
    date: DatePickerField,
  },
})
