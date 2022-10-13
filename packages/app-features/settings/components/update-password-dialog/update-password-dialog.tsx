import * as React from 'react'

import {
  FormLayout,
  Field,
  FormDialog,
  useUpdatePassword,
  FormDialogProps,
  SubmitHandler,
} from '@saas-ui/react'

import { ConfirmPasswordField } from '@app/features/core/components/confirm-password-field'

interface SubmitParams {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordFormProps
  extends Omit<FormDialogProps<SubmitParams>, 'onSubmit'> {
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

  const handleSubmit: SubmitHandler<SubmitParams> = ({ newPassword }) => {
    return submit({ password: newPassword }).then(onSuccess).catch(onError)
  }

  return (
    <FormDialog<SubmitParams>
      onSubmit={handleSubmit}
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
