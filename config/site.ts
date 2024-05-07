// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { SiteConfig } from "@/types/site"

export const SITE_CANONICAL = "https://walletlabels.xyz"

export const siteConfig: SiteConfig = {
  name: "Wallet Labels",
  description:
    "More than 200M addresses labeled for you to easily identify your favorite wallets and exchanges.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "API",
      href: "https://docs.walletlabels.xyz",
      disabled: false,
      new: true,
    },
  ],
  links: {
    docs: "https://docs.walletlabels.xyz/",
    website: "https://www.walletlabels.xyz/",
    twitter: "https://twitter.com/walletlabels",
    github: "https://github.com/function03-labs/WalletLabels",
  },
  url: "https://walletlabels.xyz",
  ogImage: "https://walletlabels.xyz/og.png",
  dns: "walletlabels.xyz",
}
