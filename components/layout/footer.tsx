import { HTMLAttributes } from "react"
import Link from "next/link"
import { Rss } from "lucide-react"
import { FaGithub, FaTwitter } from "react-icons/fa"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { LinkComponent } from "@/components/shared/link-component"
import { buttonVariants } from "@/components/ui/button"

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const classes = cn(
    className,
    "flex flex-col items-center justify-center px-4 py-6"
  )

  return (
    <footer className={classes} {...props}>
      <h3>{siteConfig.title}</h3>
      <Link
        href="https://fn03.xyz"
        target="_blank"
        rel="noreferrer noopenner"
        className={cn(buttonVariants({ variant: "link", size: "sm" }))}
      >
        Built by Function03 Labs
      </Link>
      <div className="mt-2 flex items-center space-x-2">
        <LinkComponent href={`${siteConfig.links.github}`}>
          <FaGithub />
        </LinkComponent>
        <LinkComponent href={`${siteConfig.links.twitter}`}>
          <FaTwitter />
        </LinkComponent>
        <LinkComponent href={`${siteConfig.links.website}`}>
          <Rss className="size-5" />
        </LinkComponent>
      </div>
    </footer>
  )
}
