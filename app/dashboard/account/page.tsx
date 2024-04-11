"use client"

import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppAccountForm } from "@/components/app/app-account-form"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletNonce } from "@/components/blockchain/wallet-nonce"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboardAccount() {
  return (
    <motion.div
      animate="show"
      className="flex size-full items-center justify-center py-6 lg:py-8"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
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
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
