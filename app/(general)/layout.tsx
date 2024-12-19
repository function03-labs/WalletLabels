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
    <FramerWrapper>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Opensource />
        <Footer />
      </div>
      {/* <NetworkStatus /> */}
      <div className="fixed bottom-6 right-6 z-50 block sm:hidden">
        {!session ? (
          <>
            <button onClick={() => signIn("google")}>
              Sign in with Google
            </button>
            <button onClick={() => signIn("github")}>
              Sign in with GitHub
            </button>
            <button onClick={() => signIn("email")}>Sign in with Email</button>
          </>
        ) : (
          <p>Welcome, {session.user.name}</p>
        )}
      </div>
    </FramerWrapper>
  )
}
