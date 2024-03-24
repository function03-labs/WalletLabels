import { NavItem } from "@types/nav";

export interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
    docs: string;
    style?: string;
  };
  url: string;
  ogImage: string;
}
