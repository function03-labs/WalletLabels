"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Copy, ExternalLink, Maximize2 } from "lucide-react"
import JSONPretty from "react-json-pretty"

import { endpoints, jsonTheme } from "@/components/endpoints-section"
import { Button } from "@/components/ui/button"

export default function PlaygroundPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialEndpoint =
    endpoints.find((e) => e.path === searchParams.get("endpoint")) ||
    endpoints[0]

  const [selectedEndpoint, setSelectedEndpoint] = useState(initialEndpoint)
  const [params, setParams] = useState<Record<string, string>>({})
  const [response, setResponse] = useState(selectedEndpoint.response)
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">(
    "params"
  )

  const handleParamChange = (param: string, value: string) => {
    setParams((prev) => ({ ...prev, [param]: value }))
  }

  const getRequestUrl = () => {
    const queryParams = selectedEndpoint.params
      .map((param) => `${param}=${params[param] || "{" + param + "}"}`)
      .join("&")
    return `${selectedEndpoint.path}?${queryParams}`
  }

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>
            <h1 className="text-sm font-medium text-white">API Playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-white/10 bg-white/5 text-xs text-gray-400 hover:bg-white/10"
            >
              <Copy className="mr-2 size-3" />
              Copy as cURL
            </Button>
            <Button
              size="sm"
              className="h-8 bg-blue-500 text-xs hover:bg-blue-600"
            >
              Send Request
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-screen pt-14">
        {/* Sidebar */}
        <div className="w-[280px] border-r border-white/10">
          <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.path}
                onClick={() => {
                  setSelectedEndpoint(endpoint)
                  setParams({})
                  setResponse(endpoint.response)
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

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid h-full grid-cols-2 divide-x divide-white/10">
            {/* Request Panel */}
            <div className="flex flex-col">
              <div className="border-b border-white/10 p-4">
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

              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-white/10 px-2">
                  <div className="flex gap-4">
                    {(["params", "headers", "body"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`border-b-2 px-3 py-2 text-xs transition-colors ${
                          activeTab === tab
                            ? "border-blue-500 text-blue-400"
                            : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {activeTab === "params" && (
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
                  )}
                  {activeTab === "headers" && (
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <pre className="text-xs text-gray-400">
                        {JSON.stringify(
                          {
                            "Content-Type": "application/json",
                            Authorization: "Bearer {your-api-key}",
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                  {activeTab === "body" && (
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <pre className="text-xs text-gray-400">
                        {JSON.stringify(
                          {
                            // Add request body structure here
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Response Panel */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                    200 OK
                  </span>
                  <span className="text-xs text-gray-400">15 ms</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 border-white/10 bg-white/5 px-2 text-xs text-gray-400 hover:bg-white/10"
                >
                  <Copy className="mr-2 size-3" />
                  Copy Response
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <JSONPretty data={response} theme={jsonTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
