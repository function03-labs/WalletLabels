"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { jsonTheme } from "./endpoints-section"

const apiExamples = [
  {
    title: "Financials API",
    description:
      "Access detailed income statements, balance sheets, and cash flow data.",
    endpoint: "GET /financials",
    tags: ["Real-time", "Historical"],
    response: {
      income_statements: [
        {
          ticker: "AAPL",
          calendar_date: "2024-06-30",
          revenue: 385603000000,
          gross_profit: 177231000000,
          operating_income: 120594000000,
        },
      ],
    },
  },
  {
    title: "Prices API",
    description:
      "Get real-time and historical stock prices with market activity.",
    endpoint: "GET /prices",
    tags: ["Real-time", "Market Data"],
    response: {
      ticker: "AAPL",
      prices: [
        {
          open: 228,
          close: 228.1,
          volume: 8199,
          time: "2024-10-14 04:00:00 EDT",
        },
      ],
    },
  },
  {
    title: "Options API",
    description: "Access options chain data including strikes and Greeks.",
    endpoint: "GET /options",
    tags: ["Real-time", "Options"],
    response: {
      ticker: "AAPL",
      expiration_date: "2024-07-19",
      strikes: [
        {
          strike: 180,
          call: {
            bid: 5.05,
            ask: 5.15,
            delta: 0.45,
          },
        },
      ],
    },
  },
  {
    title: "SEC Filings API",
    description: "Search and retrieve SEC filings and reports.",
    endpoint: "GET /sec-filings",
    tags: ["Historical", "Filings"],
    response: {
      ticker: "AAPL",
      filings: [
        {
          form_type: "10-K",
          filing_date: "2024-10-27",
          accession_number: "0000320193-24-000070",
        },
      ],
    },
  },
]

export function ApiExampleSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [selectedExample, setSelectedExample] = useState(apiExamples[0])
  const [activeTab, setActiveTab] = useState<"preview" | "headers">("preview")

  const copyToClipboard = async (text: object, index: number) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(text, null, 2))
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-4 bg-white/10" />
            <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs text-blue-400">
              Premium data
            </span>
            <div className="h-px w-4 bg-white/10" />
          </div>
          <h2 className="mb-4 text-3xl font-bold">
            Stock market data to power your financial agents
          </h2>
          <p className="text-gray-400">
            We provide comprehensive financial statements, stock prices, options
            data, SEC filings, and more. Our search API is optimized for LLMs
            and RAG.
          </p>
        </div>

        <Card className="overflow-hidden border border-white/10 bg-black">
          <div className="flex">
            {/* Examples List */}
            <div className="w-[280px] border-r border-white/10">
              <div className="sticky top-0 border-b border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-white">
                  Available Endpoints
                </h3>
              </div>
              <div className="space-y-px">
                {apiExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedExample(example)}
                    className={`group w-full border-b border-white/5 p-3 text-left transition-colors hover:bg-white/[0.02] ${
                      selectedExample === example
                        ? "bg-blue-500/5 text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-400">
                            GET
                          </span>
                          <span className="text-sm font-medium">
                            {example.title}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] text-gray-500">
                          {example.description}
                        </p>
                      </div>
                      <ChevronRight className="size-4 text-gray-600 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Example Details */}
            <div className="flex-1 p-4">
              <div className="space-y-4">
                {/* Endpoint Info */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white">
                      {selectedExample.title}
                    </h3>
                    <div className="flex gap-1">
                      {selectedExample.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-xs text-blue-400">
                        {selectedExample.endpoint}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            selectedExample.response,
                            apiExamples.indexOf(selectedExample)
                          )
                        }
                        className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                      >
                        {copiedIndex ===
                        apiExamples.indexOf(selectedExample) ? (
                          <Check className="size-3 text-green-500" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Response Preview */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[10px] font-medium text-gray-400">
                        Response Preview
                      </h4>
                      <div className="flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/5 px-2 py-0.5">
                        <div className="size-1 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-medium text-green-500">
                          200 OK
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500">15ms</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("preview")}
                        className={`text-[10px] transition-colors ${
                          activeTab === "preview"
                            ? "text-blue-400"
                            : "text-gray-500 hover:text-gray-400"
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setActiveTab("headers")}
                        className={`text-[10px] transition-colors ${
                          activeTab === "headers"
                            ? "text-blue-400"
                            : "text-gray-500 hover:text-gray-400"
                        }`}
                      >
                        Headers
                      </button>
                    </div>
                  </div>
                  <motion.div
                    key={`${selectedExample.endpoint}-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-lg border border-white/10 bg-black/20"
                  >
                    {activeTab === "preview" ? (
                      <div className="max-h-[400px] overflow-y-auto p-3">
                        <pre className="font-mono text-xs">
                          <code>
                            {JSON.stringify(selectedExample.response, null, 2)}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <div className="space-y-2 p-3 font-mono text-xs">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            Content-Type:
                          </span>
                          <span className="text-gray-400">
                            application/json
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            Server:
                          </span>
                          <span className="text-gray-400">
                            walletlabels-api/1.0
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            Cache-Control:
                          </span>
                          <span className="text-gray-400">
                            max-age=0, private, must-revalidate
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            X-Request-Id:
                          </span>
                          <span className="text-gray-400">
                            01HNK5GQXJ8N5T9B2M3R4K5V6W
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            X-Runtime:
                          </span>
                          <span className="text-gray-400">0.015632</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            Date:
                          </span>
                          <span className="text-gray-400">
                            {new Date().toUTCString()}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-gray-500">
                          Size:
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {
                            new Blob([JSON.stringify(selectedExample.response)])
                              .size
                          }{" "}
                          bytes
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            activeTab === "preview"
                              ? selectedExample.response
                              : {
                                  "Content-Type": "application/json",
                                  Server: "walletlabels-api/1.0",
                                  "Cache-Control":
                                    "max-age=0, private, must-revalidate",
                                  "X-Request-Id": "01HNK5GQXJ8N5T9B2M3R4K5V6W",
                                  "X-Runtime": "0.015632",
                                  Date: new Date().toUTCString(),
                                },
                            apiExamples.indexOf(selectedExample)
                          )
                        }
                        className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                      >
                        {copiedIndex ===
                        apiExamples.indexOf(selectedExample) ? (
                          <Check className="size-3 text-green-500" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
