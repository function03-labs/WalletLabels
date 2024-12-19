"use client"

import Link from "next/link"
import { signIn, useSession } from "next-auth/react"

import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"

import { MainNav } from "@/components/layout/main-nav"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-slate-50 dark:border-b-slate-700 dark:bg-black">
      <div className="flex h-20 items-center px-4 sm:container">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center space-x-1 sm:flex">
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

          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          {!session ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => signIn("google")}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                Sign in with Google
              </button>
              <button
                onClick={() => signIn("github")}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                Sign in with GitHub
              </button>
              <button
                onClick={() => signIn("email")}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                Sign in with Email
              </button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
                <span>{session.user.name}</span>
                <Icons.chevronsUpDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuDashboard.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
