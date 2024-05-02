import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"

import { AppAccountForm } from "@/components/app/app-account-form"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletNonce } from "@/components/blockchain/wallet-nonce"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

async function getUser() {
  const response = await fetch("/api/dashboard/user")
  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }
  return response.json()
}

export default function PageDashboardAccount() {
  const user = getUser()

  return (
    <section className="w-full p-10">
      <IsWalletConnected>
        <IsSignedIn>
          <Card className="w-full p-6">
            <h3 className="text-2xl font-normal">Account</h3>
            <hr className="my-3 dark:opacity-30" />
            <div className="mt-3">
              <span className="mr-1 font-bold">Address:</span>{" "}
              <WalletAddress truncate />
            </div>
            <div className="mt-3">
              <span className="mr-1 font-bold">Balance:</span> <WalletBalance />
            </div>
            <div className="mt-3">
              <span className="mr-1 font-bold">Nonce:</span> <WalletNonce />
            </div>
            <hr className="my-3 dark:opacity-30" />

            <Separator className="my-3" />

            <h3 className="text-2xl font-normal">Information</h3>
            <hr className="my-3 dark:opacity-30" />
            <AppAccountForm />

            <div className="mt-3">
              <button
                type="button"
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </Card>
        </IsSignedIn>
        <IsSignedOut>
          <ButtonSIWELogin />
        </IsSignedOut>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </section>
  )
}
