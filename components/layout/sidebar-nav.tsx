"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils/index"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    label: string
    href?: string
  }[]
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
      data-oid="09wft_p"
    >
      {items.map((item, index) => {
        return item.href ? (
          <Link
            aria-label={item.label}
            key={index}
            href={item.href}
            data-oid="vq9r2tr"
          >
            <span
              className={cn(
                "group flex w-full cursor-pointer items-center rounded-md border border-transparent py-1 transition-all duration-200 ease-in-out hover:bg-muted hover:px-2 hover:text-foreground",
                pathname === item.href
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              )}
              data-oid="jvnx5z:"
            >
              <span data-oid="ohi3q65">{item.label}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
            data-oid="p9wea40"
          >
            {item.label}
          </span>
        )
      })}
    </div>
  )
}
