import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface SuggestChainModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuggestChainModal({ isOpen, onClose }: SuggestChainModalProps) {
  const [chainName, setChainName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the logic to send an email
    // For example, using an API route:
    try {
      const response = await fetch("/api/suggest-chain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainName }),
      })
      if (response.ok) {
        alert("Thank you for your suggestion!")
        onClose()
      } else {
        throw new Error("Failed to submit suggestion")
      }
    } catch (error) {
      console.error("Error submitting chain suggestion:", error)
      alert("Failed to submit suggestion. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="v.y4juk">
      <DialogContent data-oid="ns66gr.">
        <DialogHeader data-oid="5i5c3kw">
          <DialogTitle data-oid="w.yu315">Suggest a New Chain</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} data-oid="dmd4e52">
          <Input
            value={chainName}
            onChange={(e) => setChainName(e.target.value)}
            placeholder="Enter chain name"
            className="mb-4"
            data-oid="5gta6le"
          />

          <Button type="submit" data-oid="f9.hi_1">
            Submit Suggestion
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
