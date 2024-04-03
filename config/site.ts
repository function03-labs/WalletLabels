// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  localeDefault: string
  links: {
    docs: string
    telegram: string
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = "https://app.walletlabels.xyz"

export const siteConfig: SiteConfig = {
  name: "Wallet Labels",
  title: "WalletLabels - Easily identify addresses",
  emoji: "🪪",
  description:
    "More than 70M addresses labeled for you to easily identify your favorite wallets and exchanges.",
  localeDefault: "en",
  links: {
    docs: "https://docs.walletlabels.xyz/",
    telegram: "https://t.me/+yDF9bnv2R7RkNWZk",
    twitter: "https://twitter.com/walletlabels",
    github: "https://github.com/function03-labs/WalletLabels",
  },
}

export const DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app&project-name=TurboETH&repository-name=turbo-eth&demo-title=TurboETH&env=NEXTAUTH_SECRET,DATABASE_URL&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app%2Fblob%2Fintegrations%2F.env.example"
