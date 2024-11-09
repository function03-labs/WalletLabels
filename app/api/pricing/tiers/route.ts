import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { PricingTier } from "@/types/pricing"

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { id: 'asc' },
      where: {
        status: 'published',
      }
    })

    // Group plans by name to combine different intervals
    const paidTiers = plans.reduce<PricingTier[]>((acc, plan) => {
      const tierId = `tier-${plan.name.toLowerCase().replace(/\s+/g, '-')}`
      const existing = acc.find(t => t.id === tierId)

      if (existing) {
        // Update existing tier
        existing.planIds.push(plan.id)
        if (typeof existing.price !== 'string') {
          existing.price[plan.interval] = `$${plan.price}`
        }
        if (existing.lemonSqueezy?.variants) {
          existing.lemonSqueezy.variants[plan.interval] = {
            id: plan.variantId,
            planId: plan.id
          }
        }
        return acc
      }

      // Create new tier
      const newTier: PricingTier = {
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
          productId: plan.productId,
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

    const tiers = [...paidTiers]

    return NextResponse.json({ tiers })
  } catch (error) {
    console.error('Error fetching tiers:', error)
    return NextResponse.json(
      { error: "Failed to fetch tiers" },
      { status: 500 }
    )
  }
} 