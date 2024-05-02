import { useRouter } from "next/navigation"
import { ApiKey } from "@prisma/client"
import { CheckIcon, CopyIcon } from "lucide-react"

import useClipboard from "@/lib/hooks/use-clipboard"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function DashboardCopyAPIKey({ apiKey }: { apiKey: ApiKey }) {
  const router = useRouter()
  const { toast } = useToast()
  const { hasCopied, onCopy } = useClipboard(apiKey.key)

  return (
    <div>
      <DialogHeader>
        <DialogTitle>API Key Generated</DialogTitle>
        <DialogClose />
      </DialogHeader>
      <DialogContent>
        <p>Your API Key has been successfully generated.</p>
        <div className="flex w-full items-center justify-between space-x-3">
          <Input
            value={apiKey.key}
            className={hasCopied ? "border-green-500 pr-4" : "pr-4"}
            readOnly
          />
          <Button
            aria-label="Copy API Key"
            onClick={() => {
              onCopy()
              router.refresh()
              toast({ title: "Copied to clipboard" })
            }}
            variant="secondary"
          >
            {hasCopied ? (
              <CheckIcon className="size-5" />
            ) : (
              <CopyIcon className="size-5" />
            )}
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </div>
  )
}
