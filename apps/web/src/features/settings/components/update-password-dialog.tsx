import * as React from 'react'

import { FormLayout, Field, FormDialog, FormDialogProps } from '@saas-ui/react'

import { useUpdatePassword } from '@saas-ui/auth'

import { ConfirmPasswordField } from '@ui/lib'

interface SubmitParams {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordFormProps
  extends Omit<
    FormDialogProps<SubmitParams>,
    'onSubmit' | 'title' | 'scrollBehavior'
  > {
  title?: string
  label?: string
  confirmLabel?: string
  helpText?: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  newLabel?: string
  submitLabel?: string
}

export const UpdatePasswordDialog: React.FC<UpdatePasswordFormProps> = ({
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
  const [, submit] = useUpdatePassword()

  return (
    <FormDialog
      onSubmit={({ newPassword }) => {
        return submit({ password: newPassword }).then(onSuccess).catch(onError)
      }}
      defaultValues={{ password: '', newPassword: '', confirmPassword: '' }}
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

        <ConfirmPasswordField label={confirmLabel} confirmField="newPassword" />
      </FormLayout>
    </FormDialog>
  )
}

UpdatePasswordDialog.defaultProps = {
  title: 'Update your password',
  submitLabel: 'Update your password',
  label: 'Current password',
  newLabel: 'New password',
  confirmLabel: 'Confirm password',
}
