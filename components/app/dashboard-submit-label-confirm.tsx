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
      data-oid="h2:3wrm"
    >
      <AlertDialogContent className="sm:max-w-[800px]" data-oid=":u50-s-">
        <AlertDialogHeader data-oid="cxnwgvi">
          <AlertDialogTitle className="dark:text-white" data-oid="vs9tm23">
            Confirm Action
          </AlertDialogTitle>
          <AlertDialogDescription className="" data-oid="q5hez5h">
            Please review the details below and confirm the action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="overflow-hidden rounded-lg border" data-oid="e8w1r5p">
          <Table data-oid="kley27d">
            <TableHeader data-oid="pvpmi:a">
              <TableRow data-oid="9d3qhzq">
                <TableHead data-oid="irvyq7l">Address</TableHead>
                <TableHead data-oid="qw2fxbv">Address name</TableHead>
                <TableHead data-oid="k46rzdt">Chain</TableHead>
                <TableHead data-oid="p0cjiif">Label type</TableHead>
                <TableHead data-oid="6k.l3_q">Label Sub-type</TableHead>
                <TableHead className="text-right" data-oid="9nqfrh.">
                  Label
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody data-oid="u03ucu3">
              <TableRow data-oid="y93q0g2">
                <TableCell className="font-medium" data-oid="hd-ktig">
                  {/* @ts-ignore: Unreachable code error */}
                  <Addreth
                    address={label.address}
                    theme="unified-light"
                    data-oid="bhf5xb1"
                  />
                </TableCell>
                <TableCell className="dark:text-white" data-oid="ybahs9m">
                  {label.addressName}
                </TableCell>
                <TableCell data-oid="3aqh0gr">
                  <Badge
                    variant="outline"
                    className="capitalize"
                    data-oid="j-9wmui"
                  >
                    {label.blockchain}
                  </Badge>
                </TableCell>
                <TableCell className="dark:text-white" data-oid="sly:ic1">
                  {label.labelType}
                </TableCell>
                <TableCell className="dark:text-white" data-oid="fg4qgye">
                  {label.labelSubType}
                </TableCell>
                <TableCell
                  className="text-right dark:text-white"
                  data-oid=":folo:0"
                >
                  {label.label}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <AlertDialogFooter data-oid="y..7n1l">
          <AlertDialogCancel
            className="dark:text-white"
            disabled={loading}
            data-oid="7r_yjuk"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirmSubmit}
            data-oid="34tmu5s"
          >
            {loading && (
              <Icons.loading
                className="-ml-1 mr-2 size-5 animate-spin"
                data-oid="i52-t95"
              />
            )}
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
