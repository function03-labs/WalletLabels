import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Label {
  _id: string
  id: string
  name: string
  ens: string
  handle: string
  followers: number
  verified: boolean
  updated: string
  pfp: string // URL to the profile picture
}

export const columns: ColumnDef<Label>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const label = row.original
      return (
        <div className="flex items-center">
          {label.pfp && (
            <img
              src={label.pfp}
              alt={label.name}
              className="h-8 w-8 rounded-full mr-2"
            />
          )}
          {label.name}
          {label.verified && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
              Verified
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "ens",
    header: "ENS",
  },
  {
    accessorKey: "handle",
    header: "Handle",
    cell: ({ row }) => {
      const label = row.original
      return (
        <div className="flex items-center">
          {label.verified && (
            <span className="mr-1 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
          {label.handle}
        </div>
      )
    },
  },
  {
    accessorKey: "followers",
    header: "Followers",
    cell: ({ row }) => {
      const followers = row.getValue("followers")
      const formattedFollowers = followers.toLocaleString() // Format followers with commas
      return <div className="text-right">{formattedFollowers}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const label = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                window.open(
                  `https://etherscan.io/address/${label.id}`,
                  "_blank"
                )
              }
            >
              Open on Etherscan
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(label.id)}
            >
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open(`https://twitter.com/${label.handle}`, "_blank")
              }
            >
              Open on Twitter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
