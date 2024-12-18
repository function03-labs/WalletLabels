"use client"

import Link from "next/link"
import { useSession, signIn } from "next-auth/react"

import { siteConfig } from "@/config/site"

import { MainNav } from "@/components/layout/main-nav"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-slate-50 dark:border-b-slate-700 dark:bg-black">
      <div className="flex h-20 items-center px-4 sm:container">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-2">
          {!session ? (
            <>
              <button onClick={() => signIn("google")}>Sign in with Google</button>
              <button onClick={() => signIn("github")}>Sign in with GitHub</button>
              <button onClick={() => signIn("email")}>Sign in with Email</button>
            </>
          ) : (
            <p>Welcome, {session.user.name}</p>
          )}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className=" hidden items-center space-x-1 sm:block">
              <Link
                href="https://t.me/+yDF9bnv2R7RkNWZk"
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                  <Icons.telegram className="size-5" />
                </div>
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                    <Icons.github className="size-5" />
                    <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </nav>
          </div>
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
