/* eslint-disable tailwindcss/enforces-shorthand */
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { chains } from "@/config/chains"
import { siteConfig } from "@/config/site"
import { cn, getChainImage, getChainURL } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { NavItem } from "@/types/nav"

interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const params = usePathname()
  const chainImage = getChainImage(params)

  let path: string = ""
  if (params.split("/")[2] === "submit" || params.split("/")[2] === "profile") {
    path = "/chain/ethereum/community"
  } else {
    path = `/chain/${params.split("/")[2] || "ethereum"}/community`
  }

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <div className="flex items-center space-x-2 dark:text-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="size-6" />
          <span className="whitespace-nowrap font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700">
            <Image
              src={chainImage}
              alt="Ethereum"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "icon",
                }),
                "h-5 w-5"
              )}
              width={100}
              height={100}
            />
            <Icons.chevronsUpDown className=" size-3" />
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
                  href={getChainURL(params, chain.id)}
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
  )
}
