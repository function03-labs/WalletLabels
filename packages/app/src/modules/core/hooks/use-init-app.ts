import * as React from 'react'

import parseISO from 'date-fns/parseISO'

import { useAuth } from '@saas-ui/react'
import { useTenant } from '@saas-ui/pro'

import { BillingStatus } from '@saas-ui/billing'
import { plans } from '@app/config/billing'

import { useGetCurrentUserQuery, useGetSubscriptionQuery } from '@app/graphql'

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

  // Load current user and tenant data
  const currentUserQuery = useGetCurrentUserQuery(
    {},
    {
      enabled: isAuthenticated,
    },
  )

  const subscriptionQuery = useGetSubscriptionQuery(
    {
      slug: tenant,
    },
    {
      enabled: isAuthenticated,
    },
  )

  const billing = React.useMemo(() => {
    const subscription = subscriptionQuery.data?.subscription

    return {
      plans: plans,
      status: subscription?.status as BillingStatus,
      planId: subscription?.plan,
      startedAt: subscription?.startedAt && parseISO(subscription?.startedAt),
      trialEndsAt:
        subscription?.trialEndsAt && parseISO(subscription?.trialEndsAt),
    }
  }, [subscriptionQuery.data?.subscription])

  return {
    isInitializing:
      isLoading ||
      isLoggingIn ||
      (isAuthenticated &&
        !currentUserQuery.isFetched &&
        !subscriptionQuery.isFetched),
    isAuthenticated,
    billing,
  }
}
