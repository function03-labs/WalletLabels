"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { useTiers } from "@/lib/hooks/use-tiers"
import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const FreeTierCard: React.FC = () => {
  const [showFreeTierFeatures, setShowFreeTierFeatures] = useState(false)
  const { data } = useTiers()

  const freeTier = data?.tiers.find((tier) => tier.id === "tier-free")

  if (!freeTier) {
    return null
  }

  return (
    <Card
      className="overflow-hidden rounded-3xl border border-border"
      data-oid="8b2g3h3"
    >
      <CardContent className="p-0" data-oid="a_3gesu">
        <Button
          onClick={() => setShowFreeTierFeatures(!showFreeTierFeatures)}
          variant="ghost"
          className="flex w-full items-center justify-between p-6 text-left hover:bg-muted"
          data-oid="207kg3i"
        >
          <span className="text-lg font-semibold" data-oid="6p:kl0u">
            You are currently on the Free Tier. Upgrade to unlock more features!
          </span>
          <ChevronDown
            className={cn(
              "ml-2 size-5 transition-transform duration-200",
              showFreeTierFeatures ? "rotate-180" : ""
            )}
            data-oid="x-o1wp0"
          />
        </Button>
        <AnimatePresence data-oid="7nv9n0n">
          {showFreeTierFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden ring-1 ring-border"
              data-oid="zh_w6ak"
            >
              <div className="p-6" data-oid="u9.my38">
                <h3 className="mb-4 text-xl font-semibold" data-oid="ls:kurs">
                  These are the features available on the Free Tier.
                </h3>
                <ul className="space-y-2" data-oid="lx2n8hy">
                  {freeTier.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center"
                      data-oid=":yd2y93"
                    >
                      <Icons.check
                        className="mr-2 size-5 text-green-500"
                        data-oid="-dncl4c"
                      />

                      <span data-oid="6_94:p0">{feature}</span>
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
