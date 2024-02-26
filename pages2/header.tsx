/* eslint-disable react/no-unescaped-entities */

import Head from "next/head"
import Image from "next/image"
import { ChevronRightIcon } from "lucide-react"

export default function header() {
  return (
    <Head>
      <title>WalletLabels</title>
      <meta
        name="description"
        content="Wallet Labels - Easily identify your favorite wallets and exchanges with more than 7.5M labeled addresses"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon_tp.ico" />
    </Head>
  )
}
