"use client"

import { ReactNode } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AddrethConfig } from "addreth"
import { ThemeProvider } from "next-themes"
import { Provider as RWBProvider } from "react-wrap-balancer"

import { useIsMounted } from "@/lib/hooks/use-is-mounted"

import HandleWalletEvents from "@/components/blockchain/handle-wallet-events"
import { RainbowKit } from "@/components/providers/rainbow-kit"
import { TailwindIndicator } from "@/components/providers/tailwind-indicator"
import { TooltipProvider } from "@/components/ui/tooltip"

interface RootProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return isMounted ? (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <RWBProvider>
            <RainbowKit>
              <HandleWalletEvents>
                <TooltipProvider>
                  <AddrethConfig>{children}</AddrethConfig>
                </TooltipProvider>
                <TailwindIndicator />
              </HandleWalletEvents>
            </RainbowKit>
          </RWBProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ThemeProvider>
  ) : null
}
