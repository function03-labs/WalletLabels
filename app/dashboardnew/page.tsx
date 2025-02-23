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
import { useSession } from "next-auth/react"

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
  const { data: session } = useSession()
  const [activeApiKey] = useState("sk_test_123...abc")

  return (
    <div className="space-y-8" data-oid="6rajmli">
      {/* Header */}
      <div data-oid="h-sscyi">
        <h1 className="text-2xl font-bold text-white" data-oid="5i60qe5">
          Welcome to WalletLabels API 👋
        </h1>
        <p className="text-gray-400" data-oid="fo:5p4_">
          Get started with our powerful blockchain data API
        </p>
      </div>

      {/* Getting Started */}
      <Card className="border-white/10 bg-black/50 p-6" data-oid=":b65okt">
        <div className="mb-6 flex items-center gap-2" data-oid="t-6uyq-">
          <div className="rounded-full bg-blue-500/10 p-2" data-oid=":lunxfn">
            <ArrowRight className="size-5 text-blue-400" data-oid="pg.rnhw" />
          </div>
          <h2 className="font-semibold text-white" data-oid="hsdgspd">
            Getting Started
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3" data-oid="zl7ucfy">
          <div className="space-y-2" data-oid="6aehcyk">
            <div
              className="flex size-8 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400"
              data-oid="cs-i..l"
            >
              1
            </div>
            <h3 className="font-medium text-white" data-oid="17iqcpx">
              Get Your API Key
            </h3>
            <p className="text-sm text-gray-400" data-oid="9.qmvnp">
              Create an API key to start making requests to our endpoints.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
              data-oid="k678b5d"
            >
              Create Key
              <ArrowRight className="ml-2 size-4" data-oid="c7e_sgp" />
            </Button>
          </div>
          <div className="space-y-2" data-oid="iyj0ej8">
            <div
              className="flex size-8 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400"
              data-oid="-i_w-7p"
            >
              2
            </div>
            <h3 className="font-medium text-white" data-oid="dr244of">
              Read the Docs
            </h3>
            <p className="text-sm text-gray-400" data-oid="jnw8v_c">
              Explore our comprehensive API documentation and guides.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
              data-oid="ept5_8b"
            >
              View Docs
              <ArrowRight className="ml-2 size-4" data-oid="olq2.6z" />
            </Button>
          </div>
          <div className="space-y-2" data-oid="vjmgbsu">
            <div
              className="flex size-8 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400"
              data-oid="6vw9.r9"
            >
              3
            </div>
            <h3 className="font-medium text-white" data-oid="voxx7dc">
              Make Your First Request
            </h3>
            <p className="text-sm text-gray-400" data-oid="tmwsxz_">
              Try out our API with example requests and responses.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
              data-oid="4vr5_8w"
            >
              Try API
              <ArrowRight className="ml-2 size-4" data-oid="kc_a:-7" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2" data-oid="8_wgduc">
        <Card className="border-white/10 bg-black/50 p-6" data-oid="9l18zr:">
          <div
            className="mb-4 flex items-center justify-between"
            data-oid="t416oub"
          >
            <div className="flex items-center gap-2" data-oid="k2ikciq">
              <Key className="size-5 text-blue-400" data-oid="gzfiffr" />
              <h2 className="font-semibold text-white" data-oid="_hginet">
                Active API Key
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              data-oid="0pgv3e6"
            >
              Manage Keys
              <ArrowRight className="ml-2 size-4" data-oid="7bf47e7" />
            </Button>
          </div>
          <div
            className="rounded-lg border border-white/10 bg-black/50 p-3"
            data-oid="pwt8h30"
          >
            <div
              className="flex items-center justify-between"
              data-oid="ryn48uu"
            >
              <code className="text-sm text-blue-400" data-oid="gtmjcul">
                {activeApiKey}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                data-oid="k08giiu"
              >
                Copy
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-black/50 p-6" data-oid="1sdrhw4">
          <div
            className="mb-4 flex items-center justify-between"
            data-oid="77skdcc"
          >
            <div className="flex items-center gap-2" data-oid="8s4:uc-">
              <Activity className="size-5 text-green-400" data-oid="ptn7lde" />
              <h2 className="font-semibold text-white" data-oid="nhd05.2">
                Current Plan
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              data-oid="ly3a4bt"
            >
              Upgrade Plan
              <ArrowRight className="ml-2 size-4" data-oid="5yq_.fd" />
            </Button>
          </div>
          <div className="space-y-2" data-oid="ov0:hkk">
            <div
              className="flex items-center justify-between"
              data-oid="8q:-h_i"
            >
              <span className="text-gray-400" data-oid="vg-z1uo">
                Pro Plan
              </span>
              <span className="font-medium text-white" data-oid="qff328y">
                $299/month
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-white/5"
              data-oid="5x9f2w9"
            >
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: "65%" }}
                data-oid="thv7yzk"
              />
            </div>
            <div
              className="flex items-center justify-between text-sm"
              data-oid="ef_2_5t"
            >
              <span className="text-gray-400" data-oid=":eq9qh2">
                1.56M/2.4M requests
              </span>
              <span className="text-gray-400" data-oid="gf3tafc">
                Resets in 12 days
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4" data-oid="_o-oofq">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="border-white/10 bg-black/50 p-4 hover:border-white/20"
            data-oid="vf81s7z"
          >
            <div
              className="flex items-center justify-between"
              data-oid="sih6ayg"
            >
              <span className="text-sm text-gray-400" data-oid="heff8at">
                {stat.name}
              </span>
              <span
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-400"
                    : stat.changeType === "negative"
                      ? "text-red-400"
                      : "text-gray-400"
                }`}
                data-oid="xacn3rm"
              >
                {stat.change}
              </span>
            </div>
            <div
              className="mt-2 text-2xl font-bold text-white"
              data-oid="kgp72b6"
            >
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Server Status */}
      <Card className="border-white/10 bg-black/50" data-oid="ynxx0n1">
        <div className="border-b border-white/10 p-4" data-oid="etxb4z-">
          <h2 className="font-semibold text-white" data-oid="urkx744">
            Server Status
          </h2>
        </div>
        <div className="divide-y divide-white/5" data-oid="07g_-ph">
          {[
            {
              name: "API Gateway",
              status: "Operational",
              latency: "23ms",
              uptime: "99.99%",
            },
            {
              name: "Blockchain Indexer",
              status: "Operational",
              latency: "45ms",
              uptime: "99.95%",
            },
            {
              name: "WebSocket Server",
              status: "Operational",
              latency: "12ms",
              uptime: "99.99%",
            },
            {
              name: "Database Cluster",
              status: "Operational",
              latency: "18ms",
              uptime: "100%",
            },
          ].map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-4 hover:bg-white/[0.02]"
              data-oid=".bbo3ym"
            >
              <div className="flex items-center gap-3" data-oid="9nljzl3">
                <div
                  className="flex size-2 rounded-full bg-green-400"
                  data-oid="e-2_dwz"
                />

                <span className="font-medium text-white" data-oid="u0ul-35">
                  {service.name}
                </span>
              </div>
              <div
                className="flex items-center gap-6 text-sm"
                data-oid="k06xb49"
              >
                <div className="flex items-center gap-2" data-oid="nq:fr.d">
                  <Clock className="size-4 text-gray-400" data-oid="ecei56d" />
                  <span className="text-gray-400" data-oid="b9qdri0">
                    {service.latency}
                  </span>
                </div>
                <div className="flex items-center gap-2" data-oid=".tph--z">
                  <Activity
                    className="size-4 text-gray-400"
                    data-oid="_ngf8ay"
                  />

                  <span className="text-gray-400" data-oid="ql7e67i">
                    {service.uptime}
                  </span>
                </div>
                <span
                  className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400"
                  data-oid="rpyf-kx"
                >
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
