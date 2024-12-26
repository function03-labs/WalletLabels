"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Maximize2 } from "lucide-react"
import JSONPretty from "react-json-pretty"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const endpoints = [why 
  {
    name: "Income Statements",
    method: "GET",
    path: "/financials/income-statements",
    params: ["ticker", "start_date", "end_date"],
    description: "Get detailed income statements for any ticker",
    category: "Financials",
    response: {
      income_statements: [
        {
          ticker: "AAPL",
          calendar_date: "2024-06-30",
          revenue: 385603000000,
          gross_profit: 177231000000,
          operating_income: 120594000000,
          net_income: 96995000000,
          eps_basic: 6.24,
          eps_diluted: 6.12,
        },
      ],
    },
  },
  {
    name: "Balance Sheets",
    method: "GET",
    path: "/financials/balance-sheets",
    params: ["ticker", "date"],
    description: "Access complete balance sheet data",
    category: "Financials",
    response: {
      balance_sheets: [
        {
          ticker: "AAPL",
          calendar_date: "2024-06-30",
          total_assets: 352755000000,
          total_liabilities: 287912000000,
          total_equity: 64843000000,
          cash_and_equivalents: 34929000000,
          short_term_investments: 47507000000,
        },
      ],
    },
  },
  {
    name: "Stock Prices",
    method: "GET",
    path: "/market/prices",
    params: ["ticker", "interval", "limit"],
    description: "Real-time and historical price data",
    category: "Market",
    response: {
      ticker: "AAPL",
      prices: [
        {
          date: "2024-03-15",
          open: 172.54,
          high: 173.92,
          low: 171.96,
          close: 173.23,
          volume: 56729301,
          adjusted_close: 173.23,
        },
      ],
    },
  },
  {
    name: "Options Chain",
    method: "GET",
    path: "/market/options",
    params: ["ticker", "expiration_date", "strike_price"],
    description: "Complete options chain with Greeks",
    category: "Market",
    response: {
      ticker: "AAPL",
      expiration_date: "2024-04-19",
      chain: [
        {
          strike: 175.0,
          call: {
            bid: 3.15,
            ask: 3.2,
            implied_volatility: 0.235,
            delta: 0.45,
            gamma: 0.04,
            theta: -0.15,
          },
        },
      ],
    },
  },
]

export const jsonTheme = {
  main: `
    line-height: 1.5;
    color: #d4d4d4;
    background: transparent;
    overflow: auto;
    padding: 0;
  `,
  error: `
    line-height: 1.5;
    color: #ff5555;
    background: transparent;
    overflow: auto;
  `,
  key: `
    color: #4B9CD6;
    font-weight: 500;
  `,
  string: `
    color: #9CDCFE;
  `,
  value: `
    color: #CE9178;
  `,
  boolean: `
    color: #569CD6;
    font-weight: 500;
  `,
  number: `
    color: #B5CEA8;
  `,
  null: `
    color: #569CD6;
    font-weight: 500;
  `,
  bracket: `
    color: #808080;
  `,
  comma: `
    color: #808080;
  `,
}

export function EndpointsSection() {
  const router = useRouter()
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [params, setParams] = useState<Record<string, string>>({})

  const handleParamChange = (param: string, value: string) => {
    setParams((prev) => ({ ...prev, [param]: value }))
  }

  const getRequestUrl = () => {
    const queryParams = selectedEndpoint.params
      .map((param) => `${param}=${params[param] || "{" + param + "}"}`)
      .join("&")
    return `${selectedEndpoint.path}?${queryParams}`
  }

  const handleFullscreenClick = () => {
    router.push(
      `/playground?endpoint=${encodeURIComponent(selectedEndpoint.path)}`
    )
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Comprehensive API for financial data
          </h2>
          <p className="text-gray-400">
            Access all the endpoints you need with consistent response formats
          </p>
        </div>

        <Card className="overflow-hidden border border-white/10 bg-black">
          <div className="flex">
            {/* Endpoints List */}
            <div className="w-[280px] border-r border-white/10">
              <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-white">
                  API Endpoints
                </h3>
                <button
                  onClick={handleFullscreenClick}
                  className="group rounded-lg p-1 hover:bg-white/5"
                >
                  <Maximize2 className="size-4 text-gray-400 transition-colors group-hover:text-white" />
                </button>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.path}
                    onClick={() => {
                      setSelectedEndpoint(endpoint)
                      setParams({})
                    }}
                    className={`w-full border-b border-white/5 px-3 py-2 text-left transition-colors hover:bg-white/[0.02] ${
                      selectedEndpoint.path === endpoint.path
                        ? "bg-blue-500/5 text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                          endpoint.method === "GET"
                            ? "bg-green-500/10 text-green-400"
                            : endpoint.method === "POST"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="truncate text-xs">{endpoint.path}</span>
                    </div>
                    <div className="mt-0.5 truncate text-[10px] text-gray-500">
                      {endpoint.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Playground Preview */}
            <div className="flex-1 p-4">
              <div className="space-y-4">
                {/* Request Builder */}
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <h3 className="text-sm font-medium text-white">
                      {selectedEndpoint.name}
                    </h3>
                    <span className="text-[10px] text-gray-500">
                      {selectedEndpoint.category}
                    </span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-400">
                        {selectedEndpoint.method}
                      </span>
                      <code className="flex-1 font-mono text-xs text-blue-400">
                        {getRequestUrl()}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Parameters */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedEndpoint.params.map((param) => (
                    <div key={param} className="space-y-1">
                      <label className="block text-[10px] text-gray-400">
                        {param}:
                      </label>
                      <input
                        type="text"
                        value={params[param] || ""}
                        onChange={(e) =>
                          handleParamChange(param, e.target.value)
                        }
                        placeholder={param}
                        className="w-full rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-xs text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                    </div>
                  ))}
                </div>

                {/* Send Button with Fullscreen Link */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 border-blue-500/20 bg-blue-500/[0.02] py-1 text-xs text-blue-400 transition-all hover:-translate-y-px hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
                    variant="outline"
                  >
                    Send Request
                  </Button>
                  <button
                    onClick={handleFullscreenClick}
                    className="flex items-center justify-center rounded-md border border-white/10 bg-white/[0.02] px-2 text-gray-400 transition-all hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>

                {/* Response Preview */}
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-[10px] font-medium text-gray-400">
                      Response Preview
                    </h4>
                    <span className="text-[10px] text-gray-500">200 OK</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-3 text-xs">
                    <JSONPretty
                      data={selectedEndpoint.response}
                      theme={jsonTheme}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
