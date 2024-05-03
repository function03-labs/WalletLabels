import { ReactNode } from "react"

import { NetworkStatus } from "@/components/blockchain/network-status"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { Footer } from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FramerWrapper } from "@/components/providers/framer-wrapper"
import { Opensource } from "@/components/shared/opensource"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <FramerWrapper>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Opensource />
        <Footer />
      </div>
      <NetworkStatus />
      <div className="fixed bottom-6 right-6 hidden sm:block">
        <WalletConnect />
      </div>
    </FramerWrapper>
  )
}
