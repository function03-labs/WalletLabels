"use client"

import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

import { deleteUser } from "@/lib/app/user-profile"
import { useToast } from "@/lib/hooks/use-toast"

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

export function DialogDeleteAccount({ user }: { user: User }) {
  const router = useRouter()
  const { toast } = useToast()

  async function deleteAPIKey() {
    try {
      await deleteUser(user.id)
      toast({ title: "Account deleted successfully" })
      router.refresh()
    } catch (error) {
      toast({ title: "An error occurred", variant: "destructive" })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="dark:text-white">Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="dark:text-white">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={deleteAPIKey}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export function DashboardProfileDeleteAccount({ user }: { user: User }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>Delete Account</Button>
      </AlertDialogTrigger>
      <DialogDeleteAccount user={user} />
    </AlertDialog>
  )
}
