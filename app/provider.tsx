"use client"

import React, { useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"

function Provider({ children }: any) {
  const [client] = useState(new QueryClient())

  return (
    <>
      <NextUIProvider>
        <ChakraProvider>
          <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>
              {children}
            </ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </NextUIProvider>
    </>
  )
}

export { Provider }
