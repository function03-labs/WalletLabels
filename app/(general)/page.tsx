import Link from "next/link"
import { Rss } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { AnimatedBeamMultipleInput } from "@/components/layout/chain-beam"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { WobbleCards } from "@/components/layout/wobble-cards"
import NumberTicker from "@/components/shared/number-ticker"
import { buttonVariants } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"

export default function HomePage() {
  return (
    <div className="container relative mt-20 px-0">
      <PageHeader className="pb-8">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill={"#07c3f2"}
        />
        <PageHeaderHeading>Search wallets like never before</PageHeaderHeading>
        <PageHeaderDescription>
          <p className="whitespace-pre-wrap text-6xl font-bold tracking-tighter text-black dark:text-white">
            <NumberTicker value={200} /> Million
          </p>
          <span className="text-center text-xl font-normal text-neutral-600 dark:text-neutral-400 sm:text-lg">
            Addresses labled for you to explore.
          </span>
        </PageHeaderDescription>
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
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="justify-cente flex  max-w-4xl flex-col items-center">
          <AnimatedBeamMultipleInput />
          <WobbleCards />
        </div>
      </div>
    </div>
  )
}
