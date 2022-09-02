import * as React from 'react'

import { useTenant } from '@saas-ui/pro'
import { useNavigate } from '@saas-ui/router'
import { useBilling } from '@saas-ui/billing'

import { SettingsPage } from '@app/features/core/components/settings-page'
import {
  PricingPlan,
  PricingTable,
} from '@app/features/billing/components/pricing-table'

import { plans, features } from '@app/config/billing'

export function PlansPage() {
  const tenant = useTenant()
  const navigate = useNavigate()

  const { planId, currentPlan } = useBilling()

  const onUpgrade = (plan: PricingPlan) => {
    navigate(`/app/${tenant}/checkout?plan=${plan.id}`)
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
