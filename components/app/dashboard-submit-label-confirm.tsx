import React, { useState } from "react"
import { Addreth } from "addreth"
import { z } from "zod"

import { addressLabelSchema } from "@/config/schema"
import { createAddressLabel } from "@/lib/app/label"
import { useToast } from "@/lib/hooks/use-toast"

import { Icons } from "@/components/shared/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DashboardSubmitLabelConfirm({
  label,
  userId,
}: {
  label: z.infer<typeof addressLabelSchema>
  userId: string
}) {
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(true)

  async function handleConfirmSubmit() {
    setLoading(true)
    try {
      await createAddressLabel(label, userId)
      toast({
        title: "Label created successfully",
      })
    } catch (error) {
      toast({
        title: "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setShowConfirmation(false)
    }
  }
  return (
    <AlertDialog
      defaultOpen
      open={showConfirmation}
      onOpenChange={setShowConfirmation}
    >
      <AlertDialogContent className="sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Please review the details below and confirm the action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Address name</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead>Label type</TableHead>
                <TableHead>Label Sub-type</TableHead>
                <TableHead className="text-right">Label</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {/* @ts-ignore: Unreachable code error */}
                  <Addreth address={label.address} theme="unified-light" />
                </TableCell>
                <TableCell>{label.addressName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {label.blockchain}
                  </Badge>
                </TableCell>
                <TableCell>{label.labelType}</TableCell>
                <TableCell>{label.labelSubType}</TableCell>
                <TableCell className="text-right">{label.label}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleConfirmSubmit}>
            {loading && (
              <Icons.loading className="-ml-1 mr-2 size-5 animate-spin" />
            )}
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
