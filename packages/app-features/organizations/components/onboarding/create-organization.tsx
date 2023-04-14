import { FormEvent, useRef } from 'react'
import slug from 'slug'
import { InputLeftElement, Text } from '@chakra-ui/react'
import { useTenancy } from '@saas-ui-pro/react'
import {
  Field,
  FormLayout,
  UseFormReturn,
  useStepperContext,
} from '@saas-ui/react'

import * as z from 'zod'

import { OnboardingStep } from './onboarding-step'
import { useMutation } from '@tanstack/react-query'
import { createOrganization } from '@api/client'

const schema = z.object({
  name: z.string().min(2, 'Too short').max(25, 'Too long').describe('Name'),
  slug: z.string(),
})

type FormInput = z.infer<typeof schema>

export const CreateOrganizationStep = () => {
  const stepper = useStepperContext()
  const tenancy = useTenancy()

  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
  })

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Create a new organization"
      description="Saas UI is multi-tenant and supports organization workspaces with multiple teams."
      defaultValues={{ name: '', slug: '' }}
      onSubmit={(data) => {
        return mutateAsync({ name: data.name }).then((result) => {
          if (result.createOrganization?.slug) {
            tenancy.setTenant(result.createOrganization.slug)
            stepper.nextStep()
          }
        })
      }}
      submitLabel="Create organization"
    >
      <FormLayout>
        <Field
          name="name"
          label="Organization name"
          autoFocus
          rules={{ required: true }}
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
            <InputLeftElement bg="transparent" width="auto" ps="3">
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
