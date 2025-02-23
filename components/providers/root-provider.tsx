"use client"

import { ReactNode } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AddrethConfig } from "addreth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Provider as RWBProvider } from "react-wrap-balancer"

import { useIsMounted } from "@/lib/hooks/use-is-mounted"

import { TailwindIndicator } from "@/components/providers/tailwind-indicator"
import { TooltipProvider } from "@/components/ui/tooltip"

interface RootProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return isMounted ? (
    <SessionProvider data-oid="lfjgfd3">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        data-oid=".j4o-bk"
      >
        <QueryClientProvider client={queryClient} data-oid="x7-qip0">
          <ChakraProvider data-oid="hhl2-ej">
            <RWBProvider data-oid="2p369u9">
              <TooltipProvider data-oid="0h4b7z0">
                <AddrethConfig data-oid="ov.:ubw">{children}</AddrethConfig>
              </TooltipProvider>
              <TailwindIndicator data-oid="wrvao0v" />
            </RWBProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  ) : null
}
