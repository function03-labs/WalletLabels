export const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  {
    value: "biannually",
    label: "Biannually",
    priceSuffix: "/6 months",
    discount: 20,
  },
  { value: "annually", label: "Annually", priceSuffix: "/year", discount: 30 },
]

export const tiers = [
  {
    name: "Free Tier",
    id: "tier-free",
    href: "/dashboard",
    price: { monthly: "$0", biannually: "$0", annually: "$0" },
    description: "Suitable for small projects or testing purposes.",
    features: [
      "100,000 API calls per month",
      "Up to 5 API calls per second",
      "Free API key",
    ],
    featured: false,
    cta: "Get started",
    productId: "prd_sgpdtlgsrh08xw5m75f",
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
    productId: "prd_sgpdtlgsrh08xw6002c",
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
    productId: "prd_sgpdtlgsrh08xw6sw6t",
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
    productId: "prd_sgpdvvs57h08xw7j0tg",
  },
]

export const priceIds = {
  "tier-basic": {
    monthly: "pri_sgpdvvs57h08xw67oca",
    biannually: "pri_sgpdkcfqdh08xw6g6lk",
    annually: "pri_sgpdkcfqdh08xw6nbjl",
  },
  "tier-pro": {
    monthly: "pri_sgpdvvs57h08xw6yxtn",
    biannually: "pri_sgpdtlgsrh08xw769o6",
    annually: "pri_sgpdtlgsrh08xw7d5cv",
  },
}
