import Link from "next/link";
import * as React from "react";
import Image from "next/image";

import { cn } from "@lib/utils";
import { NavItem } from "@/types/nav";
import { chains } from "@config/chains";
import { siteConfig } from "@config/site";

import { Icons } from "@component/ui/Lucide";
import { buttonVariants } from "@component/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@component/ui/DropdownMenu";

interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <div className="flex items-center space-x-1.5 dark:text-slate-100">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md p-2 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700">
            <Icons.logo
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "icon",
                }),
                "mx-2 size-6 hover:opacity-80"
              )}
            />
            <span className="font-bold sm:inline-block">{siteConfig.name}</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <span className="font-semibold">Our supported chains</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {chains.map((chain, index) => (
              <DropdownMenuItem key={index}>
                <Link
                  className="flex w-full items-center gap-2"
                  href={`https://${chain.id}.${siteConfig.dns}`}
                >
                  <Image
                    src={`https://placehold.co/100x100/?text=${chain.label}`}
                    alt={chain.label}
                    width={32}
                    height={32}
                    className="size-4 rounded-md"
                  />
                  <span>{chain.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
    </div>
  );
}
