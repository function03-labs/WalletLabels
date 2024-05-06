"use client"

import { useRouter } from "next/navigation"
import { ApiKey } from "@prisma/client"
import { Ellipsis } from "lucide-react"

import { deleteApiKey } from "@/lib/app/api-key"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export function DialogDeleteAPIKey({ apiKey }: { apiKey: ApiKey }) {
  const router = useRouter()
  const { toast } = useToast()

  async function deleteAPIKey() {
    try {
      await deleteApiKey(apiKey.id, apiKey.userId)
      toast({ title: "API Key deleted successfully" })
      router.refresh()
    } catch (error) {
      toast({ title: "An error occurred", variant: "destructive" })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="dark:text-white">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the API
          key.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="dark:text-white">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={deleteAPIKey}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export function DeleteAPIKey({ apiKey }: { apiKey: ApiKey }) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <Ellipsis className="size-5" aria-label="More Options" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem className="w-full">Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeleteAPIKey apiKey={apiKey} />
    </AlertDialog>
  )
}
