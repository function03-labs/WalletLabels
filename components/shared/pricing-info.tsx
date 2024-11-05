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
    planIds: [0],
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
    lemonSqueezy: {
      productId: "375159",
      variantId: "562578",
      checkoutUrl:
        "https://walletlabs.lemonsqueezy.com/checkout/buy/d2fcccda-af60-4723-b54a-1598b89ef06e",
    },
  },
  {
    name: "Basic Plan",
    id: "tier-basic",
    planIds: [1, 2, 3],
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
    lemonSqueezy: {
      productId: 375174,
      variants: {
        monthly: {
          id: 562610,
          planId: 1,
          checkoutUrl:
            "https://walletlabs.lemonsqueezy.com/checkout/buy/644e623a-0b21-4ddd-9fd1-0e735a13154a",
        },
        biannually: {
          id: 562607,
          planId: 2,
          checkoutUrl:
            "https://walletlabs.lemonsqueezy.com/checkout/buy/04198584-8588-4468-82fc-a6f8006efd72",
        },
        annually: {
          id: 562608,
          planId: 3,
          checkoutUrl:
            "https://walletlabs.lemonsqueezy.com/checkout/buy/1c5cd8d0-0e6f-489b-8dc1-1f2be07e7495",
        },
      },
    },
  },
  {
    name: "Pro Plan",
    id: "tier-pro",
    planIds: [4, 5, 6],
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
    lemonSqueezy: {
      productId: 375177,
      variants: {
        monthly: {
          id: 562613,
          planId: 4,
          checkoutUrl:
            "https://walletlabs.lemonsqueezy.com/checkout/buy/d62be5dd-a939-40ad-a8a8-15df805b9752",
        },
        biannually: {
          id: 562806,
          planId: 5,
          checkoutUrl:
            "https://walletlabs.lemonsqueezy.com/checkout/buy/d35c1961-ce8d-4c67-83bf-bac0da63ab5f",
        },
        annually: {
          id: 562807,
          planId: 6,
          checkoutUrl:
            "https://walletlabs.lemonsqueezy.com/checkout/buy/bc969a0a-af52-41e2-bebd-24cfc41c8667",
        },
      },
    },
  },
  {
    name: "Enterprise Plans",
    id: "tier-enterprise",
    planIds: [7],
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
