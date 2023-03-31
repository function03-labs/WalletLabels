import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "WalletLabels",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
      disabled: false,
    },
  ],
  links: {
    twitter: "#",
    github: "https://github.com/0xaaiden/WalletLabels",
    docs: "/docs",
  },
}
