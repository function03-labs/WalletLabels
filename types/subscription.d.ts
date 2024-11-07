export type Frequency = {
  value: string
  label: string
  priceSuffix: string
  discount?: number
}

export type Tier = {
  name: string
  id: string
  href: string
  price: Record<string, string> | string
  description: string
  features: string[]
  featured: boolean
  cta: string
  productId: string
  planId?: number
}

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