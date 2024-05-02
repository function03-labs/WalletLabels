import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { NavigationMenuLink } from "@/components/ui/navigation-menu"

type ListItemProps = {
  title: string
  href: string
  external?: boolean
  image: string
  className?: string
}

export const components: ListItemProps[] = [
  {
    title: "Ethereum",
    href: "https://www.walletlabels.xyz/chain/ethereum",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
    external: true,
  },
  {
    title: "Arbitrum",
    href: "https://www.walletlabels.xyz/chain/arbitrum",
    image: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029",
    external: true,
  },
  {
    title: "Solana",
    href: "https://twitter.com/walletlabels",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029",
    external: true,
  },
]

export function ListItem({
  className,
  title,
  image,
  external,
  ...props
}: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          target={external ? "_blank" : undefined}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center">
            <div className="w-8">
              <Image src={image} alt={title} width={30} height={30} />
            </div>
            <div className="px-4 text-sm font-medium leading-none">{title}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
