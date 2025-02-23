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
    href: "https://twitter.com/walletlabels/chain/solana",
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
    <li data-oid="ed60k4m">
      <NavigationMenuLink asChild data-oid="_02awu6">
        <Link
          target={external ? "_blank" : undefined}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          data-oid="pho2bw:"
        >
          <div className="flex items-center" data-oid="ci60on6">
            <div className="w-8" data-oid="1fh-ngn">
              <Image
                src={image}
                alt={title}
                width={30}
                height={30}
                data-oid="3.3yjf0"
              />
            </div>
            <div
              className="px-4 text-sm font-medium leading-none"
              data-oid="8046zzm"
            >
              {title}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
