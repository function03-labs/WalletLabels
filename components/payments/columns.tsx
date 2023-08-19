import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, MoreHorizontal, BadgeCheck } from "lucide-react"
import Avatar from "boring-avatars";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useEnsResolver } from "@/hooks/useEnsResolver"
import { Inter } from "@next/font/google"
import { fontMono, fontMonoJetBrains } from "@/pages/_app"

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
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
        <div className="flex items-center gap-1">
          {label.pfp && (
            <img
              src={label.pfp}
              alt={label.name}
              className="mr-2 h-8 w-8 rounded-full"
            />
          )}
          {label.name}
          {label.verified && (
            <BadgeCheck size={20} className="text-blue-500 
            hover:scale-125" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const { ens } = row.original;
      const { address, loading, hasError } = useEnsResolver(ens);

      // If the data is loading, return a loading skeleton
      if (loading && !hasError) {
        return <div className="skeleton-loader animate-pulse text-gray-400" style={fontMonoJetBrains.style}  >Loading...</div>;
      }
      if (hasError) {
        return <div className="skeleton-loader text-red-400" style={fontMonoJetBrains.style} >Address Not Found..</div>;
      }

      // If the address is too long, truncate it
      console.log(address, hasError);
      const truncatedAddress = `${address.substring(0, 8)}...${address.substring(address.length - 4)}`;

      return <Link href={
        `https://etherscan.io/address/${address}`
      } title={address} style={fontMonoJetBrains.style} className=" flex  gap-2 items-center
      text-gray-500 
      hover:underline
       " >
        <Avatar
          size={20}
          name={address}
          variant="pixel"
          colors={Array.from({ length: 5 }, () => generateRandomColor())}
        />
        {truncatedAddress}</Link >;
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

          <Link
            href={`https://twitter.com/${label.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {`@${label.handle.toLowerCase()}`}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "followers",
    header: ({ column }) => <div className=" text-right">Followers</div>,
    cell: ({ row }) => {
      const followers = row.getValue("followers")
      const formattedFollowers = followers.toLocaleString() // Format followers with commas
      return <div className="text-right">{formattedFollowers}</div>
    },
  },
  {
    accessorKey: "netWorth",
    header: () => <div className="text-right text-gray-600 font-bold">Net Worth</div>,
    cell: ({ row }) => {
      const netWorth = row.getValue("netWorth");

      // Format net worth as a currency
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const formattedNetWorth = formatter.format(netWorth);

      return (
        <div className="text-right text-gray-700">
          {formattedNetWorth}
        </div>
      );
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

