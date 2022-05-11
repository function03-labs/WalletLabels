import { Section, useTenant } from '@saas-ui/pro'
import { useGetOrganizationQuery } from '@app/graphql'

import { Stack, Text } from '@chakra-ui/react'

import format from 'date-fns/format'

import {
  Button,
  Card,
  CardBody,
  Field,
  Form,
  FormLayout,
  SubmitButton,
} from '@saas-ui/react'
import { SettingsPage } from '@modules/core/components/settings-page'
import { Link } from '@modules/core/components/link'

function BillingPlan({ organization }: any) {
  const tenant = useTenant()

  const plan = 'Bootstrap'
  const isTrial = true
  const trialEnds = format(new Date(), 'PPP')

  return (
    <Section
      title="Billing plan"
      description="Update your billing plan."
      isAnnotated
    >
      <Card>
        <CardBody>
          <Stack alignItems="flex-start">
            <Text>
              You are currently on the <strong>{plan}</strong> plan.
            </Text>

            {isTrial && <Text>Your trial ends {trialEnds}.</Text>}

            <Button
              label="View plans and upgrade"
              as={Link}
              href={`/app/${tenant}/settings/plans`}
            />
          </Stack>
        </CardBody>
      </Card>
    </Section>
  )
}

function BillingEmail({ organization }: any) {
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

function BillingInvoices({ organization }: any) {
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
      <BillingPlan organization={organization} />
      <BillingEmail organization={organization} />
      <BillingInvoices organization={organization} />
    </SettingsPage>
  )
}
