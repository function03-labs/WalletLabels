"use client"

import React from "react"

import { cn } from "@/lib/utils"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AppPricingRadioProps {
  frequencies: Array<{
    value: string
    label: string
    priceSuffix: string
    discount?: number
  }>
  selectedFrequency: {
    value: string
    label: string
    priceSuffix: string
    discount?: number
  }
  onFrequencyChange: (frequency: {
    value: string
    label: string
    priceSuffix: string
    discount?: number
  }) => void
}

export function AppPricingRadio({
  frequencies,
  selectedFrequency,
  onFrequencyChange,
}: AppPricingRadioProps) {
  return (
    <div className="flex justify-center">
      <RadioGroup
        value={selectedFrequency.value}
        onValueChange={(value) => {
          const frequency = frequencies.find((f) => f.value === value)
          if (frequency) onFrequencyChange(frequency)
        }}
        className="inline-flex rounded-full bg-secondary p-1 text-secondary-foreground"
      >
        {frequencies.map((option) => (
          <div key={option.value} className="relative">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="peer sr-only"
            />
            <label
              htmlFor={option.value}
              className={cn(
                "flex cursor-pointer select-none items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:bg-primary/10",
                "peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              )}
            >
              {option.label}
              {option.discount && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-7 rotate-12 items-center justify-center rounded-full bg-green-700 px-1 text-[10px] font-bold text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-110">
                  -{option.discount}%
                </span>
              )}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
