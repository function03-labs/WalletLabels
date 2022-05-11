import * as React from 'react'

import { useTenant } from '@saas-ui/pro'

import { useGetOrganizationQuery } from '@app/graphql'

import { SettingsPage } from '@modules/core/components/settings-page'
import {
  PricingPlan,
  PricingTable,
} from '@modules/billing/components/pricing-table'

import { plans, features } from '@app/config/billing'
import { useNavigate } from '@saas-ui/router'

export function PlansPage() {
  const tenant = useTenant()
  const navigate = useNavigate()

  const { data, isLoading, error } = useGetOrganizationQuery({
    slug: tenant,
  })

  const organization = data?.organization

  const onUpgrade = (plan: PricingPlan) => {
    navigate(`/app/${tenant}/checkout?product=${plan.productId}`)
  }

  const currentPlan = React.useMemo(
    () => plans.find(({ id }) => organization?.plan === id),
    [organization?.plan],
  )

  return (
    <SettingsPage
      isLoading={isLoading}
      title="Billing Plans"
      description={`You are currently on the ${currentPlan?.name} plan.`}
    >
      <PricingTable
        currentPlan={organization?.plan}
        plans={plans}
        features={features}
        onUpgrade={onUpgrade}
      />
    </SettingsPage>
  )
}
