import { NavItem } from "@types/nav"

export interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
    style?: string
    website?: string
  }
  url: string
  ogImage: string
  dns: string
}

export type walletlabelsApiEndpoints = {
  [key: string]: walletlabelsApiEndpoint[]
}

export interface walletlabelsApiEndpoint {
  name: string
  url: string
  description: string
  category: (typeof integrationCategories)[number]
}
