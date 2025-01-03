import { Suspense } from "react"

import { PricingClient } from "@/components/app/pricing-client"

import { getTiers } from "@/app/api/pricing/tiers/route"

function PricingFallback() {
  return <PricingClient initialData={{ tiers: [] }} />
}

export default async function PricingPage() {
  const tiers = await getTiers()

  return (
    <Suspense fallback={<PricingFallback />}>
      <PricingClient initialData={tiers} />
    </Suspense>
  )
}
