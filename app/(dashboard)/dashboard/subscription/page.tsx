"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Plan, Subscription } from "@prisma/client"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { useTiers } from "@/lib/hooks/use-tiers"
import { useUser } from "@/lib/hooks/use-user"

import { AppPricingRadio } from "@/components/app/app-pricing-radio"
import { FreeTierCard } from "@/components/app/dashboard-free-tier-card"
import { PricingCard } from "@/components/app/dashboard-pricing-card"
import { SubscriptionActions } from "@/components/app/subscription-actions"
import { frequencies } from "@/components/shared/pricing-info"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import type { Frequency, Tier } from "@/types/pricing"

export default function SubscriptionPage() {
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(
    frequencies[0]
  )
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user: tempUser } = useUser()
  const { data: pricingData, isLoading: isPricingLoading } = useTiers<{
    tiers: Tier[]
  }>()

  const user = tempUser?.user
  const subscription = tempUser?.subscription

  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null)
  const [currentFrequency, setCurrentFrequency] = useState<Frequency>(
    frequencies[0]
  )

  const currentTier = pricingData?.tiers.find((tier: Tier) =>
    tier.planIds?.includes(subscription?.planId || 0)
  )

  useEffect(() => {
    if (subscription && currentTier?.lemonSqueezy?.variants) {
      setCurrentPlanId(subscription.planId)

      const frequency = frequencies.find(
        (freq) =>
          currentTier?.lemonSqueezy?.variants?.[
            freq.value as keyof typeof currentTier.lemonSqueezy.variants
          ]?.planId === subscription.planId
      )
      if (frequency) {
        setSelectedFrequency(frequency as Frequency)
        setCurrentFrequency(frequency as Frequency)
      }
    }
  }, [subscription, currentTier])

  const handlePlanSelection = async (planId: string) => {
    if (!user?.email) {
      toast.error(
        "Please add an email address to your profile before subscribing"
      )
      router.push("/dashboard/profile")
      return
    }

    const selectedPlan = pricingData?.tiers.find(
      (tier: Tier) => tier.id === planId
    )

    if (selectedPlan?.id === "tier-enterprise") {
      window.location.href = "mailto:aiden@fn03.xyz"
      return
    }

    if (selectedPlan?.lemonSqueezy?.variants) {
      try {
        setLoading(true)
        const variant =
          selectedPlan.lemonSqueezy?.variants[
            selectedFrequency.value as keyof typeof selectedPlan.lemonSqueezy.variants
          ]

        if (!variant?.id) {
          throw new Error("Invalid variant ID")
        }

        const response = await fetch("/api/payment/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId: variant.id, embed: false }),
        })

        const data: { url?: string } = await response.json()
        if (data.url) {
          window.location.href = data.url
        }
      } catch (error) {
        console.error("Error creating checkout:", error)
        toast.error("Failed to create checkout. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
  }

  const paidTiers =
    pricingData?.tiers.filter((tier: Tier) => tier.id !== "tier-free-plan") ||
    []
  console.log(paidTiers)
  if (isPricingLoading) {
    return <div>Loading...</div>
  }

  if (!subscription?.planId) {
    return (
      <Card className="container mt-4 grid items-center gap-5 rounded-3xl py-8">
        <FreeTierCard />
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Select the plan that best fits your needs
          </p>
        </div>
        <AppPricingRadio
          frequencies={frequencies}
          selectedFrequency={selectedFrequency}
          onFrequencyChange={setSelectedFrequency}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paidTiers.map((tier: Tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              selectedFrequency={selectedFrequency}
              handlePlanSelection={handlePlanSelection}
              isCurrentPlan={false}
              isFreeTier={true}
            />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="container mt-4 grid items-center gap-5 rounded-3xl py-8">
      {isChangingPlan ? (
        <>
          <div className="flex w-full justify-between">
            <Button
              variant="ghost"
              className="w-fit"
              onClick={() => setIsChangingPlan(false)}
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to subscription
            </Button>
          </div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              Change Your Plan
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Select a new plan to upgrade or downgrade your subscription
            </p>
          </div>
          <AppPricingRadio
            frequencies={frequencies}
            selectedFrequency={selectedFrequency}
            onFrequencyChange={setSelectedFrequency}
          />
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paidTiers.map((tier: Tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                selectedFrequency={selectedFrequency}
                handlePlanSelection={handlePlanSelection}
                isCurrentPlan={
                  tier.planIds?.includes(currentPlanId || 0) ?? false
                }
                isFreeTier={false}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              Your Subscription
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Manage your subscription and billing
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900/5 via-gray-800/20 to-black/20 p-8">
            <div className="bg-grid-white/10 absolute inset-0" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{currentTier?.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium text-muted-foreground">
                      {currentFrequency.label} billing
                    </p>
                    <span className="text-lg font-medium text-muted-foreground">
                      ·
                    </span>
                    <p className="text-lg font-medium text-muted-foreground">
                      ${subscription?.price} / {currentFrequency.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Plan Features</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {currentTier?.features.map(
                      (feature: string, index: React.Key) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-green-500" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsChangingPlan(true)}
                    className="bg-background/60 backdrop-blur-sm hover:bg-background/80"
                  >
                    Change Plan
                  </Button>
                  <SubscriptionActions
                    subscription={subscription}
                    urls={{
                      customer_portal: subscription.customerPortalUrl,
                      update_payment_method:
                        subscription.updatePaymentMethodUrl,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
