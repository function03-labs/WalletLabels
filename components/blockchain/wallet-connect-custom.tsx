import { HTMLAttributes } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "@/components/ui/button"

import { useMagic } from "../context/magicProvider"

interface WalletConnectCustomProps extends HTMLAttributes<HTMLDivElement> {
  classNameConnect?: string
  classNameConnected?: string
  classNameWrongNetwork?: string
  labelConnect?: string
  labelWrongNetwork?: string
}

export const WalletConnectCustom = ({
  className,
  labelConnect = "Connect Wallet",
  labelWrongNetwork = "Wrong Network",
  ...props
}: WalletConnectCustomProps) => {
  const { magic } = useMagic()
  const handleConnect = async () => {
    if (!magic) {
      return
    }

    await magic.wallet.connectWithUI()
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
      }) => {
        const connected =
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div className={className} {...props}>
            {(() => {
              if (!connected) {
                return (
                  <>
                    <Button variant="default" onClick={handleConnect}>
                      {labelConnect}
                    </Button>
                  </>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button variant="destructive" onClick={openChainModal}>
                    {labelWrongNetwork}
                  </Button>
                )
              }

              return (
                <div>
                  <Button variant="default" onClick={openChainModal}>
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 18, height: 18 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="ml-1 text-lg lowercase">{chain.name}</span>
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default WalletConnectCustom
