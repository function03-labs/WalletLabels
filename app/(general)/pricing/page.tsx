import { PricingClient } from "@/components/app/pricing-client"

import { getTiers } from "@/app/api/pricing/tiers/route"

export default async function PricingPage() {
  // Fetch tiers data on the server
  const tiers = await getTiers()

  return <PricingClient initialData={tiers} />
}
