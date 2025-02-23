import React from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Frequency, Tier } from "@/types/subscription"

const MotionCard = motion(Card)

interface SummarySectionProps {
  selectedPlan: Tier
  selectedFrequency: Frequency
  basePrice: number
  discount: number
  frequencyDiscount: number
  finalPrice: number
  totalPrice: number
  totalBillingCycles: Record<string, number>
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  selectedPlan,
  selectedFrequency,
  basePrice,
  discount,
  frequencyDiscount,
  finalPrice,
  totalPrice,
  totalBillingCycles,
}) => (
  <MotionCard
    className="sticky top-6 overflow-hidden rounded-3xl border border-border"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    data-oid="pefl5mn"
  >
    <CardContent className="p-6" data-oid="re1rsak">
      <h2 className="mb-4 text-2xl font-bold" data-oid="4dwrwpb">
        Summary
      </h2>
      <div className="space-y-2" data-oid="g2lr120">
        <div className="flex justify-between text-lg" data-oid="ln44t-1">
          <span data-oid="x9._enw">{selectedPlan.name}</span>
          <span data-oid="phlrdwv">${basePrice}</span>
        </div>
        <div
          className={`flex justify-between text-lg ${
            discount > 0 ? "text-green-500 dark:text-green-400" : ""
          }`}
          data-oid="q5-4ar2"
        >
          <span data-oid="-errxdt">{selectedFrequency.label} billing</span>
          <span data-oid="evmekqb">
            {discount > 0 ? `-$${frequencyDiscount.toFixed(2)}` : "$0.00"}
          </span>
        </div>
        <div className="my-2 border-t border-border" data-oid="c0hzre1"></div>
        <div className="flex justify-between text-lg" data-oid="tqgidtj">
          <span data-oid="1d5.8sz">
            Subtotal ({selectedFrequency.label.toLowerCase()})
          </span>
          <span data-oid="k487u80">${finalPrice.toFixed(2)}</span>
        </div>
        {selectedFrequency.value !== "monthly" && (
          <div
            className="flex justify-between text-lg text-muted-foreground"
            data-oid="rr8m:nu"
          >
            <span data-oid="8d8tg05">
              Billed every {totalBillingCycles[selectedFrequency.value]} months
            </span>
            <span data-oid="z:m6:lv">
              x{totalBillingCycles[selectedFrequency.value]}
            </span>
          </div>
        )}
        <div className="my-2 border-t border-border" data-oid="cxkgxpn"></div>
        <div
          className="flex justify-between text-xl font-bold"
          data-oid="jg5hcaf"
        >
          <span data-oid="0ypp38_">Total due today</span>
          <span data-oid="pu20qae">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-oid="0_csmlu"
      >
        <Button
          className="mt-6 w-full rounded-lg bg-primary py-4 text-lg text-primary-foreground transition-colors hover:bg-primary/90"
          data-oid="vjrv28h"
        >
          Pay & Subscribe
        </Button>
      </motion.div>
      <p
        className="mt-6 text-xs leading-relaxed text-muted-foreground"
        data-oid="nojdy20"
      >
        By clicking "Pay & Subscribe", you agree to be charged for the
        subscription plan and comply with our Terms of Service. You can cancel
        at any time, effective at the end of the billing period. There are no
        refunds or credits for partial days, months or years if you cancel your
        subscription.
      </p>
    </CardContent>
  </MotionCard>
)
