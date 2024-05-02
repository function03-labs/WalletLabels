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
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {items.map((item, index) => {
        return item.href ? (
          <Link aria-label={item.label} key={index} href={item.href}>
            <span
              className={cn(
                "hover:bg-muted hover:text-foreground group flex w-full cursor-pointer items-center rounded-md border border-transparent py-1 transition-all duration-200 ease-in-out hover:px-2",
                pathname === item.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              <span>{item.label}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline"
          >
            {item.label}
          </span>
        )
      })}
    </div>
  )
}
