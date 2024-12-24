"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  FileText,
  Key,
  LayoutDashboard,
  Settings,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/dashboardnew",
    icon: LayoutDashboard,
  },
  {
    name: "API Keys",
    href: "/dashboardnew/api-keys",
    icon: Key,
  },
  {
    name: "Usage",
    href: "/dashboardnew/usage",
    icon: BarChart3,
    disabled: true,
  },
  {
    name: "Documentation",
    href: "/dashboardnew/docs",
    icon: FileText,
  },
  {
    name: "Billing",
    href: "/dashboardnew/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboardnew/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 px-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.disabled ? "#" : item.href}
            className={`group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
              isActive
                ? "bg-blue-500/10 text-blue-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            } ${
              item.disabled
                ? "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-gray-400"
                : ""
            }`}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault()
              }
            }}
          >
            <item.icon className="size-4" />
            <span>{item.name}</span>
            {item.disabled && (
              <span className="ml-auto text-xs text-gray-600">Coming soon</span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
