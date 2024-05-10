"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useBlockNumber, useNetwork } from "wagmi"

import { chains } from "@/config/chains"
import { cn } from "@/lib/utils"
import { GetNetworkColor } from "@/lib/utils/get-network-color"

import { Badge } from "@/components/ui/badge"

const badgeVariants: Record<ReturnType<typeof GetNetworkColor>, string> = {
  green: "bg-green-200 text-green-700",
  blue: "bg-blue-200 text-blue-700",
  red: "bg-red-200 text-red-700",
  purple: "bg-purple-200 text-purple-700",
  gray: "bg-gray-200 text-gray-700",
  yellow: "bg-yellow-200 text-yellow-700",
}

export function NetworkStatus() {
  const path = usePathname()
  const { data } = useBlockNumber()
  const chainSelected = chains.find(
    (c) => c.id === (path === "/" ? "ethereum" : path.split("/")[2])
  )!

  return (
    <Link
      href={chainSelected.url}
      className="fixed bottom-6 left-6 z-10 flex items-center overflow-hidden rounded-full bg-muted text-muted-foreground shadow-md"
    >
      <Badge
        className={cn(
          "rounded-full py-2 text-xs font-bold uppercase leading-none tracking-wider",
          badgeVariants[GetNetworkColor(chainSelected.id)]
        )}
      >
        {chainSelected.label}
      </Badge>
      <p className="mx-2 text-xs">#{data?.toString()}</p>
    </Link>
  )
}
