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
    <DialogContent data-oid="coes87o">
      <DialogTitle className="dark:text-white" data-oid="_p-h2q3">
        API Key Generated
      </DialogTitle>
      <p className="dark:text-white" data-oid="hk0eo6t">
        Your API Key has been successfully generated.
      </p>
      <div
        className="flex w-full items-center justify-between space-x-3"
        data-oid="yi-sdwy"
      >
        <Input
          value={apiKey.key}
          className={
            hasCopied
              ? "border-green-500 pr-4 dark:text-white"
              : "pr-4 dark:text-white"
          }
          readOnly
          data-oid="_1sboh9"
        />

        <Button
          aria-label="Copy API Key"
          onClick={() => {
            onCopy()
            router.refresh()
            toast({ title: "Copied to clipboard" })
          }}
          variant="secondary"
          data-oid="idoq_mn"
        >
          {hasCopied ? (
            <CheckIcon className="size-5" data-oid="-jih-jr" />
          ) : (
            <CopyIcon className="size-5" data-oid="4cwoj9x" />
          )}
        </Button>
      </div>
      <DialogFooter data-oid="orq_ynn">
        <DialogClose asChild data-oid="w54:pq-">
          <Button data-oid="b7u.z8e">Done</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
