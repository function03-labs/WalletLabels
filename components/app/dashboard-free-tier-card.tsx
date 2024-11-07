import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { tiers } from "@/components/shared/pricing-info"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const FreeTierCard: React.FC = () => {
  const [showFreeTierFeatures, setShowFreeTierFeatures] = useState(false)

  return (
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
                    ?.features.map((feature, index) => (
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
}
