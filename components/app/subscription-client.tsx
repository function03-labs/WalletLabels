"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { useToast } from "@/lib/hooks/use-toast"
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

import { SubscriptionLoading } from "./subscription-loading"

interface SubscriptionClientProps {
  initialData: {
    tiers: Tier[]
  }
}

export function SubscriptionClient({ initialData }: SubscriptionClientProps) {
  const { toast } = useToast()
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(
    frequencies[0]
  )
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const router = useRouter()
  const { user: tempUser, isLoading } = useUser()

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

  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)

  const handlePlanSelection = async (planId: string) => {
    setLoadingPlanId(planId)
    try {
      if (!user?.email) {
        toast({
          title:
            "Please add an email address to your profile before subscribing",
        })
        router.push("/dashboard/profile")
        return
      }

      const selectedPlan = initialData.tiers.find((tier) => tier.id === planId)

      if (selectedPlan?.id === "tier-enterprise") {
        window.location.href = "mailto:aiden@fn03.xyz"
        return
      }

      if (!selectedPlan?.lemonSqueezy?.variants) {
        toast({
          title: "Invalid plan selected",
          description: "Please try again.",
        })
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
      toast({
        title: "Failed to create checkout",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      })
    } finally {
      setLoadingPlanId(null)
    }
  }
  if (isLoading && !subscription) {
    return <PricingLoading isDashboard={true} data-oid="ixgwlyo" />
  } else if (isLoading && subscription) {
    return <SubscriptionLoading data-oid="g4gloi6" />
  }

  const paidTiers = initialData.tiers || []

  if (!subscription?.planId) {
    return (
      <Card
        className="container mt-4 grid items-center gap-5 rounded-3xl py-8"
        data-oid="o5c0g.4"
      >
        <FreeTierCard data-oid="mbi63mn" />
        <div
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          data-oid="kjjelv."
        >
          <h1
            className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl"
            data-oid="3yrib-9"
          >
            Choose Your Plan
          </h1>
          <p
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            data-oid="ld3h1pn"
          >
            Select the plan that best fits your needs
          </p>
        </div>
        <AppPricingRadio
          frequencies={frequencies}
          selectedFrequency={selectedFrequency}
          onFrequencyChange={setSelectedFrequency}
          data-oid="adl4pge"
        />

        <div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          data-oid="hk-az96"
        >
          {paidTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              selectedFrequency={selectedFrequency}
              handlePlanSelection={handlePlanSelection}
              isCurrentPlan={false}
              loadingPlanId={loadingPlanId}
              isFreeTier={true}
              data-oid="r7sf73r"
            />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="container mt-4 grid items-center gap-5 rounded-3xl py-8"
      data-oid="c4_pjai"
    >
      {isChangingPlan ? (
        <>
          <div className="flex w-full justify-between" data-oid="f-lnf-6">
            <Button
              variant="ghost"
              className="w-fit"
              onClick={() => setIsChangingPlan(false)}
              data-oid="o2qa:bv"
            >
              <ArrowLeft className="mr-2 size-4" data-oid="bykmmy8" />
              Back to subscription
            </Button>
          </div>
          <div
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
            data-oid="xo.0ry5"
          >
            <h1
              className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl"
              data-oid="gftitsv"
            >
              Change Your Plan
            </h1>
            <p
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
              data-oid="x5o2maf"
            >
              Select a new plan to upgrade or downgrade your subscription
            </p>
          </div>
          <AppPricingRadio
            frequencies={frequencies}
            selectedFrequency={selectedFrequency}
            onFrequencyChange={setSelectedFrequency}
            data-oid="6x:ys8k"
          />

          <div
            className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            data-oid="6l67rc5"
          >
            {paidTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                selectedFrequency={selectedFrequency}
                handlePlanSelection={handlePlanSelection}
                isCurrentPlan={
                  tier.planIds?.includes(currentPlanId || 0) ?? false
                }
                loadingPlanId={loadingPlanId}
                isFreeTier={false}
                data-oid="mvetbeo"
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mx-auto w-full max-w-3xl space-y-8" data-oid="0fjgbke">
          <div
            className="flex flex-col items-center justify-center gap-4 text-center"
            data-oid="_vpapmh"
          >
            <h1
              className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl"
              data-oid=".y76z79"
            >
              Your Subscription
            </h1>
            <p
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
              data-oid="30g0v-s"
            >
              Manage your subscription and billing
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900/5 via-gray-800/20 to-black/20 p-8"
            data-oid="o34b02q"
          >
            <div
              className="bg-grid-white/10 absolute inset-0"
              data-oid="h6zgl6t"
            />

            <div className="relative" data-oid="we11udd">
              <div
                className="flex items-center justify-between"
                data-oid="9irhthr"
              >
                <div className="space-y-2" data-oid="jreejrb">
                  <h2 className="text-3xl font-bold" data-oid="2tr70s8">
                    {currentTier?.name}
                  </h2>
                  <div className="flex items-center gap-2" data-oid="4clz8tf">
                    <p
                      className="text-lg font-medium text-muted-foreground"
                      data-oid="r4lk7tg"
                    >
                      {currentFrequency.label} billing
                    </p>
                    <span
                      className="text-lg font-medium text-muted-foreground"
                      data-oid="ofvitj9"
                    >
                      ·
                    </span>
                    <p
                      className="text-lg font-medium text-muted-foreground"
                      data-oid="hh2puf."
                    >
                      ${subscription?.price} / {currentFrequency.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4" data-oid="n:pu..t">
                  <div
                    className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1"
                    data-oid="gcveiy."
                  >
                    <CheckCircle2
                      className="size-4 text-green-500"
                      data-oid="w8swote"
                    />

                    <span
                      className="text-sm font-medium text-green-500"
                      data-oid="xohh0k9"
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6" data-oid="mkd_68l">
                <div className="space-y-2" data-oid="b04pm00">
                  <h3 className="text-lg font-semibold" data-oid="aw3.bwj">
                    Plan Features
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2" data-oid="2u61hp1">
                    {currentTier?.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2"
                        data-oid=".vjvp.e"
                      >
                        <CheckCircle2
                          className="size-4 text-green-500"
                          data-oid=".acl.6z"
                        />

                        <span
                          className="text-muted-foreground"
                          data-oid="5pmql1j"
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="flex items-center justify-between border-t pt-6"
                  data-oid="gf49hh0"
                >
                  <Button
                    variant="outline"
                    onClick={() => setIsChangingPlan(true)}
                    className="bg-background/60 backdrop-blur-sm hover:bg-background/80"
                    data-oid="-d4s739"
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
                    data-oid="rf7f7jv"
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
