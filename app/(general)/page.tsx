import Link from "next/link"
import { Rss } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { ExampleDemos } from "@/components/shared/example-demos"
import { buttonVariants } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="container relative mt-20 px-0">
      <PageHeader className="pb-8">
        <PageHeaderHeading>Search wallets like never before</PageHeaderHeading>
        <PageHeaderDescription>{siteConfig.description}</PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "default" })}
          >
            <LuBook className="mr-2 size-4" />
            Docs
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "secondary" })}
          >
            <FaGithub className="mr-2 size-4" />
            Github
          </Link>
          <Link
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants(),
              "bg-[#47accd] text-white hover:bg-[#47accd]/80"
            )}
          >
            <Rss className="mr-2 size-4" />
            Website
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <ExampleDemos />
    </div>
  )
}
