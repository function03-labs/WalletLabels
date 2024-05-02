import { env } from "@/env.mjs"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${path}`
}

export function trimFormattedBalance(
  balance: string | undefined,
  decimals = 4
) {
  if (!balance) {
    return "0"
  }
  const [integer, decimal] = balance.split(".")
  if (!decimal) return integer

  const trimmedDecimal = decimal.slice(0, decimals)
  return `${integer}.${trimmedDecimal}`
}

export function truncateEthAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function generateIds() {
  const id = "xx-xx-xxxx".replace(/x/g, function () {
    return Math.floor(Math.random() * 10).toString()
  })

  const key = generateUUID()

  return { id, key }
}

function generateUUID() {
  let d = new Date().getTime()

  // If available, use performance.now() to add more randomness to the UUID
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now()
  }

  // Generate the UUID using a combination of the timestamp and random values
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
    }
  )

  return uuid
}
