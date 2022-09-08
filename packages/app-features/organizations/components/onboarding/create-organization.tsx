import { FormEvent, useRef, useState } from 'react'
import slug from 'slug'
import { InputLeftElement, Text } from '@chakra-ui/react'
import { useTenancy } from '@saas-ui/pro'
import {
  Field,
  FormLayout,
  UseFormReturn,
  useStepperContext,
  WatchField,
} from '@saas-ui/react'

import { useCreateOrganizationMutation } from '@app/graphql'

import { OnboardingStep } from './onboarding-step'

type FormInput = {
  name: string
  slug: string
}

export const CreateOrganizationStep = () => {
  const stepper = useStepperContext()
  const tenancy = useTenancy()

  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { mutateAsync: createOrganization } = useCreateOrganizationMutation()

  return (
    <OnboardingStep<FormInput>
      formRef={formRef}
      title="Create a new organization"
      description="Saas UI is multi-tenant and supports organization workspaces with multiple teams."
      defaultValues={{ name: '', slug: '' }}
      onSubmit={(data) => {
        return createOrganization({ name: data.name }).then((result) => {
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
