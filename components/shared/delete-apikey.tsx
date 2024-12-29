"use client"

import { useRouter } from "next/navigation"
import { ApiKey } from "@prisma/client"
import { MoreVertical } from "lucide-react"

import { deleteApiKey } from "@/lib/app/api-key"
import { useToast } from "@/lib/hooks/use-toast"

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
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
}: {
  apiKey: ApiKey
  userEmail: string | null
}) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      if (!userEmail) {
        throw new Error("User email is required")
      }
      await deleteApiKey(apiKey.id, apiKey.key, apiKey.userId, userEmail)
      toast({
        title: "API Key deleted",
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error deleting API key",
      })
    }
  }

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete API Key</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this API key? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteAPIKey({
  apiKey,
  userEmail,
}: {
  apiKey: ApiKey
  userEmail: string | null
}) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <MoreVertical className="size-5" aria-label="More Options" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="w-full">Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeleteAPIKey apiKey={apiKey} userEmail={userEmail} />
    </Dialog>
  )
}
