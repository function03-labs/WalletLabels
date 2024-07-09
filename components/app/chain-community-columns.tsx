"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

import type { communityLabelSchema } from "@/config/schema"
import { pick } from "@/lib/utils/color-picker"

import { Badge } from "@/components/ui/badge"

type Schema = z.infer<typeof communityLabelSchema>

export const columns: ColumnDef<Schema>[] = [
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "labelType",
    header: "Label Type",
  },
  {
    accessorKey: "addressName",
    header: "Address Name",
    cell: ({ row }) => {
      const value = row.getValue("addressName")
      return <div className="text-muted-foreground">{`${value as string}`}</div>
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id)
      if (typeof value === "string") return value === String(rowValue)
      if (Array.isArray(value)) return value.includes(rowValue)
      return false
    },
  },
  {
    accessorKey: "labelSubType",
    header: "Label Sub-type",
    cell: ({ row }) => {
      const value = row.getValue("labelSubType")
      // TODO: Add the dark theme
      return <Badge className={pick(value as string)}>{value as string}</Badge>
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id)
      if (typeof value === "string") return value === String(rowValue)
      if (Array.isArray(value)) return value.includes(rowValue)
      return false
    },
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => {
      const value = row.getValue("label")
      return <div className="text-muted-foreground">{`${value as string}`}</div>
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id)
      if (typeof value === "string") return value === String(rowValue)
      if (Array.isArray(value)) return value.includes(rowValue)
      return false
    },
  },
]
