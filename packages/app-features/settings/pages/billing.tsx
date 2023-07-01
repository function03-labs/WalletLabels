import { z } from 'zod'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'

import { Card, CardBody, Stack, Text } from '@chakra-ui/react'

import { Field, FormLayout, SubmitButton } from '@saas-ui/react'
import { LinkButton, SettingsPage, Form } from '@ui/lib'

import { usePath } from '@app/features/core/hooks/use-path'

import { useBilling } from '@saas-ui-pro/billing'

import { FormattedDate } from '@app/i18n'
import { useQuery } from '@tanstack/react-query'
import { getOrganization } from '@api/client'
import { useWorkspace } from '@app/features/core/hooks/use-workspace'

function BillingPlan() {
  const { isTrialing, isTrialExpired, trialEndsAt, currentPlan } = useBilling()

  return (
    <Section variant="annotated">
      <SectionHeader
        title="Billing plan"
        description="Update your billing plan."
      />
      <SectionBody>
        <Card>
          <CardBody>
            <Stack alignItems="flex-start">
              {!isTrialExpired && (
                <Text>
                  You are currently on the <strong>{currentPlan?.name}</strong>{' '}
                  plan.
                </Text>
              )}

              {isTrialing && (
                <Text>
                  Your trial ends <FormattedDate value={trialEndsAt} />.
                </Text>
              )}

              {isTrialExpired && (
                <Text>
                  Your trial ended on <FormattedDate value={trialEndsAt} />.
                </Text>
              )}

              <LinkButton href={usePath('/settings/plans')}>
                View plans and upgrade
              </LinkButton>
            </Stack>
          </CardBody>
        </Card>
      </SectionBody>
    </Section>
  )
}

function BillingEmail() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Billing email"
        description="Send invoices to an alternative address."
      />
      <SectionBody>
        <Card>
          <CardBody>
            <Form
              schema={z.object({ billing: z.object({ email: z.string() }) })}
              onSubmit={() => null}
            >
              <FormLayout>
                <Field
                  name="billing.email"
                  label="Email address"
                  type="email"
                />
                <SubmitButton>Update</SubmitButton>
              </FormLayout>
            </Form>
          </CardBody>
        </Card>
      </SectionBody>
    </Section>
  )
}

function BillingInvoices() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Invoices"
        description="Invoices are sent on the first of every month."
      />
      <SectionBody>
        <Card>
          <CardBody>
            <Text color="muted">No invoices received yet.</Text>
          </CardBody>
        </Card>
      </SectionBody>
    </Section>
  )
}

export function BillingPage() {
  const slug = useWorkspace()

  const { data, isLoading, error } = useQuery({
    queryKey: ['Organization', slug],
    queryFn: () => getOrganization({ slug }),
    enabled: !!slug,
  })

  const organization = data?.organization

  return (
    <SettingsPage
      isLoading={isLoading}
      title="Billing"
      description="Manage your billing information and invoices"
    >
      <BillingPlan />
      <BillingEmail />
      <BillingInvoices />
    </SettingsPage>
  )
}
