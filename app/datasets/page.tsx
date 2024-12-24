"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Filter,
  Search,
  Server,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  { name: "Market Data", count: 12 },
  { name: "On-Chain Data", count: 15 },
  { name: "DeFi Data", count: 8 },
  { name: "NFT Data", count: 6 },
  { name: "Social Data", count: 4 },
]

const updateFrequencies = [
  { name: "Real-time", count: 25 },
  { name: "1 minute", count: 8 },
  { name: "5 minutes", count: 6 },
  { name: "15 minutes", count: 4 },
  { name: "1 hour", count: 2 },
]

const datasets = [
  {
    category: "Market Data",
    name: "Real-time Prices",
    description:
      "Live cryptocurrency prices from major exchanges with bid-ask spreads",
    endpoints: 4,
    updates: "Real-time",
    format: "JSON/CSV",
    latency: "~50ms",
    coverage: "100+ exchanges",
    sample: {
      price: 46231.45,
      volume_24h: "1.2B",
      bid: 46230.5,
      ask: 46232.4,
      timestamp: "2024-01-19T12:00:00Z",
    },
  },
  {
    category: "On-Chain Data",
    name: "Transaction Analytics",
    description:
      "Detailed blockchain transaction data with real-time analytics",
    endpoints: 6,
    updates: "Real-time",
    format: "JSON",
    latency: "~100ms",
    coverage: "15+ chains",
    sample: {
      tx_hash: "0x123...",
      value: "1.5 ETH",
      gas_used: 21000,
      timestamp: "2024-01-19T12:00:00Z",
    },
  },
  // Add more datasets as needed
]

export default function DatasetsPage() {
  const router = useRouter()
  const [selectedDataset, setSelectedDataset] = useState(datasets[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#0A0A0A] text-white"
    >
      {/* Header */}
      <div className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </button>
            <div className="text-lg font-semibold">Dataset Explorer</div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory || "all"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <div className="grid grid-cols-[300px,1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-10 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
                <Filter className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-400">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedCategory === category.name
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Update Frequency */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-400">
                  Update Frequency
                </h3>
                <div className="space-y-1">
                  {updateFrequencies.map((frequency) => (
                    <button
                      key={frequency.name}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <span>{frequency.name}</span>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs">
                        {frequency.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Dataset List */}
              <div className="grid gap-4">
                {datasets.map((dataset) => (
                  <motion.div
                    key={dataset.name}
                    layoutId={dataset.name}
                    onClick={() => setSelectedDataset(dataset)}
                    className={`group cursor-pointer rounded-xl border p-4 transition-colors ${
                      selectedDataset === dataset
                        ? "border-blue-500/20 bg-blue-500/5"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium text-white">
                            {dataset.name}
                          </span>
                          <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                            {dataset.updates}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">
                          {dataset.description}
                        </p>
                      </div>
                      <ChevronRight className="size-5 text-gray-500 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="mt-4 flex items-center gap-6 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Server className="size-3" />
                        <span>{dataset.endpoints} endpoints</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>Latency: {dataset.latency}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="size-3" />
                        <span>{dataset.coverage}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dataset Details */}
              {selectedDataset && (
                <Card className="border-white/10 bg-black/20 p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Sample Response
                  </h3>
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-sm">
                    <code className="text-blue-400">
                      {JSON.stringify(selectedDataset.sample, null, 2)}
                    </code>
                  </pre>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
