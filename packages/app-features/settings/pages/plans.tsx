import { useBilling } from '@saas-ui-pro/billing'

import { SettingsPage } from '@ui/lib'
import {
  PricingPlan,
  PricingTable,
} from '@app/features/billing/components/pricing-table'
import { useWorkspace } from '@app/features/core/hooks/use-workspace'

import { plans, features } from '@app/config'
import { useRouter } from '@app/nextjs'

export function PlansPage() {
  const slug = useWorkspace()
  const { push } = useRouter()

  const { planId, currentPlan } = useBilling()

  const onUpgrade = (plan: PricingPlan) => {
    push(`${plan.url}?checkout[custom][organization_slug]=${slug}`)
  }

  return (
    <SettingsPage
      title="Billing Plans"
      description={`You are currently on the ${currentPlan?.name} plan.`}
    >
      <PricingTable
        currentPlan={planId}
        plans={plans}
        features={features}
        onUpgrade={onUpgrade}
      />
    </SettingsPage>
  )
}
