import React from "react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

import { Frequency, Tier } from "@/types/subscription"

interface PricingCardProps {
  tier: Tier
  selectedFrequency: Frequency
  handlePlanSelection: (planId: string) => void
  isCurrentPlan: boolean
  isFreeTier: boolean
}

export function PricingCard({
  tier,
  selectedFrequency,
  handlePlanSelection,
  isCurrentPlan,
  isFreeTier,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6",
        isCurrentPlan && "border-primary bg-primary/5"
      )}
    >
      <h3 id={tier.id} className="text-lg font-semibold leading-8 text-primary">
        {tier.name}
      </h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {tier.description}
      </p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-primary">
          {typeof tier.price === "string"
            ? tier.price
            : tier.price[selectedFrequency.value]}
        </span>
        {typeof tier.price !== "string" && (
          <span className="text-sm font-semibold leading-6 text-muted-foreground">
            {selectedFrequency.priceSuffix}
          </span>
        )}
      </p>
      <div className="mt-6">
        {isCurrentPlan ? (
          <Button disabled className="w-full" variant="outline">
            Current Plan
          </Button>
        ) : (
          <Button
            onClick={() => handlePlanSelection(tier.id)}
            className="w-full"
          >
            {isFreeTier ? tier.cta : "Upgrade"}
          </Button>
        )}
      </div>
      {isCurrentPlan && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
          Current Plan
        </div>
      )}
      <ul
        role="list"
        className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground xl:mt-10"
      >
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <Icons.check
              className="h-6 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
