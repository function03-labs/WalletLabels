"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { useToast } from "@/lib/hooks/use-toast"

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
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast({
        title: "Signed out successfully",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive",
      })
    }
  }

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-slate-50 dark:border-b-slate-700 dark:bg-black"
      data-oid="qp9v:9h"
    >
      <div
        className="flex h-20 items-center px-4 sm:container"
        data-oid="gi1qhm2"
      >
        <MainNav items={siteConfig.mainNav} data-oid="xcp08d7" />

        <div
          className="flex flex-1 items-center justify-end space-x-4"
          data-oid="0kxs3r9"
        >
          <nav
            className="hidden items-center space-x-1 sm:flex"
            data-oid="u2xazx9"
          >
            <Link
              href="https://t.me/+yDF9bnv2R7RkNWZk"
              target="_blank"
              rel="noreferrer"
              data-oid="dbn7u12"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
                data-oid="1y3sh:y"
              >
                <Icons.telegram className="size-5" data-oid="7:-u0yt" />
              </div>
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              data-oid="4lthde5"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
                data-oid="7b00aq7"
              >
                <Icons.github className="size-5" data-oid="r-yy5vq" />
                <span className="sr-only" data-oid="j2e589y">
                  GitHub
                </span>
              </div>
            </Link>
          </nav>

          <div className="hidden sm:block" data-oid="44w.8li">
            <ModeToggle data-oid="ponzrt4" />
          </div>

          {!session ? (
            <div className="flex items-center space-x-2 " data-oid="m.rq.l1">
              <button
                onClick={() => signIn()}
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className:
                    "bg-black text-slate-50 hover:bg-slate-800 hover:text-slate-50 dark:bg-white dark:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white",
                })}
                data-oid="ho1v_1v"
              >
                Connect
              </button>
            </div>
          ) : (
            <DropdownMenu data-oid="vkpi72i">
              <DropdownMenuTrigger
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-slate-100 dark:hover:bg-slate-800"
                data-oid="jot5uvi"
              >
                <span data-oid="5eyba64">
                  {session.user?.name || "Your Dashboard"}
                </span>
                <Icons.chevronsUpDown className="size-4" data-oid="et4-i9g" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" data-oid="35olj2r">
                <DropdownMenuLabel data-oid="_q.-pyg">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator data-oid="jqogu4r" />
                <DropdownMenuItem asChild data-oid="1tcn1yc">
                  <Link href="/dashboard" data-oid="qhny5dh">
                    API Key Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild data-oid="suk9f:z">
                  <Link href="/dashboard/profile" data-oid="pqjolo8">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild data-oid="6s1vno4">
                  <Link href="/dashboard/subscription" data-oid="h8ioyhc">
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild data-oid="ik.ijzy">
                  <Link href="/dashboard/submit" data-oid=":2.xje0">
                    Submit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator data-oid="x6eaqg5" />
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400"
                  onClick={handleSignOut}
                  data-oid="-w9cu7q"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
