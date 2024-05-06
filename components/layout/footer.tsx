import { HTMLAttributes } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Footer({ className }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10">
        <div className="flex flex-col items-center gap-4 px-8 ">
          <p className="text-center text-sm leading-loose dark:text-gray-400">
            Built by{" "}
            <Link
              href={siteConfig.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {siteConfig.name}
            </Link>
            . Hosted on{" "}
            <Link
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            . The source code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
