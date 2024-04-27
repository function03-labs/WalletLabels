"use client";

import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";
import { NavItem } from "@/types/nav";
import { chains } from "@config/chains";
import { siteConfig } from "@config/site";

import { Icons } from "@component/ui/Lucide";
import { buttonVariants } from "@component/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@component/ui/DropdownMenu";

interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const params = usePathname();
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <div className="flex items-center space-x-1.5 dark:text-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="size-6" />
          <span className="font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700">
            <Image
              src={
                params === "/chain/solana"
                  ? "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
                  : params === "/chain/ethereum"
                    ? "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
                    : params === "/chain/arbitrum"
                      ? "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"
                      : "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
              }
              alt="Ethereum"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "icon",
                }),
                "ml-2 size-5"
              )}
              width={20}
              height={20}
            />
            <Icons.chevronsUpDown className="ml-2 size-3" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <span className="font-semibold">Our supported chains</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {chains.map((chain, index) => (
              <DropdownMenuItem key={index}>
                <Link
                  className="flex w-full items-center gap-2"
                  href={`/chain/${chain.id}`}
                >
                  <Image
                    src={chain.img}
                    alt={chain.label}
                    width={32}
                    height={32}
                    className="size-4 rounded-md"
                  />
                  <span>{chain.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="hidden gap-6 md:flex">
        {items?.map(
          (item, index) =>
            item.href && (
              <div key={index}>
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                  {item.new && (
                    <span className="relative bottom-[7px] flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                    </span>
                  )}
                </Link>
              </div>
            )
        )}
      </nav>
    </div>
  );
}
