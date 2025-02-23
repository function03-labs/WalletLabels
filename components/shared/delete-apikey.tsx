"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ApiKey } from "@prisma/client"
import { MoreVertical } from "lucide-react"

import { deleteApiKey } from "@/lib/app/api-key"
import { useToast } from "@/lib/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DialogDeleteAPIKey({
  apiKey,
  userEmail,
  onClose,
}: {
  apiKey: ApiKey
  userEmail: string | null
  onClose: () => void
}) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      if (!userEmail) {
        throw new Error("User email is required")
      }
      await deleteApiKey(apiKey.id, apiKey.userId, userEmail)
      toast({
        title: "API Key deleted",
      })
      router.refresh()
      onClose()
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error deleting API key",
      })
    }
  }

  return (
    <DialogContent data-oid="hvt5-5z">
      <DialogHeader data-oid="-e51s5l">
        <DialogTitle className="mb-2 text-primary" data-oid="qa-anuq">
          Delete API Key
        </DialogTitle>
        <DialogDescription className="text-primary" data-oid=".g:tsag">
          Are you sure you want to delete this API key? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter data-oid="ykxkf99">
        <Button
          variant="destructive"
          className="mx-auto space-x-2 font-bold sm:mx-0"
          onClick={handleDelete}
          data-oid="jz-ks7v"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export function DeleteAPIKey({
  apiKey,
  userEmail,
}: {
  apiKey: ApiKey
  userEmail: string | null
}) {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen} data-oid="1ftvn3k">
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        data-oid="-itdyx5"
      >
        <DropdownMenuTrigger data-oid="q3hd93t">
          <Button size="icon" variant="ghost" data-oid="ilantw6">
            <MoreVertical
              className="size-5"
              aria-label="More Options"
              data-oid="q-5kb1g"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-oid="c6:ozco">
          <DialogTrigger asChild data-oid="0kx_009">
            <DropdownMenuItem
              className="w-full"
              onClick={() => {
                setDropdownOpen(false)
                setOpen(true)
              }}
              data-oid="p26jm6j"
            >
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeleteAPIKey
        apiKey={apiKey}
        userEmail={userEmail}
        onClose={() => setOpen(false)}
        data-oid="0q9y.q8"
      />
    </Dialog>
  )
}
