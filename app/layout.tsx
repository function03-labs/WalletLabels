import "@/styles/globals.css"

import { ReactNode } from "react"
import type { Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import { env } from "@/env.mjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import RootProvider from "@/components/providers/root-provider"
import { Toaster } from "@/components/ui/toaster"

const url = env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata = {
  metadataBase: new URL(url),
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: url?.toString(),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
}
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <RootProvider>{children}</RootProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
