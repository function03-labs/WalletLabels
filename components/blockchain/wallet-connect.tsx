import { HtmlHTMLAttributes } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { useMagic } from "@/components/context/magicProvider"

import { Button } from "../ui/button"

export const WalletConnect = ({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLSpanElement>) => {
  const { magic } = useMagic()

  const handleConnect = async () => {
    if (!magic) {
      return
    }
    await magic.wallet.connectWithUI()
  }

  return (
    <span className={className} {...props}>
      <Button variant="default" onClick={handleConnect}>
        Log in
      </Button>
    </span>
  )
}
