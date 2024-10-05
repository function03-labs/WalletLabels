"use client"

import React, { useState } from "react"

import { useUser } from "@/lib/hooks/use-user"

import { AppPricingRadio } from "@/components/app/app-pricing-radio"
import { FreeTierCard } from "@/components/app/dashboard-free-tier-card"
import { PaymentMethodSection } from "@/components/app/dashboard-payment-method-section"
import { PricingCard } from "@/components/app/dashboard-pricing-card"
import { SummarySection } from "@/components/app/dashboard-summary-section"
import { frequencies, tiers } from "@/components/shared/pricing-info"
import { Card } from "@/components/ui/card"
import { GradualSpacing } from "@/components/ui/gradual-spacing"

import { Frequency, Tier } from "@/types/subscription"

export default function SubscriptionPage() {
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(
    frequencies[0]
  )
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [isFreeTier, setIsFreeTier] = useState(true)
  const { user } = useUser()

  const selectedPlan: Tier =
    tiers.find((tier) => tier.id === selectedPlanId) || tiers[0]
  const basePrice = selectedPlan
    ? parseInt(selectedPlan.price[selectedFrequency.value].replace("$", ""))
    : 0
  const discount = selectedFrequency?.discount || 0
  const frequencyDiscount = basePrice * (discount / 100)
  const finalPrice = basePrice - frequencyDiscount
  const totalBillingCycles = { monthly: 1, biannually: 6, annually: 12 }
  const totalPrice = finalPrice * totalBillingCycles[selectedFrequency.value]

  const handlePlanSelection = (planId: string) => {
    const selectedPlan = tiers.find((tier) => tier.id === planId)
    if (selectedPlan?.id === "tier-enterprise") {
      window.location.href = "mailto:aiden@fn03.xyz"
    } else {
      setSelectedPlanId(planId)
      setShowPaymentDetails(true)
      setIsFreeTier(false)
    }
  }

  if (!showPaymentDetails) {
    return (
      <Card className="container mt-4 grid items-center gap-5 rounded-3xl py-8">
        {isFreeTier && <FreeTierCard />}
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
          {tiers
            .filter((tier) => tier.id !== "tier-free")
            .map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                selectedFrequency={selectedFrequency}
                handlePlanSelection={handlePlanSelection}
                isFreeTier={isFreeTier}
              />
            ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="m-4 flex flex-col justify-between rounded-3xl p-6 lg:flex-row">
      <div className="w-full space-y-6 lg:w-2/3 lg:pr-8">
        <Card className="overflow-hidden rounded-3xl border border-border">
          <div className="flex items-center justify-between p-4">
            <div className="start-0 flex items-center justify-start">
              <div className="flex w-full flex-col items-start text-left">
                <GradualSpacing
                  className="font-display text-left text-3xl font-bold -tracking-widest md:text-5xl md:leading-[4rem]"
                  text={selectedPlan.name}
                />
                <p className="mt-1 text-left text-sm text-muted-foreground">
                  {selectedPlan.description}
                </p>
              </div>
            </div>
            <button
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setShowPaymentDetails(false)}
            >
              Change Plan
            </button>
          </div>
        </Card>

        <PaymentMethodSection />
      </div>

      <div className="mt-6 w-full lg:mt-0 lg:w-1/3">
        <SummarySection
          selectedPlan={selectedPlan}
          selectedFrequency={selectedFrequency}
          basePrice={basePrice}
          discount={discount}
          frequencyDiscount={frequencyDiscount}
          finalPrice={finalPrice}
          totalPrice={totalPrice}
          totalBillingCycles={totalBillingCycles}
        />
      </div>
    </Card>
  )
}
