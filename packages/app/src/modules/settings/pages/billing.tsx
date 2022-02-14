import { useRouter } from 'next/router'
// import UpgradeButton from '@/components/upgrade'
import { useGetOrganizationQuery } from '@app/graphql'

import { Page, Section } from '@saas-ui/pro'
import { Card, CardBody } from '@saas-ui/react'

function OrganizationBilling({ project }: any) {
  return (
    <Section title="Billing" annotated>
      <Card>
        <CardBody>
          {!project?.paidPlan ? null : ( // <UpgradeButton projectId={project?.id} />
            <button onClick={() => null}>Manage billing</button>
          )}
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
    <Page
      isLoading={isLoading}
      variant="settings"
      title="Billing"
      description="Manage your billing information and invoices"
    >
      <OrganizationBilling organization={organization} />
    </Page>
  )
}
