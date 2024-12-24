"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Calendar, Clock, Download, Filter, Zap } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface UsageData {
  date: string
  requests: number
  latency: number
  errors: number
}

const mockUsageData: UsageData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  requests: Math.floor(Math.random() * 100000),
  latency: Math.floor(Math.random() * 100),
  errors: Math.floor(Math.random() * 100),
}))

export default function UsagePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">(
    "30d"
  )
  const [usageData] = useState<UsageData[]>(mockUsageData)

  const totalRequests = usageData.reduce((sum, day) => sum + day.requests, 0)
  const avgLatency = Math.round(
    usageData.reduce((sum, day) => sum + day.latency, 0) / usageData.length
  )
  const totalErrors = usageData.reduce((sum, day) => sum + day.errors, 0)
  const successRate = Math.round(
    ((totalRequests - totalErrors) / totalRequests) * 100
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Usage</h1>
          <p className="text-gray-400">
            Monitor your API usage and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="border-white/10 bg-black/50 p-4">
        <div className="flex items-center gap-4">
          <Calendar className="size-5 text-gray-400" />
          <div className="flex gap-2">
            {(["24h", "7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeframe(range)}
                className={`rounded-lg px-3 py-1 text-sm transition-colors ${
                  timeframe === range
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-white/10 bg-black/50 p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-blue-400" />
            <span className="text-sm text-gray-400">Total Requests</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {totalRequests.toLocaleString()}
          </div>
        </Card>

        <Card className="border-white/10 bg-black/50 p-4">
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-green-400" />
            <span className="text-sm text-gray-400">Average Latency</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {avgLatency}ms
          </div>
        </Card>

        <Card className="border-white/10 bg-black/50 p-4">
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Success Rate</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {successRate}%
          </div>
        </Card>

        <Card className="border-white/10 bg-black/50 p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-red-400" />
            <span className="text-sm text-gray-400">Total Errors</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {totalErrors.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Usage Chart */}
      <Card className="border-white/10 bg-black/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-blue-400" />
            <h2 className="font-semibold text-white">Request Volume</h2>
          </div>
          <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
            <option value="requests">Requests</option>
            <option value="latency">Latency</option>
            <option value="errors">Errors</option>
          </select>
        </div>
        <div className="h-[400px] rounded-lg border border-white/10 bg-black/50">
          {/* TODO: Add chart component */}
          <div className="flex h-full items-center justify-center text-gray-400">
            Chart placeholder
          </div>
        </div>
      </Card>

      {/* Usage Table */}
      <Card className="border-white/10 bg-black/50">
        <div className="border-b border-white/10 p-4">
          <h2 className="font-semibold text-white">Daily Usage</h2>
        </div>
        <div className="divide-y divide-white/5">
          {usageData.slice(0, 7).map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between p-4"
            >
              <div>
                <div className="font-medium text-white">{day.date}</div>
                <div className="text-sm text-gray-400">
                  {day.requests.toLocaleString()} requests
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-sm">
                  <div className="text-gray-400">Latency</div>
                  <div className="font-medium text-white">{day.latency}ms</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-400">Errors</div>
                  <div className="font-medium text-white">
                    {day.errors.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-400">Success Rate</div>
                  <div className="font-medium text-white">
                    {Math.round(
                      ((day.requests - day.errors) / day.requests) * 100
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
