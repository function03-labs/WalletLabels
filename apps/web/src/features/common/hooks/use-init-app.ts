import * as React from 'react'

import { parseISO } from 'date-fns'

import { useAuth } from '@saas-ui/auth'

import { BillingStatus } from '@saas-ui-pro/billing'
import { plans } from '@app/config'

import { useFeatures } from '@saas-ui-pro/feature-flags'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser, getOrganization, getSubscription } from '@api/client'
import { useWorkspace } from './use-workspace'

/**
 * Use this hook to load all required data for the app to function.
 * Like user data, billing subscription, feature flags, etc.
 **/
export const useInitApp = () => {
  const { isLoading, isAuthenticated, isLoggingIn } = useAuth()

  /**
   * Get the workspace (organization slug), from the query params
   * You could persist the active workspace in the user profile and retrieve it from `currentUser`.
   */
  const slug = useWorkspace()

  /**
   * The features context
   */
  const features = useFeatures()

  /**
   * Load current user and tenant data
   */
  const { data: { currentUser } = {}, isFetched: currentUserIsFetched } =
    useQuery({
      queryKey: ['CurrentUser'],
      queryFn: getCurrentUser,
      enabled: isAuthenticated,
    })

  const { data: { organization } = {}, isFetched: organizationIsFetched } =
    useQuery({
      queryKey: [
        'Organization',
        {
          slug,
        },
      ] as const,
      queryFn: ({ queryKey }) => getOrganization(queryKey[1]),
      enabled: isAuthenticated && !!slug,
    })

  const { data: { subscription } = {}, isFetched: subscriptionIsFetched } =
    useQuery({
      queryKey: [
        'Subscription',
        {
          slug,
        },
      ] as const,
      queryFn: ({ queryKey }) => getSubscription(queryKey[1]),
      enabled: isAuthenticated && !!slug,
    })

  const billing = React.useMemo(() => {
    return {
      plans: plans,
      status: subscription?.status as BillingStatus,
      planId: subscription?.plan,
      startedAt: subscription && parseISO(subscription.startedAt),
      trialEndsAt: subscription && parseISO(subscription.trialEndsAt),
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
