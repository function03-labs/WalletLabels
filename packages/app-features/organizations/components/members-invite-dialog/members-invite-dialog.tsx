import * as React from 'react'

import {
  FormDialog,
  FormDialogProps,
  FormLayout,
  Field,
  Option,
  SubmitHandler,
} from '@saas-ui/react'

export interface MembersInviteData {
  emails: string[]
  role?: 'admin' | 'member' | string
}

interface MembersInviteInputs {
  emails: string
  role?: 'admin' | 'member' | string
}

export interface MembersInviteDialogProps
  extends Omit<FormDialogProps<MembersInviteInputs>, 'onSubmit'> {
  onInvite(data: MembersInviteData): Promise<any>
  roles?: Option[]
  requiredLabel?: string
  placeholder?: string
}

export const defaultMemberRoles = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'member',
    label: 'Member',
  },
]

export function MembersInviteDialog(props: MembersInviteDialogProps) {
  const {
    onClose,
    onInvite,
    onError,
    roles,
    defaultValues,
    placeholder = 'example@company.com, example2@company.com',
    requiredLabel = 'Add at least one email address.',
    ...rest
  } = props

  const fieldRef = React.useRef(null)

  const onSubmit: SubmitHandler<MembersInviteInputs> = async ({
    emails,
    role,
  }) => {
    try {
      await onInvite?.({
        emails: emails.split(',').map((email: string) => email.trim()),
        role,
      })

      onClose()
    } catch (e: any) {
      onError?.(e)
    }
  }

  const roleOptions = roles || defaultMemberRoles

  return (
    <FormDialog<MembersInviteInputs>
      {...rest}
      onClose={onClose}
      defaultValues={{
        role: 'member',
        ...defaultValues,
      }}
      initialFocusRef={fieldRef}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="emails"
          type="textarea"
          placeholder={placeholder}
          rules={{ required: requiredLabel }}
          ref={fieldRef}
        />
        <Field label="Role" name="role" type="select" options={roleOptions} />
      </FormLayout>
    </FormDialog>
  )
}
