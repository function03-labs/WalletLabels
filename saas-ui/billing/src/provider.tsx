import React from 'react'

import { isAfter } from 'date-fns'

export type BillingStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export interface BillingPlan {
  id: string
  name: string
  period: 'monthly' | 'yearly' | string
  trialDays?: number
  features: Record<string, boolean | string | number>
  [key: string]: any
}

export interface BillingOptions {
  plans: BillingPlan[]
  planId?: string
  status?: BillingStatus
  startedAt?: Date
  trialEndsAt?: Date
}

interface BillingContextValue extends BillingOptions {
  isReady: boolean
  isTrialing: boolean
  isCanceled: boolean
  isTrialExpired?: boolean
  currentPlan?: BillingPlan
}

export const BillingContext = React.createContext<BillingContextValue | null>(
  null,
)

export interface BillingProviderProps {
  value: BillingOptions
  children: React.ReactNode
}

export const BillingProvider: React.FC<BillingProviderProps> = (props) => {
  const {
    children,
    value: { plans, planId, status, startedAt, trialEndsAt },
  } = props

  const context = React.useMemo(() => {
    const isTrialing = status === 'trialing'
    const isTrialExpired = trialEndsAt && isAfter(new Date(), trialEndsAt)

    const currentPlan = plans.find(({ id }: any) => planId === id)

    return {
      plans,
      isReady: true,
      isTrialing,
      isTrialExpired,
      isCanceled: status === 'canceled',
      planId,
      currentPlan,
      status,
      startedAt,
      trialEndsAt,
    }
  }, [plans, planId, status, trialEndsAt])

  return (
    <BillingContext.Provider value={context}>
      {children}
    </BillingContext.Provider>
  )
}

export const useBilling = () => {
  return React.useContext(BillingContext) as BillingContextValue
}

export const useIsTrialing = () => {
  const { status } = useBilling()

  return status === 'trialing'
}

export const useCurrentPlan = () => {
  const { currentPlan } = useBilling()
  return currentPlan
}
