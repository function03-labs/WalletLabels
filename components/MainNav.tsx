"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";

import { Icons } from "@component/ui/Lucide";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-1.5">
        <Icons.logo className="size-6" />
        <span className="font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ?? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <div key={index}>
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                    {item.new && (
                      <span className="relative bottom-[7px] flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                      </span>
                    )}
                  </Link>
                </div>
              )
          )}
        </nav>
      )}
    </div>
  );
}
