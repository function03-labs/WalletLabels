"use client"

import React, { useState } from "react"
import { Radio, RadioGroup } from "@headlessui/react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"

/* export function generateMetadata() {
  return {
    title: "Pricing",
    description:
      "Get started with our free plan or upgrade to a paid plan for more features.",
  }
} */

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "biannually", label: "Biannually", priceSuffix: "/6 months" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
]

const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: "$15", biannually: "$50", annually: "$144" },
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: { monthly: "$30", biannually: "$50", annually: "$288" },
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: "Custom",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
    featured: true,
    cta: "Contact sales",
  },
]

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Wallet Labels is an open-source project, and we are proud to share our
          code
        </p>
      </div>
      <div className="mt-16 flex justify-center">
        <fieldset aria-label="Payment frequency">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            {frequencies.map((option) => (
              <Radio
                key={option.value}
                value={option}
                className={({ checked }: { checked: boolean }) =>
                  cn(
                    checked ? "bg-indigo-600 text-white" : "text-gray-500",
                    "cursor-pointer rounded-full px-2.5 py-1"
                  )
                }
              >
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      </div>
      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured ? "bg-gray-900 ring-gray-900" : "ring-gray-200",
              "rounded-3xl p-8 ring-1 xl:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={cn(
                tier.featured ? "text-white" : "text-gray-900",
                "text-lg font-semibold leading-8"
              )}
            >
              {tier.name}
            </h3>
            <p
              className={cn(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-4 text-sm leading-6"
              )}
            >
              {tier.description}
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span
                className={cn(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-4xl font-bold tracking-tight"
                )}
              >
                {typeof tier.price === "string"
                  ? tier.price
                  : tier.price[frequency.value as keyof typeof tier.price]}
              </span>
              {typeof tier.price !== "string" ? (
                <span
                  className={cn(
                    tier.featured ? "text-gray-300" : "text-gray-600",
                    "text-sm font-semibold leading-6"
                  )}
                >
                  {frequency.priceSuffix}
                </span>
              ) : null}
            </p>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={cn(
                tier.featured
                  ? "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                  : "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600",
                "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              )}
            >
              {tier.cta}
            </a>
            <ul
              role="list"
              className={cn(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Icons.check
                    className={cn(
                      tier.featured ? "text-white" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
