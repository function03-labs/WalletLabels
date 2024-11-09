// LemonSqueezy specific types
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

// Core pricing and subscription types
export type Frequency = {
  value: string
  label: string
  priceSuffix: string
  discount?: number
}

export interface Tier {
  name: string
  id: string
  href: string
  price: Record<string, string> | string
  description: string
  features: string[]
  featured: boolean
  cta: string
  planId?: number
  planIds?: number[]
  lemonSqueezy?: LemonSqueezyTierInfo
}

// Payment related types
export type PaymentMethod = {
  card: {
    number: string
    expiry_month: string
    expiry_year: string
    cvc: string
  }
}

export type PromoCode = {
  code: string
  discount: number
}

export type Subscription = {
  id: string
  userId: string
  tier: "FREE" | "BASIC" | "PRO" | "ENTERPRISE"
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE" | "UNPAID"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

export type PriceIds = {
  [key: string]: {
    [key: string]: string
  }
}

export type PricingResponse = {
  tiers: Tier[]
} 