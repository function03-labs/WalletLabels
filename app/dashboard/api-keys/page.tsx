"use client"

import { useState } from "react"
import { ApiKey } from "@aws-sdk/client-api-gateway"
import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import CopyApiKeyDialog from "@/components/apiKeys/api-copy-key-dialog"
import ApiCreateDialog from "@/components/apiKeys/api-dialog"
import ApiKeysTable from "@/components/apiKeys/api-keys-table"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default function PageDashboardApiKeys() {
  const { toast } = useToast()
  const [generatedKey, setGeneratedKey] = useState<ApiKey | null>({
    id: "3",
    name: "My API Key",
    key: "657ccb71-b75496ea97-74581e2-c1d73469",
  })
  const [showCopyKeyDialog, setShowCopyKeyDialog] = useState(false)

  const generateApiKey = async (name: string) => {
    try {
      const response = await fetch("/api/apiKeys/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        console.error("Failed to generate API key. Status:", response.status)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      const newKey: ApiKey = {
        id: data.apiKeyDetails.id,
        name: data.apiKeyDetails.name,
        key: data.apiKeyDetails.value,
        createdDate: data.apiKeyDetails.createdDate,
        chains: ["Polygon", "Optimism", "Arbitrum", "Ethereum", "Solana"],
      }
      setGeneratedKey(newKey)
      console.log(newKey)
      setShowCopyKeyDialog(true)
    } catch (error) {
      console.error("Error generating API key:", error)
      setShowCopyKeyDialog(false)
      // setShowErrorDialog(true)
    }
  }
  const onSubmit = async (data: { name: string }) => {
    toast({
      description: "Your API Key is being Generated!",
    })
    await generateApiKey(data.name)
  }
  return (
    <motion.div
      animate="show"
      className="flex w-full items-center justify-between"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <section className="w-full p-10">
        <div>
          <h3 className="text-4xl font-normal">API Keys</h3>
          <IsSignedOut>
            <div className="flex items-center justify-between gap-x-5 text-center">
              <span className="text-sm text-foreground">
                Authenticate to access your api keys.
              </span>

              <ApiCreateDialog onSubmit={onSubmit} apiKeysCount={undefined} />
              <CopyApiKeyDialog
                apiKey={generatedKey}
                isOpen={showCopyKeyDialog}
                onClose={() => setShowCopyKeyDialog(false)}
              />
            </div>
            <ApiKeysTable></ApiKeysTable>
          </IsSignedOut>
        </div>
        <hr className="my-5 opacity-50" />
        <IsSignedIn>
          <Card className="w-full p-6">
            <h3 className="text-2xl font-normal">Api Keys</h3>
          </Card>
        </IsSignedIn>
      </section>
    </motion.div>
  )
}
