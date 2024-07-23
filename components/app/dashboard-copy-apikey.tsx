import { useRouter } from "next/navigation"
import { ApiKey } from "@prisma/client"
import { CheckIcon, CopyIcon } from "lucide-react"

import useClipboard from "@/lib/hooks/use-clipboard"
import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function DashboardCopyAPIKey({ apiKey }: { apiKey: ApiKey }) {
  const router = useRouter()
  const { toast } = useToast()
  const { hasCopied, onCopy } = useClipboard(apiKey.key)

  return (
    <DialogContent>
      <DialogTitle className="dark:text-white">API Key Generated</DialogTitle>
      <p className="dark:text-white">
        Your API Key has been successfully generated.
      </p>
      <div className="flex w-full items-center justify-between space-x-3">
        <Input
          value={apiKey.key}
          className={
            hasCopied
              ? "border-green-500 pr-4 dark:text-white"
              : "pr-4 dark:text-white"
          }
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
          <Button>Done</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
