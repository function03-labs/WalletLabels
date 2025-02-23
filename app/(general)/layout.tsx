"use client"

import { ReactNode } from "react"
import { signIn, useSession } from "next-auth/react"

// import { NetworkStatus } from "@/components/blockchain/network-status"
import { Footer } from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FramerWrapper } from "@/components/providers/framer-wrapper"
import { Opensource } from "@/components/shared/opensource"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { data: session } = useSession()

  return (
    <FramerWrapper data-oid="dsu3i72">
      <div className="relative flex min-h-screen flex-col" data-oid="0.xfmd0">
        <SiteHeader data-oid=".14j77_" />
        <main className="flex-1" data-oid="ijom9ea">
          {children}
        </main>
        <Opensource data-oid="pvfh78a" />
        <Footer data-oid="_34m-v9" />
      </div>
      {/* <NetworkStatus /> */}
      <div
        className="fixed bottom-6 right-6 z-50 block sm:hidden"
        data-oid="rom7-gk"
      >
        {!session ? (
          <button
            onClick={() => signIn()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            data-oid=":1jrdns"
          >
            Sign in
          </button>
        ) : (
          <p data-oid="727k.gs">Welcome, {session.user.name}</p>
        )}
      </div>
    </FramerWrapper>
  )
}
