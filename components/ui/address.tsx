"use client"

import * as React from "react"
import { Copy } from "lucide-react"
import { useAccount, useNetwork, type Address as AddressType } from "wagmi"
import { mainnet } from "wagmi/chains"

import { toast } from "@/lib/hooks/use-toast"
import { cn } from "@/lib/utils/index"

export interface AddressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  address?: AddressType | string
  truncate?: boolean
  truncateAmount?: number
  link?: boolean
  copy?: boolean
}

const AddressCopy = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    address: AddressType
  }
>(({ address, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex cursor-pointer items-center gap-x-2", className)}
      onClick={async () => {
        await navigator.clipboard.writeText(address)
        toast({
          title: "Copied address",
          description: "The address has been copied to your clipboard.",
        })
      }}
      {...props}
      data-oid="02g65k2"
    >
      {children ?? address}
      <span className="sr-only" data-oid=":bi3mow">
        Copy address
      </span>
      <Copy size={12} data-oid="pm-sika" />
    </div>
  )
})

AddressCopy.displayName = "AddressCopy"

const AddressLink = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    address: AddressType
  }
>(({ address, className, children, ...props }, ref) => {
  const { chain: currentChain } = useNetwork()

  // Use mainnet as default chain
  const chain = currentChain ?? mainnet

  return (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer underline-offset-2 hover:underline",
        className
      )}
      {...props}
      data-oid="6idh7mk"
    >
      {chain.blockExplorers?.default.url ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${chain.blockExplorers?.default.url}/address/${address}`}
          data-oid="xax4di8"
        >
          {children ?? address}
        </a>
      ) : (
        <>{children ?? address}</>
      )}
    </div>
  )
})

AddressLink.displayName = "AddressLink"

const Address = React.forwardRef<HTMLDivElement, AddressProps>(
  (
    { address, className, truncate, truncateAmount = 4, link, copy, ...props },
    ref
  ) => {
    const { address: connectedAddress } = useAccount()

    const selectedAddress = address ?? connectedAddress

    const formattedAddress = React.useMemo(
      () =>
        truncate
          ? `${(selectedAddress || "").slice(0, truncateAmount + 2)}...${(
              selectedAddress || ""
            ).slice(-Number(truncateAmount))}`
          : selectedAddress || "",
      [selectedAddress, truncate, truncateAmount]
    )

    if (!selectedAddress) {
      return null
    }

    if (link) {
      return (
        <AddressLink
          ref={ref}
          address={selectedAddress as AddressType}
          className={className}
          {...props}
          data-oid="-4uuh33"
        >
          {copy ? (
            <AddressCopy
              address={selectedAddress as AddressType}
              data-oid="spu69hw"
            >
              {formattedAddress}
            </AddressCopy>
          ) : (
            <>{formattedAddress}</>
          )}
        </AddressLink>
      )
    }

    if (copy) {
      return (
        <AddressCopy
          ref={ref}
          address={selectedAddress as AddressType}
          {...props}
          data-oid="o-h5ooo"
        >
          {formattedAddress}
        </AddressCopy>
      )
    }

    return (
      <span ref={ref} className={className} {...props} data-oid="mbqdot_">
        {formattedAddress}
      </span>
    )
  }
)

Address.displayName = "Address"

export { Address, AddressCopy, AddressLink }
