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
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <RWBProvider>
              <TooltipProvider>
                <AddrethConfig>{children}</AddrethConfig>
              </TooltipProvider>
              <TailwindIndicator />
            </RWBProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  ) : null
}
