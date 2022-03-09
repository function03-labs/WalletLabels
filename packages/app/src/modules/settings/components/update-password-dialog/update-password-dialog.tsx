import * as React from 'react'

import {
  FormLayout,
  Field,
  UseFormReturn,
  FormDialog,
  SubmitButton,
  useUpdatePassword,
} from '@saas-ui/react'

import { SubmitHandler } from 'react-hook-form'

interface SubmitParams {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordFormProps {
  schema?: any
  label?: string
  confirmLabel?: string
  helpText?: string
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  newLabel?: string
  submitLabel?: string
}

export const UpdatePasswordDialog: React.FC<UpdatePasswordFormProps> = ({
  schema,
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel,
  newLabel,
  label,
  confirmLabel,
  helpText,
  children,
  ...formProps
}) => {
  const [{ isLoading }, submit] = useUpdatePassword()

  const formRef = React.useRef<UseFormReturn<SubmitParams>>(null)

  const handleSubmit: SubmitHandler<SubmitParams> = ({ newPassword }) => {
    return submit({ password: newPassword }).then(onSuccess).catch(onError)
  }

  const validatePassword = React.useCallback((confirmPassword) => {
    const password = formRef.current?.getValues('newPassword')
    return confirmPassword === password
  }, [])

  return (
    <FormDialog
      schema={schema}
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ password: '', confirmPassword: '' }}
      ref={formRef}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="password"
          label={label}
          type="password"
          rules={{ required: true }}
        />

        <Field
          name="newPassword"
          label={newLabel}
          type="password"
          rules={{ required: true }}
        />

        <Field
          name="confirmPassword"
          label={confirmLabel}
          type="password"
          rules={{ validate: validatePassword }}
        />

        <SubmitButton type="submit" isFullWidth isLoading={isLoading}>
          {submitLabel}
        </SubmitButton>
      </FormLayout>
    </FormDialog>
  )
}

UpdatePasswordDialog.defaultProps = {
  submitLabel: 'Update your password',
  label: 'Current password',
  newLabel: 'New password',
  confirmLabel: 'Confirm password',
}
