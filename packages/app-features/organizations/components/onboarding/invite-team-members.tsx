import { useMutation } from '@tanstack/react-query'
import { useTenant } from '@saas-ui-pro/react'
import { Field, FormLayout, useStepperContext } from '@saas-ui/react'
import { inviteToOrganization } from '@api/client'
import { OnboardingStep } from './onboarding-step'

export const InviteTeamMembersStep = () => {
  const tenant = useTenant()

  const stepper = useStepperContext()

  const { mutateAsync: invite } = useMutation({
    mutationFn: inviteToOrganization,
  })

  return (
    <OnboardingStep
      title="Invite your team"
      description="Saas UI works better with your team."
      defaultValues={{ emails: '' }}
      onSubmit={(data) => {
        if (tenant) {
          return invite({
            organizationId: tenant,
            emails: data.emails.split(/,\s?/),
          }).then((result) => stepper.nextStep())
        }
      }}
      submitLabel="Continue"
    >
      <FormLayout>
        <Field
          name="emails"
          label="Email"
          placeholder="member@acme.co, member2@acme.co"
          type="textarea"
          autoFocus
        />
      </FormLayout>
    </OnboardingStep>
  )
}
