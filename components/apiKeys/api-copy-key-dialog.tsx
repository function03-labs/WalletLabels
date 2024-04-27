"use client"

import React from "react"
import { CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import useClipboard from "../../lib/hooks/use-clipboard"

const CopyApiKeyDialog = ({
  apiKey = {
    key: "434mkdwmwcmcfm",
    id: 1,
    name: "My First API Key",
    createdDate: "2024-04-24T00:00:00.000Z",
    chains: ["Polygon", "Optimism", "Arbitrum"],
  },
  isOpen = false,
  onClose = () => {},
}) => {
  const { hasCopied, onCopy } = useClipboard(apiKey.key)
  const { toast } = useToast()

  return (
    <Dialog open={isOpen} onDismiss={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Generated</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Your API Key has been successfully generated.</p>
          <div className="flex w-full items-center justify-between">
            <Input
              value={apiKey.key}
              className={hasCopied ? "border-green-500 pr-4" : "pr-4"}
              readOnly
            />
            <Button
              aria-label="Copy API Key"
              onClick={() => {
                onCopy()
                toast({ title: "Copied to clipboard" })
              }}
              className={hasCopied ? "ml-2 bg-green-800" : "ml-2 bg-purple-800"}
              variant="outline"
              color={hasCopied ? "green" : "purple"}
            >
              <CopyIcon />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose} variant="outline" color="purple">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CopyApiKeyDialog
