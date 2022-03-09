import * as React from 'react'

import {
  FormLayout,
  Field,
  FormDialog,
  SubmitButton,
  useUpdatePassword,
  FormDialogProps,
} from '@saas-ui/react'

import { SubmitHandler } from 'react-hook-form'

import { ConfirmPasswordField } from '@modules/core/components/confirm-password-field'

interface SubmitParams {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordFormProps
  extends Omit<FormDialogProps, 'onSubmit'> {
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

  const handleSubmit: SubmitHandler<any> = ({ newPassword }) => {
    return submit({ password: newPassword }).then(onSuccess).catch(onError)
  }

  return (
    <FormDialog
      schema={schema}
      onSubmit={handleSubmit}
      defaultValues={{ password: '', confirmPassword: '' }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="password"
          label={label}
          type="password"
          rules={{ required: true }}
        />

        <ConfirmPasswordField confirmField="newPassword" />

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
