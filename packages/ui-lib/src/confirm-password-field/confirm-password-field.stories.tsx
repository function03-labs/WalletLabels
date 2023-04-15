import { FormLayout, PasswordInputField, SubmitButton } from '@saas-ui/forms'
import { Form } from '@saas-ui/forms/zod'
import * as z from 'zod'
import { Meta } from '@storybook/react'

import { ConfirmPasswordField, ConfirmPasswordProps } from './'

export default {
  title: 'Components/ConfirmPasswordField',
  component: ConfirmPasswordField,
} as Meta

const schema = z.object({
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
})

export const Default = {
  render: (args: ConfirmPasswordProps) => (
    <Form schema={schema} onSubmit={async () => null}>
      <FormLayout>
        <PasswordInputField name="password" label="Password" />
        <ConfirmPasswordField
          name="confirmPassword"
          label="Confirm password"
          {...args}
        />
        <SubmitButton />
      </FormLayout>
    </Form>
  ),
  args: {},
}
