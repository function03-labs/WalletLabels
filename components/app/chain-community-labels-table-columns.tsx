"use client"

import * as React from "react"
import { AddressLabel } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/app/chain-community-labels-data-table-column-header"
import { Badge } from "@/components/ui/badge"

export function getColumns(): ColumnDef<AddressLabel>[] {
  return [
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => <div className="w-20">fancy address</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "addressName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address name" />
      ),
      cell: ({ row }) => {
        /*         const label = tasks.label.enumValues.find(
          (label) => label === row.original.label
        )
 */
        return (
          <div className="flex space-x-2">
            <Badge variant="outline">blockchain</Badge>
            <span className="max-w-[31.25rem] truncate font-medium">
              addressName
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "labelType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Label type" />
      ),
      cell: ({ row }) => {
        /* const status = tasks.status.enumValues.find(
          (status) => status === row.original.status
        ) */

        return (
          <div className="flex w-[6.25rem] items-center">
            <span className="capitalize">labelType</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "labelSubType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Label Sub-type" />
      ),
      cell: ({ row }) => {
        /* const priority = tasks.priority.enumValues.find(
          (priority) => priority === row.original.priority
        )

        if (!priority) return null */

        return (
          <div className="flex items-center">
            <span className="capitalize">labelSubType</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "label",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Label" />
      ),
      cell: ({ row }) => {
        /* const priority = tasks.priority.enumValues.find(
          (priority) => priority === row.original.priority
        )

        if (!priority) return null */

        return (
          <div className="flex items-center">
            <span className="capitalize">label</span>
          </div>
        )
      },
    },
  ]
}
