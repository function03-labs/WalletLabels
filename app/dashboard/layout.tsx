"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Code2,
  CreditCard,
  Key,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "API Keys",
    href: "/dashboard/api-keys",
    icon: Key,
  },
  {
    name: "Usage",
    href: "/dashboard/usage",
    icon: BarChart3,
  },
  {
    name: "Documentation",
    href: "/dashboard/docs",
    icon: Code2,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl transition-all ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <div className="relative flex size-8 items-center justify-center rounded bg-blue-500">
              <div className="absolute size-4 animate-pulse rounded-sm bg-white/50 blur-sm" />
              <div className="relative text-lg">W</div>
            </div>
            {!isCollapsed && <span>wlbls.datasets</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="size-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-2">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
            <User className="size-5" />
            {!isCollapsed && <span>John Doe</span>}
          </div>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300">
            <LogOut className="size-5" />
            {!isCollapsed && <span>Sign out</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all ${isCollapsed ? "ml-16" : "ml-64"}`}
      >
        <main className="min-h-screen p-8">{children}</main>
      </div>
    </div>
  )
}
