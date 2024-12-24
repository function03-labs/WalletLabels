"use client"

import { useState } from "react"
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Clock,
  Key,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const stats = [
  {
    name: "Total Requests",
    value: "2.4M",
    change: "+12.3%",
    changeType: "positive",
  },
  {
    name: "Success Rate",
    value: "99.9%",
    change: "+0.1%",
    changeType: "positive",
  },
  {
    name: "Avg. Latency",
    value: "45ms",
    change: "-5ms",
    changeType: "positive",
  },
  {
    name: "Active Keys",
    value: "3",
    change: "of 5",
    changeType: "neutral",
  },
]

const recentRequests = [
  {
    endpoint: "/v1/market/prices",
    method: "GET",
    status: 200,
    latency: "42ms",
    timestamp: "2 mins ago",
  },
  {
    endpoint: "/v1/chain/transactions",
    method: "GET",
    status: 200,
    latency: "38ms",
    timestamp: "5 mins ago",
  },
  {
    endpoint: "/v1/defi/pools",
    method: "GET",
    status: 429,
    latency: "120ms",
    timestamp: "8 mins ago",
  },
]

export default function DashboardPage() {
  const [activeApiKey] = useState("sk_test_123...abc")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">
          Monitor your API usage and manage your keys
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-black/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="size-5 text-blue-400" />
              <h2 className="font-semibold text-white">Active API Key</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Manage Keys
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/50 p-3">
            <div className="flex items-center justify-between">
              <code className="text-sm text-blue-400">{activeApiKey}</code>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Copy
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-black/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-green-400" />
              <h2 className="font-semibold text-white">Current Plan</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Upgrade Plan
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Pro Plan</span>
              <span className="font-medium text-white">$299/month</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: "65%" }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">1.56M/2.4M requests</span>
              <span className="text-gray-400">Resets in 12 days</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="border-white/10 bg-black/50 p-4 hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{stat.name}</span>
              <span
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-400"
                    : stat.changeType === "negative"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Requests */}
      <Card className="border-white/10 bg-black/50">
        <div className="border-b border-white/10 p-4">
          <h2 className="font-semibold text-white">Recent Requests</h2>
        </div>
        <div className="divide-y divide-white/5">
          {recentRequests.map((request, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    request.method === "GET"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {request.method}
                </div>
                <span className="font-mono text-sm text-white">
                  {request.endpoint}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="size-4 text-gray-400" />
                  <span className="text-gray-400">{request.timestamp}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="size-4 text-gray-400" />
                  <span className="text-gray-400">{request.latency}</span>
                </div>
                {request.status === 200 ? (
                  <span className="text-green-400">{request.status}</span>
                ) : (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertCircle className="size-4" />
                    <span>{request.status}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Chart */}
      <Card className="border-white/10 bg-black/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-blue-400" />
            <h2 className="font-semibold text-white">API Usage</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            View Details
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
        <div className="h-[300px] rounded-lg border border-white/10 bg-black/50">
          {/* TODO: Add chart component */}
          <div className="flex h-full items-center justify-center text-gray-400">
            Chart placeholder
          </div>
        </div>
      </Card>
    </div>
  )
}
