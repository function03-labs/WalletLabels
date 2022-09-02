import * as React from 'react'

import { parseISO } from 'date-fns'

import { useAuth } from '@saas-ui/react'
import { useTenant } from '@saas-ui/pro'

import { BillingStatus } from '@saas-ui/billing'
import { plans } from '@app/config/billing'

import {
  useGetCurrentUserQuery,
  useGetOrganizationQuery,
  useGetSubscriptionQuery,
} from '@app/graphql'
import { useFeatures } from '@saas-ui/features'

/**
 * Use this hook to load all required data for the app to function.
 * Like user data, billing subscription, feature flags, etc.
 **/
export const useInitApp = () => {
  const { isLoading, isAuthenticated, isLoggingIn } = useAuth()

  /**
   * Getting the tenant (organization slug) from the TenancyProvider,
   * but you could store the active tenant in the user profile and retrieve it from `currentUser`.
   */
  const tenant = useTenant()

  /**
   * The features context
   */
  const features = useFeatures()

  // Load current user and tenant data
  const { data: { currentUser } = {}, isFetched: currentUserIsFetched } =
    useGetCurrentUserQuery(
      {},
      {
        enabled: isAuthenticated,
      },
    )

  const { data: { organization } = {}, isFetched: organizationIsFetched } =
    useGetOrganizationQuery(
      {
        slug: tenant,
      },
      {
        enabled: isAuthenticated,
      },
    )

  const { data: { subscription } = {}, isFetched: subscriptionIsFetched } =
    useGetSubscriptionQuery(
      {
        slug: tenant,
      },
      {
        enabled: isAuthenticated,
      },
    )

  const billing = React.useMemo(() => {
    return {
      plans: plans,
      status: subscription?.status as BillingStatus,
      planId: subscription?.plan,
      startedAt: subscription?.startedAt && parseISO(subscription?.startedAt),
      trialEndsAt:
        subscription?.trialEndsAt && parseISO(subscription?.trialEndsAt),
    }
  }, [subscription])

  React.useEffect(() => {
    if (currentUser && organization && subscription) {
      const member = organization.members.find(
        (member) => member.user.id === currentUser.id,
      )

      features.identify({
        id: currentUser.id,
        roles: member?.roles || [],
        plan: subscription.plan,
      })
    }
  }, [currentUser?.id, organization?.members, subscription?.plan])

  return {
    isInitializing:
      isLoading ||
      isLoggingIn ||
      (isAuthenticated &&
        !currentUserIsFetched &&
        !subscriptionIsFetched &&
        !organizationIsFetched),
    isAuthenticated,
    billing,
  }
}
