import * as React from 'react'

import { Section, useTenant } from '@saas-ui/pro'
import { useGetOrganizationQuery } from '@app/graphql'

import { Stack, Text } from '@chakra-ui/react'

import {
  Card,
  CardBody,
  Field,
  Form,
  FormLayout,
  SubmitButton,
} from '@saas-ui/react'
import { SettingsPage } from '@app/features/core/components/settings-page'
import { Button } from '@app/features/core/components/button'
import { usePath } from '@app/features/core/hooks/use-path'

import { useBilling } from '@saas-ui/billing'

import { FormattedDate } from '@app/i18n'

function BillingPlan() {
  const { isTrialing, isTrialExpired, trialEndsAt, currentPlan } = useBilling()

  return (
    <Section
      title="Billing plan"
      description="Update your billing plan."
      isAnnotated
    >
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

            <Button
              label="View plans and upgrade"
              href={usePath('/settings/plans')}
            />
          </Stack>
        </CardBody>
      </Card>
    </Section>
  )
}

function BillingEmail() {
  return (
    <Section
      title="Billing email"
      description="Send invoices to an alternative address."
      isAnnotated
    >
      <Card>
        <CardBody>
          <Form onSubmit={() => null}>
            <FormLayout>
              <Field name="billing.email" label="Email address" type="email" />
              <SubmitButton label="Update" />
            </FormLayout>
          </Form>
        </CardBody>
      </Card>
    </Section>
  )
}

function BillingInvoices() {
  return (
    <Section
      title="Invoices"
      description="Invoices are sent on the first of every month."
      isAnnotated
    >
      <Card>
        <CardBody>
          <Text color="muted">No invoices received yet.</Text>
        </CardBody>
      </Card>
    </Section>
  )
}

export function BillingPage() {
  const tenant = useTenant()

  const { data, isLoading, error } = useGetOrganizationQuery({
    slug: tenant,
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
