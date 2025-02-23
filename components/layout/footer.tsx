import { HTMLAttributes } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Footer({ className }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)} data-oid="d8jz1dl">
      <div
        className="container flex flex-col items-center justify-between gap-4 py-10"
        data-oid="u5xa6j2"
      >
        <div
          className="flex flex-col items-center gap-4 px-8 "
          data-oid="5uvgl-8"
        >
          <p
            className="text-center text-sm leading-loose dark:text-gray-400"
            data-oid="wogi63k"
          >
            <Link
              href="/terms"
              className="font-medium underline underline-offset-4"
              data-oid="aq0b7u7"
            >
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link
              href="/privacy"
              className="font-medium underline underline-offset-4"
              data-oid="3p1yfzh"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
