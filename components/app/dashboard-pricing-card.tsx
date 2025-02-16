import React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

import { Frequency, Tier } from "@/types/pricing"

interface PricingCardProps {
  tier: Tier
  selectedFrequency: Frequency
  handlePlanSelection: (planId: string) => void
  isCurrentPlan: boolean
  isFreeTier: boolean
  loadingPlanId?: string | null
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  selectedFrequency,
  handlePlanSelection,
  isCurrentPlan,
  isFreeTier,
  loadingPlanId,
}) => {
  const isLoading = loadingPlanId?.toString() === tier.id

  return (
    <div
      className={cn(
        "relative",
        tier.featured
          ? "bg-gradient-to-br from-background to-muted ring-border"
          : "ring-border",
        "rounded-3xl p-8 ring-1 xl:p-10",
        isCurrentPlan && "bg-primary/5 ring-primary"
      )}
    >
      {isCurrentPlan && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-sm text-primary-foreground">
          Current Plan
        </div>
      )}
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
      <Button
        onClick={() => {
          handlePlanSelection(tier.id)
        }}
        className={cn(
          "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          tier.featured
            ? "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary"
            : "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-primary"
        )}
        disabled={isLoading || isCurrentPlan}
        variant={isCurrentPlan ? "outline" : "default"}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        ) : isCurrentPlan ? (
          "Current Plan"
        ) : isFreeTier ? (
          tier.cta
        ) : (
          "Upgrade"
        )}
      </Button>
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
