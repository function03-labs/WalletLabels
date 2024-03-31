import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "WalletLabels",
  description:
    "WalletLabels is a free and open source service that allows you to search for wallet labels and add your own.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
/*     {
      title: "Social Labels",
      href: "/socials",
      disabled: false,
      new: true,
    },
 */    {
      title: "API",
      href: "https://docs.walletlabels.xyz",
      disabled: false,
    },
  ],
  links: {
    twitter: "https://twitter.com/walletlabels",
    github: "https://github.com/function03-labs/WalletLabels",
    docs: "/api-a",
  },
  url: "https://walletlabels.xyz",
  ogImage: "https://walletlabels.xyz/og.png",
  dns: "walletlabels.xyz",
};
