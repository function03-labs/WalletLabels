"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { useUser } from "@/lib/hooks/use-user"

import { AppPricingRadio } from "@/components/app/app-pricing-radio"
import { FreeTierCard } from "@/components/app/dashboard-free-tier-card"
import { PricingCard } from "@/components/app/dashboard-pricing-card"
import { PricingLoading } from "@/components/app/pricing-loading"
import { SubscriptionActions } from "@/components/app/subscription-actions"
import { frequencies } from "@/components/shared/pricing-info"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import type { Frequency, Tier } from "@/types/pricing"

interface SubscriptionClientProps {
  initialData: {
    tiers: Tier[]
  }
}

export function SubscriptionClient({ initialData }: SubscriptionClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(
    frequencies[0]
  )
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const router = useRouter()
  const { user: tempUser } = useUser()

  const user = tempUser?.user
  const subscription = tempUser?.subscription

  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null)
  const [currentFrequency, setCurrentFrequency] = useState<Frequency>(
    frequencies[0]
  )

  const currentTier = initialData.tiers.find((tier) =>
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handlePlanSelection = async (planId: string) => {
    setLoadingPlanId(planId)
    try {
      if (!user?.email) {
        toast.error("Please add an email address to your profile before subscribing")
        router.push("/dashboard/profile")
        return
      }

      const selectedPlan = initialData.tiers.find((tier) => tier.id === planId)

      if (selectedPlan?.id === "tier-enterprise") {
        window.location.href = "mailto:aiden@fn03.xyz"
        return
      }

      if (!selectedPlan?.lemonSqueezy?.variants) {
        toast.error("Invalid plan selected. Please try again.")
        return
      }

      const variant =
        selectedPlan.lemonSqueezy.variants[
          selectedFrequency.value as keyof typeof selectedPlan.lemonSqueezy.variants
        ]

      const response = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: variant?.id, embed: false }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout")
      }
      
      if (!data.url) {
        throw new Error("No checkout URL received")
      }

      window.location.href = data.url
    } catch (error) {
      console.error("Error creating checkout:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create checkout. Please try again later.")
    } finally {
      setLoadingPlanId(null)
    }
  }

  if (isLoading) {
    return <PricingLoading />
  }

  const paidTiers = initialData.tiers.filter(
    (tier) => tier.id !== "tier-free-plan"
  )

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
          {paidTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              selectedFrequency={selectedFrequency}
              handlePlanSelection={handlePlanSelection}
              isCurrentPlan={false}
              isFreeTier={true}
              loadingPlanId={loadingPlanId}
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
            {paidTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                selectedFrequency={selectedFrequency}
                handlePlanSelection={handlePlanSelection}
                isCurrentPlan={
                  tier.planIds?.includes(currentPlanId || 0) ?? false
                }
                isFreeTier={false}
                loadingPlanId={loadingPlanId}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mx-auto w-full max-w-3xl space-y-8">
          {/* Rest of the existing subscription view code remains the same */}
        </div>
      )}
    </Card>
  )
}
