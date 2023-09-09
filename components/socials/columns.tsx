/* eslint-disable react-hooks/rules-of-hooks */

import { ColumnDef } from "@tanstack/react-table";
import Avatar from "boring-avatars";
import { MoreHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import Lens from "../icons-social/lensIcon";
import OpenSea from "../icons-social/openseaIcon";
import { COLORS, stringToHash } from "./COLORS";
import LinkedProfilesCell from "./linkedProfiles";
import TransactionHistory from "./transactions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEnsResolver } from "@/hooks/useEnsResolver";
import { fontMonoJetBrains } from "@/pages/_app";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";

// const API_KEY = process.env.COVALENT_API;
let netWorth = 0;

const fetchData = async (chainId: string, address: string) => {
  const apiUrl = `https://api.covalenthq.com/v1/${chainId}/address/${address}/portfolio_v2/?&key=cqt_rQjR4tcwdrj7bGjCqGXxYXcjPptm`;
  try {
    netWorth = 0;
    const response = await axios.get(apiUrl);
    const allItems = response.data.data.items;
    if (allItems && allItems.length) {
      allItems.forEach((element) => {
        if (
          element.holdings[0].close.quote != null &&
          element.holdings[0].close.quote != 0
        ) {
          netWorth += element.holdings[0].close.quote;
        }
      });
      return netWorth;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

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
        <div className="flex items-center gap-1 max-w-[16em] overflow-auto">
          {label.pfp && ImagewFall(label)}
          <div className="whitespace-nowrap text-ellipsis">{label.name}</div>
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
          <div className="absolute inset-y-0 right-0 z-10 w-6 bg-fade-left dark:bg-fade-left-dark"></div>
          <div className="flex max-w-[10rem] overflow-x-scroll whitespace-nowrap scrollbar-hide">
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
      const [isTooltipOpen, setIsTooltipOpen] = useState(false);

      // ... rest of the code ...

      if (loading && !hasError) {
        return (
          <div className="skeleton-loader animate-pulse text-gray-400 dark:text-gray-600">
            Loading...
          </div>
        );
      }
      if (hasError) {
        return (
          <div className="skeleton-loader text-red-400 dark:text-red-600">
            Address Not Found..
          </div>
        );
      }
      // If the address is too long, truncate it
      console.log(address, hasError);
      const truncatedAddress = `${address.substring(
        0,
        4
      )}...${address.substring(address.length - 2)}`;

      const handleCopyClick = async () => {
        try {
          await navigator.clipboard.writeText(address);
          setIsTooltipOpen(true); // Open the tooltip
          setTimeout(() => {
            setIsTooltipOpen(false); // Close the tooltip after 3 seconds
          }, 3000);
        } catch (error) {
          console.error("Error copying address:", error);
        }
      };

      return (
        <span className="custom-span flex items-center gap-2">
          {isTooltipOpen && (
            <Tooltip
              title="Copied"
              position="top"
              trigger="click"
              open={isTooltipOpen}
              className="
              dark:text-gray-30 absolute top-[0px]
              right-2 bg-white
              text-gray-600 duration-200
              transition-opacity dark:bg-gray-800
            "
            ></Tooltip>
          )}
          <Link
            href={`https://etherscan.io/address/${address}`}
            title={address}
            style={fontMonoJetBrains.style}
            className="custom-avatar flex text-gray-500 hover:underline dark:text-gray-400"
          >
            <Avatar
              size={20}
              name={address}
              variant="pixel"
              colors={Array.from({ length: 5 }, () => generateRandomColor())}
            />
            {truncatedAddress}
          </Link>
          <span className="custom-cursor">
            <FaCopy className="custom-facopy" onClick={handleCopyClick} />
          </span>
        </span>
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
  // {
  //   // accessorKey: "transactions",
  //   // header: () => (
  //   //   <div
  //   //     className="
  //   // text-right"
  //   //   >
  //   //     Transactions
  //   //   </div>
  //   // ),
  //   cell: ({ row }) => {
  //     const { ens } = row.original;
  //     const { address, loading, hasError } = useEnsResolver(ens);
  //     if (true) {
  //       return (
  //         <div className="flex animate-pulse items-center justify-center">
  //           {/* Neutral state with 5 cells representing loading */}
  //           {[...Array(5)].map((_, idx) => (
  //             <div
  //               key={idx}
  //               className="mx-0.5 h-3.5 w-3.5 border-2 border-gray-300 bg-gray-200"
  //             ></div>
  //           ))}
  //         </div>
  //       );
  //     }
  //     const transactions = {
  //       positive: 150,
  //       negative: 12,
  //       history: [
  //         { type: "positive", info: "Incoming ETH", hash: "0x..." },
  //         { type: "positive", info: "Minted Token", hash: "0x..." },
  //         { type: "negative", info: "Outgoing ETH", hash: "0x..." },
  //         { type: "negative", info: "Outgoing ETH", hash: "0x..." },
  //         { type: "negative", info: "Outgoing ETH", hash: "0x..." },
  //         // ... more transactions
  //       ],
  //     };

  //     return <TransactionHistory transactions={transactions} />;
  //   },
  // },
  //add linked addresses

  {
    accessorKey: "linkedAddresses",
    header: () => <div className="text-right">Linked Profiles</div>,
    cell: LinkedProfilesCell,
  },

  {
    accessorKey: "netWorth",
    header: () => (
      <div className="text-right font-bold text-gray-600">Net Worth</div>
    ),
    cell: ({ row }) => {
      const { ens } = row.original;
      const { address } = useEnsResolver(ens);
      // State to hold the net worth data
      const [netWorth, setNetWorth] = useState<number | null>(0);
      const [isLoading, setIsLoading] = useState<boolean>(false);

      //make get request to https://www.onceupon.gg/api/neighbors/0xb432005e1010492fa315b9737881e5E18925204c?page=1&per_page=10 and display
      const res = fetch(
        "http://127.0.0.1:3000/api/neighbors/0xb432005e1010492fa315b9737881e5E18925204c?page=1&per_page=10"
      ).then((res) => res.json());
      console.log(
        res.then((data) => console.log(data)).catch((err) => console.log(err))
      );
      useEffect(() => {
        if (address && address !== null) {
          setIsLoading(true);
          fetchData("eth-mainnet", address).then((netWorth) => {
            setNetWorth(netWorth);
            setIsLoading(false);
          });
        }
      }, [address]);

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const formattedNetWorth =
        netWorth !== null ? formatter.format(netWorth) : "$NaN";

      return (
        <div
          className="text-right text-gray-700"
          style={fontMonoJetBrains.style}
        >
          {isLoading ? (
            <span className="animate-pulse">{formattedNetWorth}</span>
          ) : (
            formattedNetWorth
          )}
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
function ImagewFall(label: Label): React.ReactNode {
  const [imgSrc, setImgSrc] = useState(label.pfp);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={imgSrc}
      alt={label.name}
      width={"32"}
      height={"32"}
      placeholder="blur"
      blurDataURL={"/assets/placeholder.png"}
      onLoad={() => setIsLoading(false)}
      onError={(e) => {
        setImgSrc("/assets/placeholder.png"); //fallback
        //srcset
      }}
      // correct classname with variable
      className={`mr-1 h-9 w-9 rounded-full ${
        isLoading ? "animate-pulse" : ""
      }`}
    />
  );
}
