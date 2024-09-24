const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  {
    value: "biannually",
    label: "Biannually",
    priceSuffix: "/month",
    discount: 20,
  },
  { value: "annually", label: "Annually", priceSuffix: "/month", discount: 30 },
]

const tiers = [
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
  },
]

export { frequencies, tiers }
