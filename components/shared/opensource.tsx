import Link from "next/link"

import { siteConfig } from "@/config/site"

export function Opensource() {
  return (
    <section id="open-source" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] text-sky-600 dark:text-sky-400 sm:text-3xl md:text-6xl">
          Proudly Open Source
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Wallet Labels is an open-source project, and we are proud to share our
          code
          <br /> The code is available on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
