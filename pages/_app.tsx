import type { AppProps } from "next/app"
import { Inter as FontSans } from "@next/font/google"
import { DM_Mono, JetBrains_Mono } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css"
// import "@/styles/swagger.css"
import "@glideapps/glide-data-grid/dist/index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@glideapps/glide-data-grid-cells/dist/index.css"

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


const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
