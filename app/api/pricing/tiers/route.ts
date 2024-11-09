import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Tier } from "@/types/pricing"

export async function getTiers() {
  const plans = await prisma.plan.findMany({
    orderBy: { id: 'asc' },
    where: {
      status: 'published',
    }
  })

  // Group plans by name to combine different intervals
  const paidTiers = plans.reduce<Tier[]>((acc, plan) => {
    const tierId = `tier-${plan.name.toLowerCase().replace(/\s+/g, '-')}`
    const existing = acc.find(t => t.id === tierId)

    if (existing) {
      existing.planIds?.push(plan.id)
      if (typeof existing.price !== 'string') {
        existing.price[plan.interval] = `$${plan.price}`
      }
      if (existing?.lemonSqueezy?.variants) {
        existing.lemonSqueezy.variants[
          plan.interval as 'monthly' | 'biannually' | 'annually'
        ] = {
          id: plan.variantId,
          planId: plan.id,
        }
      }
      return acc
    }

    // Create new tier
    const newTier: Tier = {
      name: plan.name,
      id: tierId,
      planIds: [plan.id],
      href: plan.isCustom ? "mailto:aiden@fn03.xyz" : "/dashboard",
      price: plan.isCustom ? "Contact us" : {
        monthly: plan.interval === 'monthly' ? `$${plan.price}` : '$0',
        biannually: plan.interval === 'biannually' ? `$${plan.price}` : '$0',
        annually: plan.interval === 'annually' ? `$${plan.price}` : '$0'
      },
      description: plan.description || "",
      features: plan.features,
      featured: plan.featured,
      cta: plan.isCustom ? "Contact us" : "Buy plan",
      lemonSqueezy: plan.isCustom ? undefined : {
        productId: Number(plan.lemonId),
        variants: {
          [plan.interval]: {
            id: plan.variantId,
            planId: plan.id
          }
        }
      }
    }

    acc.push(newTier)
    return acc
  }, [])

  return { tiers: [...paidTiers] }
}

export async function GET() {
  try {
    const data = await getTiers()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching tiers:', error)
    return NextResponse.json(
      { error: "Failed to fetch tiers" },
      { status: 500 }
    )
  }
} 