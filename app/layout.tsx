import { DM_Mono, Inter as FontSans, JetBrains_Mono } from "@next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.scss"
import "@glideapps/glide-data-grid/dist/index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@glideapps/glide-data-grid-cells/dist/index.css"
import { ChakraProvider } from "@chakra-ui/react"

import { Provider } from "./provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const fontMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const fontMonoJetBrains = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        <Provider>
          {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
          {children} <Analytics /> {/* </ThemeProvider> */}
        </Provider>

        <div
          id="portal"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}></div>
      </body>
    </html>
  )
}
