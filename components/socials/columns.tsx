/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from "@tanstack/react-table";
import Avatar from "boring-avatars";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  MoreHorizontal,
  PlusCircle,
  PlusCircleIcon,
  PlusIcon,
  RedoDotIcon,
} from "lucide-react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import Lens from "../icons-social/lensIcon";
import OpenSea from "../icons-social/openseaIcon";
import { COLORS, stringToHash } from "./COLORS";
import TransactionHistory from "./transactions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEnsResolver } from "@/hooks/useEnsResolver";
import { fontMono, fontMonoJetBrains } from "@/pages/_app";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
interface BadgeProps {
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  const colorStyle = COLORS[Math.abs(stringToHash(label)) % COLORS.length];

  return (
    <span
      className="m-0.5 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200 
    dark:text-gray-100
    dark:ring-gray-700
    dark:ring-opacity-50
    
    "
    >
      <svg
        className={`h-1.5 w-1.5 ${colorStyle}`}
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      {label}
    </span>
  );
};

export interface Label {
  _id: string;
  id: string;
  name: string;
  ens: string;
  handle: string;
  followers: number;
  verified: boolean;
  updated: string;
  pfp: string; // URL to the profile picture
  labels: string[];
}

export const columns: ColumnDef<Label>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const label = row.original;
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
            <div className="ml-1 flex gap-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800 dark:bg-gray-700 dark:text-blue-400">
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                  />
                  <path
                    fill="#fff"
                    d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                  />
                </svg>
                <span className="sr-only">Icon description</span>
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                <Lens className="h-3 w-3" />
                <span className="sr-only">Icon description</span>
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                <OpenSea className="h-6 w-6" />
                <span className="sr-only">Icon description</span>
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "labels",
    header: "Labels",
    cell: ({ row }) => {
      // const { labels } = row.original;
      const labels: Array<string> = row.getValue("labels")
        ? row.getValue("labels")
        : ["trader", "nfts", "gamer", "artist", "trader", "nfts", "gamer"];

      return (
        <div className="relative">
          {/* <div className="absolute top-0 bottom-0 left-0 w-6 bg-fade-right z-10"></div> */}
          <div
            className="absolute inset-y-0 right-0 z-10 w-6 bg-fade-left dark:bg-fade-left-dark
          "
          ></div>
          <div
            className="flex max-w-[10rem] overflow-x-scroll whitespace-nowrap scrollbar-hide 
            "
          >
            {labels.map((label, idx) => (
              <Badge key={idx} label={label} />
            ))}
          </div>
        </div>
      );
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
        return (
          <div
            className="skeleton-loader animate-pulse text-gray-400
        dark:text-gray-600

        "
            style={fontMonoJetBrains.style}
          >
            Loading...
          </div>
        );
      }
      if (hasError) {
        return (
          <div
            className="skeleton-loader text-red-400 
        dark:text-red-600
        "
            style={fontMonoJetBrains.style}
          >
            Address Not Found..
          </div>
        );
      }

      // If the address is too long, truncate it
      console.log(address, hasError);
      const truncatedAddress = `${address.substring(
        0,
        8
      )}...${address.substring(address.length - 4)}`;

      return (
        <Link
          href={`https://etherscan.io/address/${address}`}
          title={address}
          style={fontMonoJetBrains.style}
          className=" flex  items-center gap-2
      text-gray-500 
      hover:underline
      dark:text-gray-400
       "
        >
          <Avatar
            size={20}
            name={address}
            variant="pixel"
            colors={Array.from({ length: 5 }, () => generateRandomColor())}
          />
          {truncatedAddress}
        </Link>
      );
    },
  },
  {
    accessorKey: "ens",
    header: "ENS",
  },
  // {
  //   accessorKey: "handle",
  //   header: "Handle",
  //   cell: ({ row }) => {
  //     const label = row.original
  //     return (
  //       <div className="flex items-center">

  //         <Link
  //           href={`https://twitter.com/${label.handle}`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="text-blue-500 hover:underline"
  //         >
  //           {`@${label.handle.toLowerCase()}`}
  //         </Link>
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: "followers",
    header: ({ column }) => <div className=" text-right">Followers</div>,
    cell: ({ row }) => {
      const followers = row.getValue("followers");
      const formattedFollowers = followers.toLocaleString(); // Format followers with commas
      return <div className="text-right">{formattedFollowers}</div>;
    },
  },
  {
    accessorKey: "transactions",
    header: () => (
      <div
        className="
    text-right"
      >
        Transactions
      </div>
    ),
    cell: ({ row }) => {
      if (true) {
        return (
          <div className="flex animate-pulse items-center justify-center">
            {/* Neutral state with 5 cells representing loading */}
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="mx-0.5 h-3.5 w-3.5 border-2 border-gray-300 bg-gray-200"
              ></div>
            ))}
          </div>
        );
      }
      const transactions = {
        positive: 150,
        negative: 12,
        history: [
          { type: "positive", info: "Incoming ETH", hash: "0x..." },
          { type: "positive", info: "Minted Token", hash: "0x..." },
          { type: "negative", info: "Outgoing ETH", hash: "0x..." },
          { type: "negative", info: "Outgoing ETH", hash: "0x..." },
          { type: "negative", info: "Outgoing ETH", hash: "0x..." },
          // ... more transactions
        ],
      };

      return <TransactionHistory transactions={transactions} />;
    },
  },
  //add linked addresses

  {
    accessorKey: "linkedAddresses",
    header: () => <div className="text-right">Linked Profiles</div>,
    cell: ({ row }) => {
      const linkedAddresses: Array<string> = row.getValue("linkedAddresses")
        ? row.getValue("linkedAddresses")
        : ["0x0000", "0x11111", "0x22222", "0x33333"];
      const formattedLinkedAddresses = linkedAddresses.toLocaleString(); // Format followers with commas

      return (
        <div className="text-right">
          <Tooltip
            title={linkedAddresses.join(", ")}
            position="top"
            trigger="mouseenter"
            className="
          text-gray-600
          hover:text-gray-900
          hover:underline                 dark:text-gray-300
          dark:hover:text-gray-100

          "
          >
            <span className="">{formattedLinkedAddresses.length} more.. </span>
          </Tooltip>
        </div>
      );
    },
  },

  {
    accessorKey: "netWorth",
    header: () => (
      <div className="text-right font-bold text-gray-600">Net Worth</div>
    ),
    cell: ({ row }) => {
      const netWorth = row.getValue("netWorth");

      // Format net worth as a currency
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const formattedNetWorth = formatter.format(netWorth);

      return (
        <div
          className="text-right text-gray-700"
          style={fontMonoJetBrains.style}
        >
          {formattedNetWorth}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const label = row.original;

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
      );
    },
  },
];
