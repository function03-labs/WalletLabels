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
            <Link
              href="/terms"
              className="font-medium underline underline-offset-4"
            >
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link
              href="/privacy"
              className="font-medium underline underline-offset-4"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
