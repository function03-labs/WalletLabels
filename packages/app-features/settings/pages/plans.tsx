import { useTenant } from '@saas-ui-pro/react'
import { useBilling } from '@saas-ui-pro/billing'

import { SettingsPage } from '@ui/lib'
import {
  PricingPlan,
  PricingTable,
} from '@app/features/billing/components/pricing-table'

import { plans, features } from '@app/config'
import { useRouter } from 'next/router'

export function PlansPage() {
  const tenant = useTenant()
  const { push } = useRouter()

  const { planId, currentPlan } = useBilling()

  const onUpgrade = (plan: PricingPlan) => {
    push(`${plan.url}?checkout[custom][organization_slug]=${tenant}`)
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
