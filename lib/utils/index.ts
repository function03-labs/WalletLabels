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

export function generateUUID() {
  let d = new Date().getTime()

  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now()
  }

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

export function splitTags(str: string) {
  // eslint-disable-next-line no-useless-escape
  const delimiters = /[\s,\/\-\_\(\):]+/

  let tags = str.split(delimiters)
  tags = tags.filter((tag) => tag.trim() !== "").map((tag) => tag.trim())
  return tags
}

export function normalizeLabels(labels: any[]): any[] {
  const normalizedLabels: any[] = []

  for (const label of labels) {
    const normalizedLabel = {
      _id: label._id,
      address: label.address || label.ADDRESS,
      address_name: label.address_name || label.ADDRESS_NAME,
      label_type: label.label_type || label.LABEL_TYPE,
      label_subtype: label.label_subtype || label.LABEL_SUBTYPE,
      label: label.label || label.LABEL,
    }

    normalizedLabels.push(normalizedLabel)
  }

  return normalizedLabels
}

export function getChainEnv(chainSlug: string) {
  switch (chainSlug) {
    case "arbitrum":
      return process.env.CLC_NAME_WLBLS_ARBITRUM
    case "avax":
      return process.env.CLC_NAME_WLBLS_AVAX
    case "solana":
      return process.env.CLC_NAME_WLBLS_SOLANA
    case "bsc":
      return process.env.CLC_NAME_WLBLS_BSC
    case "ftm":
      return process.env.CLC_NAME_WLBLS_FTM
    case "optimism":
      return process.env.CLC_NAME_WLBLS_OPTIMISM
    case "polygon":
      return process.env.CLC_NAME_WLBLS_POLYGON
    case "solo-stakers":
      return process.env.CLC_NAME_WLBLS_SOLOSTAKERS
    case "base":
      return process.env.CLC_NAME_WLBLS_BASE
    case "bitcoin":
      return process.env.CLC_NAME_WLBLS_BITCOIN
    case "mev":
      return process.env.CLC_NAME_WLBLS_MEV
    default:
      return process.env.CLC_NAME_WLBLS!
  }
}

export function getLookUpURL(chainSlug: string, address: string) {
  if (chainSlug === "solana") {
    return `https://solscan.io/account/${address}`
  } else if (chainSlug === "arbitrum") {
    return `https://arbiscan.io/address/${address}`
  } else if (chainSlug === "base") {
    return `https://basescan.org/address/${address}`
  } else if (chainSlug === "bitcoin") {
    return `https://btcscan.io/address/${address}`
  } else if (chainSlug === "ethereum") {
    return `https://etherscan.io/address/${address}`
  }
  return `https://etherscan.io/address/${address}`
}

export function getChainImage(path: string) {
  const chainSlug = path.split("/")[2]

  switch (chainSlug) {
    case "arbitrum":
      return "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"
    case "solana":
      return "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
    case "ethereum":
      return "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
    case "base":
      return "https://github.com/base-org/brand-kit/raw/main/logo/in-product/Base_Network_Logo.svg"
    case "bitcoin":
      return "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
    default:
      return "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
  }
}

export function getChainURL(path: string, chainSlug: string) {
  const dest = path.split("/")[3]

  if (!dest) return `/chain/${chainSlug}`

  return `/chain/${chainSlug}/${dest}`
}
