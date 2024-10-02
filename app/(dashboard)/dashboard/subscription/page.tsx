"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, CreditCard, Lock, Wallet, X } from "lucide-react"

import { useUser } from "@/lib/hooks/use-user"
import { cn } from "@/lib/utils"

import { AppPricingRadio } from "@/components/app/app-pricing-radio"
import { Icons } from "@/components/shared/icons"
import { frequencies, tiers } from "@/components/shared/pricing-info"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GradualSpacing } from "@/components/ui/gradual-spacing"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const MotionCard = motion(Card)

export default function SubscriptionPage() {
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0])
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [showPromoInput, setShowPromoInput] = useState(false)
  const [showFreeTierFeatures, setShowFreeTierFeatures] = useState(false)
  const [isFreeTier, setIsFreeTier] = useState(true)
  const { user } = useUser()

  const selectedPlan =
    tiers.find((tier) => tier.id === selectedPlanId) || tiers[0]
  const basePrice = selectedPlan
    ? parseInt(selectedPlan.price[selectedFrequency.value].replace("$", ""))
    : 0
  const discount = selectedFrequency?.discount || 0
  const promoDiscount = appliedPromo ? basePrice * appliedPromo.discount : 0
  const frequencyDiscount = basePrice * (discount / 100)
  const finalPrice = basePrice - frequencyDiscount - promoDiscount
  const totalBillingCycles = { monthly: 1, biannually: 6, annually: 12 }
  const totalPrice = finalPrice * totalBillingCycles[selectedFrequency.value]

  const handlePlanSelection = (planId) => {
    const selectedPlan = tiers.find((tier) => tier.id === planId)
    if (selectedPlan.id === "tier-enterprise") {
      window.location.href = "mailto:aiden@fn03.xyz"
    } else {
      setSelectedPlanId(planId)
      setShowPaymentDetails(true)
      setIsFreeTier(false)
    }
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setAppliedPromo({ code: promoCode, discount: 0.2 })
    } else {
      alert("Invalid promo code")
    }
    setPromoCode("")
    setShowPromoInput(false)
  }

  const FreeTierCard = () => (
    <Card className="overflow-hidden rounded-3xl border border-border">
      <CardContent className="p-0">
        <Button
          onClick={() => setShowFreeTierFeatures(!showFreeTierFeatures)}
          variant="ghost"
          className="flex w-full items-center justify-between p-6 text-left hover:bg-muted"
        >
          <span className="text-lg font-semibold">
            You are currently on the Free Tier. Upgrade to unlock more features!
          </span>
          <ChevronDown
            className={cn(
              "ml-2 size-5 transition-transform duration-200",
              showFreeTierFeatures ? "rotate-180" : ""
            )}
          />
        </Button>
        <AnimatePresence>
          {showFreeTierFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden ring-1 ring-border"
            >
              <div className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  These are the features available on the Free Tier.
                </h3>
                <ul className="space-y-2">
                  {tiers
                    .find((tier) => tier.id === "tier-free")
                    .features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Icons.check className="mr-2 size-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )

  const PricingCard = ({ tier }) => (
    <div
      className={cn(
        tier.featured
          ? "bg-gradient-to-br from-background to-muted ring-border"
          : "ring-border",
        "rounded-3xl p-8 ring-1 xl:p-10"
      )}
    >
      <h3 id={tier.id} className="text-lg font-semibold leading-8 text-primary">
        {tier.name}
      </h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {tier.description}
      </p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl   font-bold tracking-tight text-primary">
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
        onClick={() => handlePlanSelection(tier.id)}
        className={cn(
          "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          tier.featured
            ? "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary"
            : "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-primary"
        )}
        disabled={tier.id === "tier-free" && isFreeTier}
      >
        {tier.id === "tier-free" && isFreeTier ? "Current Plan" : tier.cta}
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

  const PaymentMethodSection = () => (
    <MotionCard
      className="overflow-hidden rounded-3xl border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Payment method</h2>
        <RadioGroup defaultValue="credit-card">
          {[
            { value: "credit-card", label: "Credit Card", icon: CreditCard },
            { value: "crypto", label: "Crypto", icon: Wallet },
          ].map(({ value, label, icon: Icon }) => (
            <motion.div
              key={value}
              className="flex items-center rounded-lg p-3 transition-colors hover:bg-muted"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RadioGroupItem value={value} id={value} className="mr-3" />
              <Label htmlFor={value} className="flex items-center text-lg">
                <Icon className="mr-2" size={20} />
                {label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
        <motion.div
          className="mt-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg font-semibold">Card Information</p>
          <div className="flex items-center justify-between">
            <Input
              className="rounded-lg bg-white/5 p-3 text-base"
              placeholder="1234 1234 1234 1234"
            />
            <Lock className="ml-2" size={20} />
          </div>
          <div className="flex space-x-4">
            <Input
              className="rounded-lg bg-muted p-3 text-base"
              placeholder="MM / YY"
            />
            <Input
              className="rounded-lg bg-muted p-3 text-base"
              placeholder="CVC"
            />
          </div>
        </motion.div>
      </CardContent>
    </MotionCard>
  )

  const SummarySection = () => (
    <MotionCard
      className="sticky top-6 overflow-hidden rounded-3xl border border-border"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-lg">
            <span>{selectedPlan.name}</span>
            <span>${basePrice}</span>
          </div>
          <div
            className={`flex justify-between text-lg ${
              discount > 0 ? "text-green-500 dark:text-green-400" : ""
            }`}
          >
            <span>{selectedFrequency.label} billing</span>
            <span>
              {discount > 0 ? `-$${frequencyDiscount.toFixed(2)}` : "$0.00"}
            </span>
          </div>
          {appliedPromo && (
            <div className="flex items-center justify-between text-lg text-green-500 dark:text-green-400">
              <span>Promo: {appliedPromo.code}</span>
              <div className="flex items-center">
                <span>-${promoDiscount.toFixed(2)}</span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="ml-2 text-red-500 dark:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
          <div className="my-2 border-t border-border"></div>
          <div className="flex justify-between text-lg">
            <span>Subtotal ({selectedFrequency.label.toLowerCase()})</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
          {selectedFrequency.value !== "monthly" && (
            <div className="flex justify-between text-lg text-muted-foreground">
              <span>
                Billed every {totalBillingCycles[selectedFrequency.value]}{" "}
                months
              </span>
              <span>x{totalBillingCycles[selectedFrequency.value]}</span>
            </div>
          )}
          <div className="my-2 border-t border-border"></div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total due today</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        {!appliedPromo && (
          <div className="mt-4">
            <motion.div
              className="flex cursor-pointer items-center text-lg text-green-500 dark:text-green-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPromoInput(!showPromoInput)}
            >
              Apply promo code{" "}
              <ChevronDown
                className={`ml-2 transition-transform duration-300 ${
                  showPromoInput ? "rotate-180" : ""
                }`}
                size={18}
              />
            </motion.div>
            <AnimatePresence>
              {showPromoInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 flex items-center space-x-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="grow"
                    />
                    <Button
                      onClick={applyPromoCode}
                      className="whitespace-nowrap"
                    >
                      Apply
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="mt-6 w-full rounded-lg bg-primary py-4 text-lg text-primary-foreground transition-colors hover:bg-primary/90">
            Pay & Subscribe
          </Button>
        </motion.div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          By clicking "Pay & Subscribe", you agree to be charged for the
          subscription plan and comply with our Terms of Service. You can cancel
          at any time, effective at the end of the billing period. There are no
          refunds or credits for partial days, months or years if you cancel
          your subscription.
        </p>
      </CardContent>
    </MotionCard>
  )

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
              <PricingCard key={tier.id} tier={tier} />
            ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="m-4 flex flex-col justify-between rounded-3xl p-6 lg:flex-row">
      <div className="w-full space-y-6 lg:w-2/3 lg:pr-8">
        <MotionCard
          className="overflow-hidden rounded-3xl border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardContent className="flex items-center justify-between p-4">
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
            <Button
              variant="outline"
              onClick={() => setShowPaymentDetails(false)}
            >
              Change Plan
            </Button>
          </CardContent>
        </MotionCard>

        <MotionCard
          className="overflow-hidden rounded-3xl border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardContent className="p-6">
            <h2 className="mb-4 text-2xl font-bold">Billing cycle</h2>
            <RadioGroup
              value={selectedFrequency.value}
              onValueChange={(value) =>
                setSelectedFrequency(frequencies.find((f) => f.value === value))
              }
            >
              {frequencies.map((frequency) => (
                <motion.div
                  key={frequency.value}
                  className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
                    selectedFrequency.value === frequency.value
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <RadioGroupItem
                      value={frequency.value}
                      id={frequency.value}
                      className="mr-3"
                    />
                    <Label
                      htmlFor={frequency.value}
                      className="flex items-center text-lg"
                    >
                      {frequency.label}
                      {frequency.discount && (
                        <span className="ml-2 rounded-full bg-green-500 px-2 py-1 text-xs text-black">
                          {frequency.discount}% off
                        </span>
                      )}
                    </Label>
                  </div>
                  <span className="text-lg">
                    {selectedPlan.price[frequency.value]}
                    {frequency.priceSuffix}
                  </span>
                </motion.div>
              ))}
            </RadioGroup>
          </CardContent>
        </MotionCard>

        <PaymentMethodSection />
      </div>

      <div className="mt-6 w-full lg:mt-0 lg:w-1/3">
        <SummarySection />
      </div>
    </Card>
  )
}
