"use client"

import Link from "next/link"
import { BookOpenIcon, CodeIcon, CreditCardIcon, UsersIcon } from "lucide-react"

import { ApiExampleSection } from "@/components/api-example-section"
import { EndpointsSection } from "@/components/endpoints-section"
import { PricingSection } from "@/components/pricing-section"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/20">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        style={{
          background:
            "linear-gradient(to right,#0A0A0A 1px,transparent 1px),linear-gradient(to bottom,#0A0A0A 1px,transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1E40AF20,transparent)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <Link
            href="/"
            className="group relative text-xl font-bold tracking-tight text-white"
          >
            <div className="absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-blue-500/50 blur-sm" />
            wlbls
            <span className="text-blue-500 transition-colors group-hover:text-blue-400">
              .datasets
            </span>
          </Link>
          <div className="flex items-center gap-10">
            <Link
              href="/docs"
              className="text-sm text-gray-400 transition-all hover:-translate-y-px hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-400 transition-all hover:-translate-y-px hover:text-white"
            >
              Pricing
            </Link>
            <Button
              variant="outline"
              className="group relative border-blue-500/20 bg-blue-500/[0.02] text-blue-400 transition-all hover:-translate-y-px hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
            >
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0" />
              Launch App
              <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative mx-auto max-w-5xl px-6 pb-32 pt-48 text-center">
        {/* Animated gradient orbs */}
        <div className="absolute -top-24 left-1/2 size-[800px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 opacity-20 blur-3xl" />
        <div
          className="absolute left-1/2 top-0 size-64 -translate-x-1/2 rounded-full bg-blue-500/20 opacity-30 blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />

        {/* Live data indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="relative">
            <div className="size-2 animate-pulse rounded-full bg-green-500" />
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500/50" />
          </div>
          <span className="text-sm text-gray-400">Live Updates</span>
          <div className="ml-2 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-500">
            Latest: DEX Volume Data
          </div>
        </div>

        <h1 className="relative mb-6 text-6xl font-bold tracking-tight">
          <span className="relative">
            Crypto Market Data
            <div className="absolute -right-4 top-0 size-2 rounded-full bg-blue-500" />
          </span>
          <br />
          <span className="mt-2 block">
            Built for{" "}
            <span className="animate-gradient bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[size:200%_100%] bg-clip-text text-transparent">
              <span className="inline-flex h-[1.1em] flex-col overflow-hidden">
                <span className="animate-text-slide text-white">AI Agents</span>
                <span className="animate-text-slide text-white">Protocols</span>
                <span className="animate-text-slide text-white">
                  Trading Bots
                </span>
                <span className="animate-text-slide text-white">
                  Researchers
                </span>
                <span className="animate-text-slide text-white">AI Agents</span>
              </span>
            </span>
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg font-light text-gray-400">
          Access real-time on-chain data and market signals optimized for LLMs.
          Covering <span className="font-medium text-white">30,000+</span>{" "}
          assets with
          <span className="font-medium text-white">
            {" "}
            institutional-grade
          </span>{" "}
          reliability.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-blue-500 px-8 text-white transition-all hover:-translate-y-px hover:bg-blue-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            Get API Key
            <span className="ml-2 opacity-0 transition-all group-hover:opacity-100">
              →
            </span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group relative border-white/10 bg-white/[0.02] text-white transition-all hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
            View Documentation
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-3 gap-8">
          {[
            {
              value: "30K+",
              label: "Assets Tracked",
              trend: "+12% this month",
            },
            { value: "50ms", label: "Latency", trend: "99.9% uptime" },
            { value: "24/7", label: "Real-time Data", trend: "No delays" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.02] to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                <div className="mt-2 text-xs text-blue-500/80">
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dataset Categories */}
        <div className="mt-16 grid grid-cols-4 gap-4">
          {[
            {
              title: "DEX Data",
              desc: "Volume, Liquidity, Trades",
              icon: "📊",
              update: "5min",
            },
            {
              title: "NFT Markets",
              desc: "Floor Price, Volume, Sales",
              icon: "🎨",
              update: "10min",
            },
            {
              title: "Chain Data",
              desc: "Transactions, Gas, TVL",
              icon: "⛓️",
              update: "Real-time",
            },
            {
              title: "Whale Alerts",
              desc: "Large Transfers, Holdings",
              icon: "🐋",
              update: "1min",
            },
          ].map((dataset, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.02] to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-2 text-2xl">{dataset.icon}</div>
                <div className="text-sm font-medium text-white">
                  {dataset.title}
                </div>
                <div className="mt-1 text-xs text-gray-400">{dataset.desc}</div>
                <div className="mt-2 flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-green-500/50" />
                  <span className="text-xs text-green-500/80">
                    Updates: {dataset.update}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Coverage */}
        <div className="mt-8 flex items-center justify-center gap-6 rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-4">
          <div className="flex items-center gap-4 divide-x divide-white/5">
            {[
              { label: "Chains", value: "15+", detail: "ETH, BSC, SOL..." },
              {
                label: "DEXes",
                value: "50+",
                detail: "Uniswap, PancakeSwap...",
              },
              {
                label: "NFT Markets",
                value: "20+",
                detail: "OpenSea, Blur...",
              },
              {
                label: "Historical Data",
                value: "5+ Years",
                detail: "Full history",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-4 first:pl-0 last:pr-0"
              >
                <div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                  <div className="text-lg font-bold text-white">
                    {item.value}
                  </div>
                  <div className="text-xs text-blue-500/80">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rest of components */}
        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(-50%);
            }
            50% {
              transform: translateY(-20px) translateX(-50%);
            }
          }
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            animation: gradient 8s linear infinite;
          }
          @keyframes slide {
            0% {
              transform: translateY(0);
            }
            20% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(-100%);
            }
            45% {
              transform: translateY(-100%);
            }
            50% {
              transform: translateY(-200%);
            }
            70% {
              transform: translateY(-200%);
            }
            75% {
              transform: translateY(-300%);
            }
            95% {
              transform: translateY(-300%);
            }
            100% {
              transform: translateY(-400%);
            }
          }
          .animate-text-slide {
            animation: slide 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>

        {/* API Preview Card */}
        <ApiExampleSection />
        <EndpointsSection />
        <PricingSection />

        {/* Pricing Section */}
        <div className="mt-32">
          <div className="text-center">
            <div className="mb-2 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs text-blue-400">
              <span className="mr-1 size-1 rounded-full bg-blue-500"></span>
              Flexible API Pricing
            </div>
            <h2 className="mb-4 text-4xl font-bold">
              Choose Your Data Access Level
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Pay only for what you use. All plans include full API access,
              real-time data, and comprehensive documentation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$99",
                requests: "1M",
                badge: "Popular",
                features: [
                  "1M API requests/month",
                  "Real-time market data",
                  "Basic historical data",
                  "5 req/second rate limit",
                ],
                apiExample: "GET /v1/market/basic/btc",
                response: '{"price": "46,231.45", "24h_volume": "12.5B"}',
              },
              {
                name: "Pro",
                price: "$299",
                requests: "5M",
                badge: "Recommended",
                features: [
                  "5M API requests/month",
                  "Real-time + Historical",
                  "Advanced analytics",
                  "25 req/second rate limit",
                ],
                apiExample: "GET /v1/market/advanced/btc",
                response:
                  '{"price": "46,231.45", "analytics": {"volatility": "12.5%"}}',
              },
              {
                name: "Enterprise",
                price: "Custom",
                requests: "10M+",
                badge: "Unlimited",
                features: [
                  "Unlimited API requests",
                  "Full historical data",
                  "Custom endpoints",
                  "Dedicated support",
                ],
                apiExample: "GET /v1/market/enterprise/custom",
                response: '{"status": "Contact us for demo"}',
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-500/20"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.02] to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute right-4 top-4 rounded-full border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 text-xs text-blue-400">
                    {plan.badge}
                  </div>
                )}

                <div className="relative">
                  {/* Plan name and price */}
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-sm text-gray-400">/month</span>
                  </div>

                  {/* API Requests Badge */}
                  <div className="mt-4 inline-flex items-center rounded-full bg-white/5 px-2 py-1 text-xs text-gray-400">
                    <span className="mr-1 size-1 rounded-full bg-green-500"></span>
                    {plan.requests} requests/month
                  </div>

                  {/* Features */}
                  <ul className="mt-6 space-y-4 text-sm text-gray-400">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <div className="mr-2 size-1 rounded-full bg-blue-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* API Example */}
                  <div className="mt-6 rounded-lg border border-white/5 bg-black/20 p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="size-1 rounded-full bg-green-500"></div>
                      Example Request
                    </div>
                    <pre className="mt-2 overflow-x-auto text-xs text-blue-400">
                      <code>{plan.apiExample}</code>
                    </pre>
                    <div className="mt-2 text-xs text-gray-500">Response:</div>
                    <pre className="mt-1 overflow-x-auto text-xs text-green-400/80">
                      <code>{plan.response}</code>
                    </pre>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="group mt-6 w-full border-blue-500/20 bg-blue-500/[0.02] text-blue-400 transition-all hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
                    variant="outline"
                  >
                    Get Started
                    <span className="ml-2 opacity-0 transition-all group-hover:opacity-100">
                      →
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Contact */}
          <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-sm">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl font-bold">
                Need Custom Data Solutions?
              </h3>
              <p className="mt-2 text-gray-400">
                Get in touch for custom endpoints, dedicated support, and
                enterprise-grade infrastructure.
              </p>
              <Button
                className="group mt-6 border-blue-500/20 bg-blue-500/[0.02] text-blue-400 transition-all hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
                variant="outline"
              >
                Contact Sales
                <span className="ml-2 opacity-0 transition-all group-hover:opacity-100">
                  →
                </span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
          <div>walletlabels datasets © 2024</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
