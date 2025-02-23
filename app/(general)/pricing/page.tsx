import { Suspense } from "react"

import { PricingClient } from "@/components/app/pricing-client"

import { getTiers } from "@/app/api/pricing/tiers/route"

function PricingFallback() {
  return <PricingClient initialData={{ tiers: [] }} data-oid="on-sct2" />
}

export default async function PricingPage() {
  const tiers = await getTiers()

  return (
    <Suspense
      fallback={<PricingFallback data-oid="9ts4mdt" />}
      data-oid="sdc52.9"
    >
      <PricingClient initialData={tiers} data-oid="ju5onmn" />
    </Suspense>
  )
}
