"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Copy, Key, MoreVertical, Plus, Trash } from "lucide-react"
import { useSession } from "next-auth/react"

import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ApiKey {
  id: string
  key: string
  name: string
  createdAt: string
  lastUsed?: string
}

export default function ApiKeysPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch("/api/api-keys")
        if (!response.ok) {
          throw new Error("Failed to fetch API keys")
        }
        const data = await response.json()
        setApiKeys(data.apiKeys)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch API keys. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiKeys()
  }, [toast])

  const handleCreateKey = async () => {
    setIsCreating(true)
    try {
      const response = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "New API Key" }),
      })

      if (!response.ok) {
        throw new Error("Failed to create API key")
      }
      const newKey = (await response.json()) as { apiKey: ApiKey }
      setApiKeys((prev) => [...prev, newKey.apiKey])
      toast({
        title: "API Key Created",
        description: "Your new API key has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key)
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    })
  }

  const handleDeleteKey = async (id: string) => {
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete API key")
      }

      setApiKeys((prev) => prev.filter((key) => key.id !== id))
      toast({
        title: "API Key Deleted",
        description: "The API key has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-gray-400">Manage your API keys</p>
        </div>
        <Button
          onClick={handleCreateKey}
          disabled={isCreating}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {isCreating ? (
            "Creating..."
          ) : (
            <>
              <Plus className="mr-2 size-4" />
              Create New Key
            </>
          )}
        </Button>
      </div>

      {/* API Keys List */}
      <Card className="border-white/10 bg-black/50">
        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="size-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Key className="mb-2 size-8 text-gray-400" />
              <h3 className="text-lg font-medium text-white">No API Keys</h3>
              <p className="mt-1 text-sm text-gray-400">
                Create your first API key to get started
              </p>
            </div>
          ) : (
            apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Key className="size-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{apiKey.name}</h3>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-gray-400">
                        {apiKey.key}
                      </code>
                      <button
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="rounded p-1 text-gray-400 hover:bg-white/5 hover:text-white"
                      >
                        <Copy className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-sm text-gray-400">
                    <div>
                      Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                    </div>
                    {apiKey.lastUsed && (
                      <div>
                        Last used:{" "}
                        {new Date(apiKey.lastUsed).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                        <MoreVertical className="size-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleCopyKey(apiKey.key)}
                      >
                        <Copy className="mr-2 size-4" />
                        Copy API Key
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteKey(apiKey.id)}
                        className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                      >
                        <Trash className="mr-2 size-4" />
                        Delete Key
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* API Key Guidelines */}
      <Card className="border-yellow-500/10 bg-black/50 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="size-5 text-yellow-400" />
          <div>
            <h3 className="font-medium text-white">API Key Guidelines</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-400">
              <li>Never share your API keys publicly</li>
              <li>Rotate keys periodically for security</li>
              <li>Use different keys for development and production</li>
              <li>Delete unused keys to maintain security</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
