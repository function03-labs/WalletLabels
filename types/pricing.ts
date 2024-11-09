export interface LemonSqueezyVariant {
  id: number
  planId: number
}

export interface LemonSqueezyTierInfo {
  productId: number
  variants?: {
    monthly?: LemonSqueezyVariant
    biannually?: LemonSqueezyVariant
    annually?: LemonSqueezyVariant
  }
  variantId?: number // For free tier
}

export interface PricingTier {
  name: string
  id: string
  planIds: number[]
  href: string
  price: { monthly: string; biannually: string; annually: string } | string
  description: string
  features: string[]
  featured: boolean
  cta: string
  lemonSqueezy?: LemonSqueezyTierInfo
}

type Frequency = {
  value: string
  label: string
  priceSuffix: string
  discount?: string
}

export type PricingResponse = {
  tiers: PricingTier[]
  frequencies: Frequency[]
} 