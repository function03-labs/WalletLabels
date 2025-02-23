"use client"

import { motion } from "framer-motion"
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  ChartBar,
  CircleDot,
  Clock,
  Code2,
  Database,
  Gamepad2,
  GitBranch,
  Globe2,
  Image,
  LineChart,
  Lock,
  Menu,
  Search,
  Target,
  Terminal,
  Users,
  Webhook,
  Zap,
} from "lucide-react"

import { badgeCategories } from "@/config/badge-categories"
import { chains } from "@/config/blockchain-networks"

import { LabelCategoryCard } from "@/components/landing/label-category-card"
import { NetworkStats } from "@/components/landing/network-stats"
import { SearchDemo } from "@/components/landing/search-demo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Navigation */}
      <nav className="fixed inset-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg h-16">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-500/20">
                  <Database className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  Wallet Labels
                </span>
              </div>
              <div className="hidden md:flex md:space-x-6">
                <a
                  href="#features"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#networks"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Networks
                </a>
                <a
                  href="#datasets"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Datasets
                </a>
                <a
                  href="https://docs.walletlabels.xyz"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Documentation
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="hidden border-gray-200 md:inline-flex"
                onClick={() =>
                  window.open("https://docs.walletlabels.xyz", "_blank")
                }
              >
                <Terminal className="mr-2 h-4 w-4" />
                API Docs
              </Button>
              <Button
                className="hidden bg-blue-600 text-white hover:bg-blue-700 md:inline-flex"
                onClick={() => window.open("/dashboard", "_self")}
              >
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#fff_50%,transparent_100%)] bg-fixed" />
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#00000005_1px,transparent_1px)] bg-[length:20px_20px] bg-fixed" />
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl" />
        <div className="absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-100 opacity-20 blur-3xl" />

        <section className="container relative mx-auto px-4 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="border-none bg-blue-50 px-3 py-1 text-blue-700">
                    <Zap className="mr-1 h-3 w-3" /> Industry-Leading Coverage
                  </Badge>
                  <Badge className="border-none bg-green-50 px-3 py-1 text-green-700">
                    <Activity className="mr-1 h-3 w-3" /> Real-time Updates
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Comprehensive <br />
                  <span className="relative">
                    <span className="bg-gradient-to-r from-blue-600 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                      On-Chain Identity
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-800"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </span>{" "}
                  <br />
                  Resolution
                </h1>
                <p className="max-w-xl text-lg text-gray-600">
                  Advanced blockchain analytics platform providing real-time
                  wallet labeling, entity tracking, and behavioral analysis
                  across multiple networks with ML-powered accuracy.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="group relative h-12 space-x-2 bg-blue-600 px-6 text-white hover:bg-blue-700"
                  onClick={() => window.open("/dashboard", "_self")}
                >
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-blue-400"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="group h-12 space-x-2 border-gray-200 px-6 hover:border-blue-500 hover:text-blue-600"
                  onClick={() =>
                    window.open("https://docs.walletlabels.xyz", "_blank")
                  }
                >
                  <Terminal className="h-4 w-4" />
                  <span>View Documentation</span>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-baseline space-x-1">
                    <div className="text-2xl font-bold text-gray-900">
                      200M+
                    </div>
                    <div className="text-sm text-green-600">↑12%</div>
                  </div>
                  <div className="text-sm text-gray-600">Labeled Addresses</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-baseline space-x-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {chains.length}
                    </div>
                    <CircleDot className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-600">Networks Live</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-baseline space-x-1">
                    <div className="text-2xl font-bold text-gray-900">50ms</div>
                    <ChartBar className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -left-6 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="relative space-y-4 rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div className="font-medium">Live Activity</div>
                  </div>
                  <Badge className="animate-pulse bg-green-50 text-green-700">
                    <CircleDot className="mr-1 h-2 w-2" /> Live
                  </Badge>
                </div>

                <div className="space-y-3 rounded-lg bg-gray-900 p-4 font-mono text-sm">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>// Latest labels</span>
                    <span className="text-xs">Updated 5s ago</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2"
                  >
                    <span className="text-green-400">Uniswap V3</span>
                    <Badge className="bg-blue-500/20 text-blue-400">DeFi</Badge>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2"
                  >
                    <span className="text-purple-400">Binance</span>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      CEX
                    </Badge>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2"
                  >
                    <span className="text-orange-400">BAYC Whale</span>
                    <Badge className="bg-orange-500/20 text-orange-400">
                      NFT
                    </Badge>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-xs text-gray-500">
                        Processing Rate
                      </div>
                      <div className="font-mono text-sm font-medium">
                        2.5k/sec
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                      <div className="font-mono text-sm font-medium">99.9%</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-blue-200">
                    <Clock className="mr-1 h-3 w-3" /> Real-time
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 inline-block rounded-lg bg-blue-50 p-3 text-blue-600">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Cross-chain Coverage
              </h3>
              <p className="text-sm text-gray-600">
                Comprehensive label coverage across major blockchain networks
                with real-time updates and cross-chain identity resolution.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 inline-block rounded-lg bg-green-50 p-3 text-green-600">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                ML-Powered Labels
              </h3>
              <p className="text-sm text-gray-600">
                Advanced machine learning models for accurate wallet
                classification, behavior analysis, and pattern recognition.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 inline-block rounded-lg bg-purple-50 p-3 text-purple-600">
                <Webhook className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Flexible Integration
              </h3>
              <p className="text-sm text-gray-600">
                Multiple integration options including REST API, GraphQL,
                webhooks, and real-time data streams.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Search & Label Showcase Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 flex flex-col items-center space-y-3">
          <Badge variant="outline" className="mb-2 border-blue-200 px-4 py-1">
            <Search className="mr-1 h-3 w-3" /> Powerful Search
          </Badge>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Instant Address Resolution
          </h2>
          <p className="max-w-2xl text-center text-gray-600">
            Search across millions of labeled addresses with advanced filtering
            and real-time updates
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Interactive Search Demo */}
          <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Try it now</h3>
              </div>
              <Badge className="bg-green-50 text-green-700">Live Demo</Badge>
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Enter address, ENS, or label..."
                className="font-mono w-full border-gray-200 pr-24 text-sm"
              />
              <Button className="absolute right-1 top-1 bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700">
                Search
              </Button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-gray-500">Popular searches:</div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer border-blue-200 hover:bg-blue-50"
                >
                  uniswap.eth
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-blue-200 hover:bg-blue-50"
                >
                  Binance Hot Wallet
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-blue-200 hover:bg-blue-50"
                >
                  MEV Bot
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-blue-200 hover:bg-blue-50"
                >
                  NFT Whale
                </Badge>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-3 text-sm font-medium text-gray-900">
                Advanced filters
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Category</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-gray-200"
                    >
                      DeFi
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-gray-200"
                    >
                      CEX
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-gray-200"
                    >
                      NFT
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Network</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-gray-200"
                    >
                      Ethereum
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-gray-200"
                    >
                      Polygon
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Label Categories Preview */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      DeFi Protocols
                    </div>
                    <div className="text-sm text-gray-600">50K+ addresses</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-700">Real-time</Badge>
                  <ArrowRight className="h-4 w-4 text-blue-700" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-purple-100 bg-purple-50/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Exchanges & OTC
                    </div>
                    <div className="text-sm text-gray-600">1K+ entities</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-100 text-purple-700">
                    Verified
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-purple-700" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-700">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      MEV & Searchers
                    </div>
                    <div className="text-sm text-gray-600">25K+ addresses</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-700">
                    ML-Powered
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-green-700" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-orange-100 p-2 text-orange-700">
                    <Image className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      NFT & Gaming
                    </div>
                    <div className="text-sm text-gray-600">100K+ addresses</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-100 text-orange-700">New</Badge>
                  <ArrowRight className="h-4 w-4 text-orange-700" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">
                  Label Stats
                </div>
                <Badge variant="outline" className="border-blue-200">
                  <Clock className="mr-1 h-3 w-3" /> Updated 5m ago
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Daily Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-col items-center space-y-3">
          <Badge variant="outline" className="mb-2 border-blue-200 px-4 py-1">
            <Globe2 className="mr-1 h-3 w-3" /> Multi-chain Support
          </Badge>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Supported Networks
          </h2>
          <p className="max-w-2xl text-center text-gray-600">
            Comprehensive label coverage across major blockchain networks
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chains.map((chain) => (
            <NetworkStats key={chain.value} chain={chain} />
          ))}
        </div>
      </section>

      {/* Label Explorer Section */}
      <section className="relative overflow-hidden bg-white px-4 py-16">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#f8fafc33_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col items-center space-y-3">
            <Badge variant="outline" className="mb-2 border-blue-200 px-4 py-1">
              <GitBranch className="mr-1 h-3 w-3" /> Advanced Label System
            </Badge>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Specialized Label Datasets
            </h2>
            <p className="max-w-2xl text-center text-gray-600">
              Industry-specific label collections with deep behavioral analysis
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* DeFi Intelligence Dataset */}
            <div className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    DeFi Intelligence
                  </h3>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Enterprise</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Comprehensive DeFi protocol analysis with MEV detection,
                liquidity tracking, and protocol interactions.
              </p>
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-4">
                <div>
                  <div className="text-xs text-gray-500">Protocols Covered</div>
                  <div className="font-mono text-sm font-medium">2,500+</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Daily Updates</div>
                  <div className="font-mono text-sm font-medium">15K+</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-blue-200">
                  <Zap className="mr-1 h-3 w-3" /> MEV Detection
                </Badge>
                <Badge variant="outline" className="border-blue-200">
                  Protocol Analysis
                </Badge>
                <Badge variant="outline" className="border-blue-200">
                  TVL Tracking
                </Badge>
              </div>
            </div>

            {/* NFT Market Intelligence */}
            <div className="space-y-4 rounded-xl border border-purple-100 bg-purple-50/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
                    <Image className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    NFT Market Intelligence
                  </h3>
                </div>
                <Badge className="bg-purple-100 text-purple-700">Premium</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Track NFT market movements, whale behaviors, and collection
                performance metrics.
              </p>
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-4">
                <div>
                  <div className="text-xs text-gray-500">
                    Collections Tracked
                  </div>
                  <div className="font-mono text-sm font-medium">10,000+</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Whale Wallets</div>
                  <div className="font-mono text-sm font-medium">5,000+</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-200">
                  <Users className="mr-1 h-3 w-3" /> Whale Tracking
                </Badge>
                <Badge variant="outline" className="border-purple-200">
                  Collection Analysis
                </Badge>
                <Badge variant="outline" className="border-purple-200">
                  Market Trends
                </Badge>
              </div>
            </div>

            {/* Institutional Trading */}
            <div className="space-y-4 rounded-xl border border-green-100 bg-green-50/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-700">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Institutional Trading
                  </h3>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  Enterprise
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Monitor institutional trading patterns, OTC deals, and
                large-scale market movements.
              </p>
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-4">
                <div>
                  <div className="text-xs text-gray-500">
                    Institutions Tracked
                  </div>
                  <div className="font-mono text-sm font-medium">500+</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Daily Volume</div>
                  <div className="font-mono text-sm font-medium">$2B+</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-200">
                  <ArrowUpRight className="mr-1 h-3 w-3" /> OTC Trading
                </Badge>
                <Badge variant="outline" className="border-green-200">
                  Flow Analysis
                </Badge>
                <Badge variant="outline" className="border-green-200">
                  Risk Metrics
                </Badge>
              </div>
            </div>

            {/* Gaming & GameFi */}
            <div className="space-y-4 rounded-xl border border-orange-100 bg-orange-50/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-orange-100 p-2 text-orange-700">
                    <Gamepad2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Gaming & GameFi
                  </h3>
                </div>
                <Badge className="bg-orange-100 text-orange-700">New</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Track gaming ecosystems, player behaviors, and in-game asset
                movements.
              </p>
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-4">
                <div>
                  <div className="text-xs text-gray-500">Games Tracked</div>
                  <div className="font-mono text-sm font-medium">250+</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Active Players</div>
                  <div className="font-mono text-sm font-medium">1M+</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-orange-200">
                  <Target className="mr-1 h-3 w-3" /> Player Analytics
                </Badge>
                <Badge variant="outline" className="border-orange-200">
                  Asset Tracking
                </Badge>
                <Badge variant="outline" className="border-orange-200">
                  Guild Data
                </Badge>
              </div>
            </div>
          </div>

          {/* Dataset Explorer Preview */}
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Code2 className="h-5 w-5 text-gray-500" />
                  <h3 className="font-mono text-sm font-medium text-gray-700">
                    Dataset Explorer
                  </h3>
                </div>
                <Badge variant="outline" className="border-blue-200">
                  Beta
                </Badge>
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="mb-4 grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Total Datasets</div>
                  <div className="font-mono text-lg font-medium text-gray-900">
                    12
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Label Categories</div>
                  <div className="font-mono text-lg font-medium text-gray-900">
                    50+
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Update Frequency</div>
                  <div className="font-mono text-lg font-medium text-gray-900">
                    Real-time
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Data Points</div>
                  <div className="font-mono text-lg font-medium text-gray-900">
                    500M+
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="border-gray-200">
                    <Clock className="mr-1 h-3 w-3" /> Live Updates
                  </Badge>
                  <Badge variant="outline" className="border-gray-200">
                    <Lock className="mr-1 h-3 w-3" /> Enterprise API
                  </Badge>
                </div>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Explore Datasets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Product
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    API Access
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Integration
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Release Notes
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-8 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                © 2024 Wallet Labels. All rights reserved.
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Discord</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
