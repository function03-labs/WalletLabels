import { useRouter } from 'next/router'
import { UpgradeButton, Section } from '@saas-ui/pro'
import { useGetOrganizationQuery } from '@app/graphql'

import { Text } from '@chakra-ui/react'

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

function BillingPlan({ organization }: any) {
  return (
    <Section
      title="Billing plan"
      description="Update your billing plan."
      isAnnotated
    >
      <Card>
        <CardBody>
          {!organization?.plan ? (
            <UpgradeButton />
          ) : (
            <Button label="Manage billing" onClick={() => null} />
          )}
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
  const router = useRouter()
  const { slug } = router.query

  const { data, isLoading, error } = useGetOrganizationQuery({
    slug: String(slug),
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
