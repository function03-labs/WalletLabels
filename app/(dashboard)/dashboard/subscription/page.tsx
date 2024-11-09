import { SubscriptionClient } from "@/components/app/subscription-client"

import { getTiers } from "@/app/api/pricing/tiers/route"

export default async function SubscriptionPage() {
  // Fetch tiers data on the server
  const tiers = await getTiers()

  return <SubscriptionClient initialData={tiers} />
}
