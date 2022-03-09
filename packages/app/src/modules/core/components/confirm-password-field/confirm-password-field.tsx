import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Field, FieldProps } from '@saas-ui/react'

export interface ConfirmPasswordProps extends Omit<FieldProps, 'name'> {
  name?: string
  confirmField?: string
}

export const ConfirmPasswordField: React.FC<ConfirmPasswordProps> = (props) => {
  const form = useFormContext()

  const { name = 'confirmPassword', confirmField = 'password' } = props

  const validatePassword = React.useCallback(
    (confirmPassword) => {
      const password = form.getValues(confirmField)
      return confirmPassword === password
    },
    [confirmField],
  )

  return (
    <Field
      {...props}
      name={name}
      type="password"
      rules={{ validate: validatePassword }}
    />
  )
}
