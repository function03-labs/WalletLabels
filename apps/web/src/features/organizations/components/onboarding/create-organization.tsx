import { FormEvent, useRef } from 'react'
import slug from 'slug'
import { InputLeftElement, Text } from '@chakra-ui/react'
import {
  Field,
  FormLayout,
  UseFormReturn,
  useSnackbar,
  useStepperContext,
} from '@saas-ui/react'
import * as z from 'zod'

import { OnboardingStep } from './onboarding-step'
import { useMutation } from '@tanstack/react-query'
import { createOrganization } from '@api/client'
import { useSessionStorageValue } from '@react-hookz/web'

const schema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your organization name.')
    .min(2, 'Please choose a name with at least 3 characters.')
    .max(50, 'The organization name should be no longer than 50 characters.')
    .describe('Name'),
  slug: z.string(),
})

type FormInput = z.infer<typeof schema>

export const CreateOrganizationStep = () => {
  const stepper = useStepperContext()
  const snackbar = useSnackbar()

  const workspace = useSessionStorageValue('getting-started.workspace')

  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
  })

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Create a new organization"
      description="Saas UI is multi-tenant and supports workspaces with multiple teams."
      defaultValues={{ name: '', slug: '' }}
      onSubmit={async (data) => {
        try {
          const result = await mutateAsync({ name: data.name })
          if (result.createOrganization?.slug) {
            workspace.set(result.createOrganization.slug)
            stepper.nextStep()
          }
        } catch {
          snackbar.error('Failed to create your organization.')
        }
      }}
      submitLabel="Create organization"
    >
      <FormLayout>
        <Field
          name="name"
          label="Organization name"
          autoFocus
          rules={{ required: true }}
          data-1p-ignore
          onChange={(e: FormEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            formRef.current?.setValue('name', value)
            formRef.current?.setValue('slug', slug(value))
          }}
        />
        <Field
          name="slug"
          label="Organization URL"
          paddingLeft="140px"
          leftAddon={
            <InputLeftElement
              bg="transparent"
              width="auto"
              ps="3"
              pointerEvents="none"
            >
              <Text color="muted">https://saas-ui.dev/</Text>
            </InputLeftElement>
          }
          rules={{
            required: true,
            pattern: /^[a-z0-9-]+$/,
          }}
        />
      </FormLayout>
    </OnboardingStep>
  )
}
