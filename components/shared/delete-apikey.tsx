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
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-2 text-primary">Delete API Key</DialogTitle>
        <DialogDescription className="text-primary">
          Are you sure you want to delete this API key? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="destructive"
          className="mx-auto space-x-2 font-bold sm:mx-0"
          onClick={handleDelete}
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <MoreVertical className="size-5" aria-label="More Options" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="w-full"
              onClick={() => {
                setDropdownOpen(false)
                setOpen(true)
              }}
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
      />
    </Dialog>
  )
}
