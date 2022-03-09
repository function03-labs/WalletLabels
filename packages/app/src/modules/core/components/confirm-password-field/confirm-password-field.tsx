import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Field, FieldProps } from '@saas-ui/react'

export interface ConfirmPasswordProps extends Omit<FieldProps, 'name'> {
  name?: string
  confirmField?: string
}

export const ConfirmPasswordField: React.FC<ConfirmPasswordProps> = (props) => {
  const form = useFormContext()

  const { name = 'confirmPassword', confirmField = 'password', ...rest } = props

  const validatePassword = React.useCallback(
    (confirmPassword) => {
      const password = form.getValues(confirmField)
      console.log(password)
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
