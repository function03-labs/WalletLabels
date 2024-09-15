"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"

import { AppPricingRadio } from "@/components/app/app-pricing-radio"
import { Icons } from "@/components/shared/icons"

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  {
    value: "biannually",
    label: "Biannually",
    priceSuffix: "/month",
    discount: 20,
  },
  { value: "annually", label: "Annually", priceSuffix: "/month", discount: 30 },
]

const tiers = [
  {
    name: "Free Tier",
    id: "tier-free",
    href: "/dashboard",
    price: { monthly: "$0", biannually: "$0", annually: "$0" },
    description:
      "Get started with our free plan, suitable for small projects or testing purposes.",
    features: [
      "100,000 API calls per month",
      "Up to 5 API calls per second",
      "Free API key",
    ],
    featured: false,
    cta: "Get started",
  },
  {
    name: "Basic Plan",
    id: "tier-basic",
    href: "mailto:aiden@fn03.xyz",
    price: { monthly: "$250", biannually: "$200", annually: "$175" },
    description:
      "Ideal for small businesses looking to scale with moderate API needs.",
    features: [
      "300,000 API calls per month",
      "Up to 15 API calls per second",
      "3 API keys",
      "Custom support",
      "Access to basic performance analytics",
    ],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Pro Plan",
    id: "tier-pro",
    href: "mailto:aiden@fn03.xyz",
    price: { monthly: "$500", biannually: "$400", annually: "$375" },
    description: "Designed for growing businesses with higher API demand.",
    features: [
      "800,000 API calls per month",
      "Up to 25 API calls per second",
      "5 API keys",
      "Custom support",
      "Priority bug fixes",
      "Feature requests",
    ],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Enterprise Plans",
    id: "tier-enterprise",
    href: "mailto:aiden@fn03.xyz",
    price: "Contact us",
    description:
      "Enterprise-level support with high scalability and tailored services.",
    features: [
      "3+ million API calls per month",
      "Up to 50 API calls per second",
      "Up to 25 API keys",
      "Tailored solutions for large enterprises",
      "GCP/S3 Dataset access",
      "Enhanced support",
      "Negotiable API keys and calls based on need",
    ],
    featured: true,
    cta: "Contact us",
  },
]

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-center text-3xl font-bold leading-tight dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Pricing
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Wallet Labels is an open-source project, and we are proud to share our
          code
        </p>
      </div>
      <AppPricingRadio
        frequencies={frequencies}
        selectedFrequency={frequency}
        onFrequencyChange={setFrequency}
      />

      <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured
                ? "bg-secondary-foreground ring-secondary-foreground"
                : "ring-secondary",
              "rounded-3xl p-8 ring-1 xl:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={cn(
                tier.featured
                  ? "text-primary-foreground"
                  : "text-secondary-foreground",
                "text-lg font-semibold leading-8"
              )}
            >
              {tier.name}
            </h3>
            <p
              className={cn(
                tier.featured
                  ? "text-secondary"
                  : "text-secondary-foreground/70",
                "mt-4 text-sm leading-6"
              )}
            >
              {tier.description}
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span
                className={cn(
                  tier.featured
                    ? "text-primary-foreground"
                    : "text-secondary-foreground",
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
                    tier.featured
                      ? "text-secondary"
                      : "text-secondary-foreground/70",
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
                  ? "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 focus-visible:outline-primary-foreground"
                  : "bg-primary text-primary-foreground shadow-sm hover:bg-primary focus-visible:outline-primary",
                "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              )}
            >
              {tier.cta}
            </a>
            <ul
              role="list"
              className={cn(
                tier.featured
                  ? "text-secondary"
                  : "text-secondary-foreground/70",
                "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Icons.check
                    className={cn(
                      tier.featured ? "text-primary-secondary" : "text-primary",
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
