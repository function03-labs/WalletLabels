"use client"

import { ReactNode } from "react"
import { useAccount } from "wagmi"

import { useMagic } from "../context/magicProvider"

interface IsWalletConnectedProps {
  children: ReactNode
}

export const IsWalletConnected = ({ children }: IsWalletConnectedProps) => {
  const { magic } = useMagic()

  if (magic?.user.isLoggedIn) return <>{children}</>

  return null
}
