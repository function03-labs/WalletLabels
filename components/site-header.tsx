"use client"

import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <button
            onClick={() => router.push("/dashboardnew")}
            className="flex items-center gap-2 font-semibold text-white"
          >
            <div className="relative flex size-8 items-center justify-center rounded bg-blue-500">
              <div className="absolute size-4 animate-pulse rounded-sm bg-white/50 blur-sm" />
              <div className="relative text-lg">W</div>
            </div>
            <span>wlbls.datasets</span>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <nav className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
                  <User className="size-5" />
                  <span>{session?.user?.name || "Account"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => router.push("/dashboardnew/settings")}
                >
                  <User className="mr-2 size-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                  className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <LogOut className="mr-2 size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
