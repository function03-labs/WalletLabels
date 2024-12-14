"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Magic as MagicBase } from "magic-sdk"

export type Magic = MagicBase<OAuthExtension[]>

type MagicContextType = {
  magic: Magic | null
}

const MagicContext = createContext<MagicContextType>({
  magic: null,
})

export const useMagic = () => useContext(MagicContext)

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
      const magic = new MagicBase(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
        network: {
          rpcUrl: "https://rpc2.sepolia.org/",
          chainId: 11155111,
        },
      })

      setMagic(magic)
    }
  }, [])

  const value = useMemo(() => {
    return {
      magic,
    }
  }, [magic])

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
}

export default MagicProvider
