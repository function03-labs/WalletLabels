import React from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, Wallet } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const MotionCard = motion(Card)

export const PaymentMethodSection: React.FC = () => (
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
