import { walletlabelsApiEndpoints } from "@/types/site"

export const apiEndpoints = ["ethereum", "optimism", "arbitrum", "solana"]

export const endpoints = {
  ethereum: [
    {
      name: "Search by label",
      url: "https://docs.walletlabels.xyz/endpoint/search",
      description: "Search for a label by name.",
      category: "ethereum",
    },
    {
      name: "Account label",
      url: "https://docs.walletlabels.xyz/endpoint/label",
      description: "Get the label for an Ethereum address.",
      category: "ethereum",
    },
    {
      name: "MEV labels",
      url: "https://docs.walletlabels.xyz/endpoint/mev_label",
      description: "Get the MEV label for an Ethereum address.",
      category: "ethereum",
    },
    {
      name: "Search By MEV type",
      url: "https://docs.walletlabels.xyz/endpoint/mev_search",
      description: "Get MEV labels by type.",
      category: "ethereum",
    },
  ],
  optimism: [
    {
      name: "Account labels",
      url: "https://docs.walletlabels.xyz/endpoint/optimism/label",
      description: "Get the label for an Optimism address.",
      category: "optimism",
    },
  ],
  arbitrum: [
    {
      name: "Account labels",
      url: "https://docs.walletlabels.xyz/endpoint/arbitrum/label",
      description: "Get the label for an Arbitrum address.",
      category: "arbitrum",
    },
  ],
  solana: [
    {
      name: "Account labels",
      url: "https://docs.walletlabels.xyz/endpoint/solana/label",
      description: "Get the label for a Solana address.",
      category: "solana",
    },
    {
      name: "Account search (BETA)",
      url: "https://docs.walletlabels.xyz/endpoint/solana/search",
      description: "Search for a label by name.",
      category: "solana",
    },
  ],
} as walletlabelsApiEndpoints
