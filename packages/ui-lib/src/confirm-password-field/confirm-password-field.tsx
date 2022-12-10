import * as React from 'react'

import { Field, FieldProps, useFormContext } from '@saas-ui/react'

export interface ConfirmPasswordProps extends Omit<FieldProps, 'name'> {
  name?: string
  confirmField?: string
}

export const ConfirmPasswordField: React.FC<ConfirmPasswordProps> = (props) => {
  const form = useFormContext()

  const { name = 'confirmPassword', confirmField = 'password', ...rest } = props

  const validatePassword = React.useCallback(
    (confirmPassword: string) => {
      const password = form.getValues(confirmField)
      return confirmPassword === password
    },
    [confirmField],
  )

  return (
    <Field
      {...rest}
      name={name}
      type="password"
      rules={{ validate: validatePassword }}
    />
  )
}
