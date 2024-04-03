import { erc20ABI } from "wagmi"
import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"

export default defineConfig({
  out: "lib/generated/blockchain.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
  ],
  plugins: [react()],
})
