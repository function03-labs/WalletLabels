"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { Provider as RWBProvider } from "react-wrap-balancer"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { useIsMounted } from "@/lib/hooks/use-is-mounted"

import HandleWalletEvents from "@/components/blockchain/handle-wallet-events"
import { RainbowKit } from "@/components/providers/rainbow-kit"

const queryClient = new QueryClient()
interface RootProviderProps {
  children: ReactNode
}

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
        <RWBProvider>
          <RainbowKit>
            <HandleWalletEvents>
              <motion.div
                animate="show"
                //className="flex w-full items-center justify-between"
                initial="hidden"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
                viewport={{ once: true }}
                whileInView="show"
              >
                {children}
              </motion.div>
            </HandleWalletEvents>
          </RainbowKit>
        </RWBProvider>
      </QueryClientProvider>
    </ThemeProvider>
  ) : null
}
