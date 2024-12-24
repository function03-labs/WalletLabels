"use client"

import { useRouter } from "next/navigation"
import { Check, ChevronRight, CreditCard, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const datasets = [
  {
    category: "Market Data",
    datasets: [
      {
        name: "Real-time Prices",
        endpoints: 4,
        updates: "Real-time",
        format: "JSON/CSV",
      },
      {
        name: "Historical OHLCV",
        endpoints: 3,
        updates: "Daily",
        format: "JSON/CSV",
      },
      {
        name: "Order Books",
        endpoints: 2,
        updates: "Real-time",
        format: "JSON",
      },
      {
        name: "Trading Volume",
        endpoints: 3,
        updates: "Real-time",
        format: "JSON",
      },
    ],
  },
  {
    category: "On-Chain Data",
    datasets: [
      {
        name: "Transactions",
        endpoints: 5,
        updates: "Real-time",
        format: "JSON",
      },
      {
        name: "Smart Contracts",
        endpoints: 3,
        updates: "Real-time",
        format: "JSON",
      },
      {
        name: "Token Transfers",
        endpoints: 4,
        updates: "Real-time",
        format: "JSON",
      },
      {
        name: "Gas Analytics",
        endpoints: 2,
        updates: "Real-time",
        format: "JSON",
      },
    ],
  },
  {
    category: "DeFi Data",
    datasets: [
      {
        name: "DEX Activity",
        endpoints: 6,
        updates: "Real-time",
        format: "JSON",
      },
      {
        name: "Liquidity Pools",
        endpoints: 4,
        updates: "Real-time",
        format: "JSON",
      },
      {
        name: "Lending Markets",
        endpoints: 3,
        updates: "5min",
        format: "JSON",
      },
      {
        name: "Yield Analytics",
        endpoints: 2,
        updates: "15min",
        format: "JSON",
      },
    ],
  },
]

const features = [
  "30+ years of data",
  "30,000+ tickers",
  "Income statements",
  "Balance sheets",
  "Cash flow statements",
  "Stock prices",
  "Options chains",
  "Financial metrics",
  "Insider transactions",
  "SEC filings",
]

const endpoints = [
  { name: "Prices", cost: "$0.01", details: "#" },
  { name: "Options", cost: "$0.02", details: "#" },
  { name: "Financial metrics", cost: "$0.02", details: "#" },
  { name: "Insider trades", cost: "$0.02", details: "#" },
  { name: "Institutional ownership", cost: "$0.02", details: "#" },
  { name: "SEC filings", cost: "$0.02", details: "#" },
  { name: "Segmented revenue", cost: "$0.02", details: "#" },
  { name: "Income statements", cost: "$0.04", details: "#" },
]

export function PricingSection() {
  const router = useRouter()

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Datasets Section */}
        <div className="mb-32">
          <div className="mb-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px w-4 bg-white/10" />
              <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-sm font-medium text-blue-400">
                Available Datasets
              </span>
              <div className="h-px w-4 bg-white/10" />
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white">
              Comprehensive crypto data coverage
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Access real-time and historical data across multiple chains,
              exchanges, and protocols. All data is normalized and enriched for
              easy integration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {datasets.map((category) => (
              <Card
                key={category.category}
                className="group relative border border-white/10 bg-black p-6 transition-all hover:border-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.02] to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.datasets.map((dataset) => (
                      <div
                        key={dataset.name}
                        className="group/item flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-blue-500/20 hover:bg-white/[0.04]"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">
                              {dataset.name}
                            </span>
                            <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-400">
                              {dataset.updates}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                            <span>{dataset.endpoints} endpoints</span>
                            <span>{dataset.format}</span>
                          </div>
                        </div>
                        <ChevronRight className="size-4 text-gray-500 transition-transform group-hover/item:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={() => router.push("/datasets")}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/5 px-6 py-3 text-blue-400 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative text-sm font-medium">
                View All Available Datasets
              </span>
              <span className="relative flex size-6 items-center justify-center rounded-full bg-blue-500/10">
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Existing Pricing Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-4 bg-white/10" />
            <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-sm font-medium text-blue-400">
              Custom pricing
            </span>
            <div className="h-px w-4 bg-white/10" />
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white">
            Flexible pricing options
            <br />
            that fit your needs
          </h2>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-white">
              <span className="font-semibold text-blue-400">Subscriptions</span>{" "}
              <span className="text-gray-400">
                — Unlimited requests, predictable costs
              </span>
            </p>
            <p className="text-white">
              <span className="font-semibold text-blue-400">Credits</span>{" "}
              <span className="text-gray-400">
                — Usage-based, pay per endpoint call
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="group relative border border-white/10 bg-black p-6 transition-all hover:border-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.02] to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-white">
                Subscription
                <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 text-xs text-blue-400">
                  Most flexible
                </span>
              </h3>
              <p className="mb-6 text-gray-400">
                Premium data. Unlimited API calls.
              </p>

              <div className="space-y-2">
                <p className="mb-4 text-sm font-medium text-white">
                  This includes:
                </p>
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="group/item flex items-center gap-2"
                  >
                    <div className="flex size-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-colors group-hover/item:bg-blue-500/20">
                      <Check className="size-3" />
                    </div>
                    <span className="text-sm text-white transition-colors group-hover/item:text-blue-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="group relative border border-white/10 bg-black p-6 transition-all hover:border-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.02] to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-white">
                Credits
                <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 text-xs text-blue-400">
                  Pay per call
                </span>
              </h3>
              <p className="mb-6 text-gray-400">
                Usage-based billing. Credits are consumed as you access our
                endpoints.
              </p>

              <div className="space-y-2">
                <div className="rounded-lg border border-white/10">
                  <div className="grid grid-cols-[1fr,auto,auto] gap-4 bg-white/5 p-3 text-xs font-medium">
                    <div className="uppercase text-gray-400">Endpoint</div>
                    <div className="uppercase text-gray-400">Cost</div>
                    <div></div>
                  </div>
                  <div className="divide-y divide-white/5">
                    {endpoints.map((endpoint) => (
                      <div
                        key={endpoint.name}
                        className="group/row grid grid-cols-[1fr,auto,auto] gap-4 p-3 hover:bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                            GET
                          </span>
                          <span className="text-sm text-white">
                            {endpoint.name}
                          </span>
                        </div>
                        <div className="text-right font-medium text-white">
                          {endpoint.cost}
                          <span className="ml-1 text-xs text-gray-400">
                            /request
                          </span>
                        </div>
                        <a
                          href={endpoint.details}
                          className="flex items-center justify-end text-gray-400 transition-colors hover:text-white"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
