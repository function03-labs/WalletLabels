"use client"

import Link from "next/link"

import useScroll from "@/lib/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export function SiteHeader() {
  const scrolled = useScroll(0)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-all",
        scrolled && "bg-background/50 "
      )}
    >
      <div className="container flex h-20 items-center">
        <MainNav />
        <MobileNav />
        <div className="hidden flex-1 items-center justify-between space-x-2 md:flex md:justify-end">
          <IsWalletConnected>
            <IsSignedIn>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
            </IsSignedIn>
            <IsSignedOut>
              <ButtonSIWELogin />
            </IsSignedOut>
          </IsWalletConnected>
          <IsWalletDisconnected>
            <WalletConnect />
          </IsWalletDisconnected>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
