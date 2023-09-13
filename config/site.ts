import { NavItem } from "@/types/nav"
import { tr } from "date-fns/locale"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
    style?: string
  }

}

export const siteConfig: SiteConfig = {
  name: "WalletLabels",
  description:
    "WalletLabels is a free and open source service that allows you to search for wallet labels and add your own.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Social Labels",
      href: "/socials",
      disabled: false,
      new: true,
    },
    {
      title: "API",
      href: "/api",
      disabled: false,
    },
  ],
  links: {
    twitter: "#",
    github: "https://github.com/0xaaiden/WalletLabels",
    docs: "/api",
  },
}
