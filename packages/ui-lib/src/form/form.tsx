import { forwardRef } from '@chakra-ui/react'
import { createField } from '@saas-ui/forms'
import { createZodForm } from '@saas-ui/forms/zod'
import { DateInput, DateInputProps } from '@saas-ui/date-picker'
import { EditorField } from '../editor'

// @todo need to improve the date-picker to parse string values
const DateField = createField(
  forwardRef<DateInputProps, 'div'>((props, ref) => {
    const { onChange, ...rest } = props
    return <DateInput ref={ref} {...rest} />
  }),
  {
    isControlled: true,
  },
)

export const Form = createZodForm({
  fields: {
    date: DateField,
    editor: EditorField,
  },
})
