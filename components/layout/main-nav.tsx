/* eslint-disable tailwindcss/enforces-shorthand */
"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { chains } from "@/config/chains"
import { siteConfig } from "@/config/site"
import { cn, getChainImage, getChainURL } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { SuggestChainModal } from "@/components/suggest-chain-modal"
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
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false)
  const params = usePathname()
  if (!params) return null

  const chainImage = getChainImage(params)

  let path: string = ""
  if (params.split("/")[2] === "submit" || params.split("/")[2] === "profile") {
    path = "/chain/ethereum/community"
  } else {
    path = `/chain/${params.split("/")[2] || "ethereum"}/community`
  }

  return (
    <div className="flex items-center gap-6 md:gap-10" data-oid="gv_2742">
      <div
        className="flex items-center space-x-2 dark:text-slate-100"
        data-oid="udd6dki"
      >
        <Link href="/" className="flex items-center gap-2" data-oid="f26:z6s">
          <Icons.logo className="size-6" data-oid=":cqghzk" />
          <span
            className="whitespace-nowrap font-bold sm:inline-block"
            data-oid="he_a:l0"
          >
            {siteConfig.name}
          </span>
        </Link>
        <DropdownMenu data-oid="yprh574">
          <DropdownMenuTrigger
            className="flex items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            data-oid="qarkby6"
          >
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
              data-oid="zlr_0ya"
            />

            <Icons.chevronsUpDown className=" size-3" data-oid="6x32opb" />
          </DropdownMenuTrigger>

          <DropdownMenuContent data-oid="3s4orja">
            <DropdownMenuLabel data-oid="v0mu:9y">
              <span className="font-semibold" data-oid=".nf7unq">
                Our supported chains
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator data-oid="kvo8c40" />
            {chains.map((chain, index) => (
              <DropdownMenuItem
                key={index}
                disabled={chain.disabled}
                data-oid="s.q._c_"
              >
                <Link
                  className="flex w-full items-center gap-2"
                  href={getChainURL(params, chain.id)}
                  data-oid="py3srox"
                >
                  <Image
                    src={chain.img}
                    alt={chain.label}
                    width={32}
                    height={32}
                    className="size-4 rounded-md"
                    data-oid="oodswln"
                  />

                  <span data-oid="1d8goap">{chain.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onSelect={() => setIsSuggestModalOpen(true)}
              data-oid="ziue8w5"
            >
              <motion.div
                className="flex w-full items-center gap-2 rounded-md transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                data-oid="ow309pi"
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -1, 0],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  data-oid="7bwrw.c"
                >
                  <Image
                    src="https://i.redd.it/5unqv87oj8y91.gif"
                    alt="Suggest a chain"
                    width={32}
                    height={32}
                    className="size-4 rounded-md"
                    data-oid="yjntwe_"
                  />
                </motion.div>
                <span className="" data-oid="5blvi:.">
                  Suggest a new chain
                </span>
              </motion.div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="hidden gap-6 md:flex" data-oid="afgeufz">
        {items?.map(
          (item, index) =>
            item.href && (
              <div key={index} data-oid="kf63nwb">
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                  data-oid=":wc7:.g"
                >
                  {item.title}
                  {item.new && (
                    <span
                      className="relative bottom-[7px] flex size-2"
                      data-oid="vhxop4c"
                    >
                      <span
                        className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75"
                        data-oid="phuf.yk"
                      ></span>
                      <span
                        className="relative inline-flex size-2 rounded-full bg-sky-500"
                        data-oid="50ba41g"
                      ></span>
                    </span>
                  )}
                </Link>
              </div>
            )
        )}
      </nav>

      <SuggestChainModal
        isOpen={isSuggestModalOpen}
        onClose={() => setIsSuggestModalOpen(false)}
        data-oid="yxcbedq"
      />
    </div>
  )
}
