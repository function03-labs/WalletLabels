"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { FrequencyType } from "types"

export function AppPricingRadio({
  frequencies,
}: {
  frequencies: FrequencyType[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selected = searchParams.get("option") || "monthly"

  return (
    <div className="mt-4 flex justify-center">
      <fieldset aria-label="Payment frequency">
        <RadioGroup
          defaultValue="monthly"
          className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
        >
          {frequencies.map((option) => (
            <div
              key={option.value}
              className={cn(
                option.value === selected
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground",
                "cursor-pointer rounded-full px-2.5 py-1"
              )}
            >
              <RadioGroupItem
                id={option.value}
                value={option.value}
                className="hidden"
                onClick={() => router.push(`?option=${option.value}`)}
              />
              <label htmlFor={option.value} className="cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  )
}
