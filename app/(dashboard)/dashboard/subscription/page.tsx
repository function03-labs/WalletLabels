"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { getCheckoutURL } from "@/lib/app/actions"
import { useUser } from "@/lib/hooks/use-user"

import { AppPricingRadio } from "@/components/app/app-pricing-radio"
import { FreeTierCard } from "@/components/app/dashboard-free-tier-card"
import { PricingCard } from "@/components/app/dashboard-pricing-card"
import { frequencies, tiers } from "@/components/shared/pricing-info"
import { Card } from "@/components/ui/card"

import { Frequency, Tier } from "@/types/subscription"

export default function SubscriptionPage() {
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(
    frequencies[0]
  )
  const [isFreeTier, setIsFreeTier] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  console.log("user", user)

  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null)

  useEffect(() => {
    if (user?.subscription) {
      setIsFreeTier(user.subscription.planId === 0)
      setCurrentPlanId(user.subscription.planId)
    }
  }, [user?.subscription])

  const handlePlanSelection = async (planId: string) => {
    if (!user?.email) {
      toast.error(
        "Please add an email address to your profile before subscribing"
      )
      router.push("/dashboard/profile")
      return
    }

    const selectedPlan = tiers.find((tier) => tier.id === planId)

    if (selectedPlan?.id === "tier-enterprise") {
      window.location.href = "mailto:aiden@fn03.xyz"
      return
    }

    if (selectedPlan?.lemonSqueezy?.variants) {
      try {
        setLoading(true)
        const variant =
          selectedPlan.lemonSqueezy.variants[selectedFrequency.value]
        const checkoutUrl = await getCheckoutURL(variant.id)
        if (checkoutUrl) {
          window.location.href = checkoutUrl
        }
      } catch (error) {
        console.error("Error creating checkout:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Card className="container mt-4 grid items-center gap-5 rounded-3xl py-8">
      {isFreeTier && <FreeTierCard />}
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
          {isFreeTier ? "Choose Your Plan" : "Manage Your Subscription"}
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {isFreeTier
            ? "Select the plan that best fits your needs"
            : "View your current plan or upgrade to a different tier"}
        </p>
      </div>
      <AppPricingRadio
        frequencies={frequencies}
        selectedFrequency={selectedFrequency}
        onFrequencyChange={setSelectedFrequency}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tiers
          .filter((tier) => tier.id !== "tier-free")
          .map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              selectedFrequency={selectedFrequency}
              handlePlanSelection={handlePlanSelection}
              isCurrentPlan={tier.planId === currentPlanId}
              isFreeTier={isFreeTier}
            />
          ))}
      </div>
    </Card>
  )
}
