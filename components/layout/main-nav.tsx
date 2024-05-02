"use client"

import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { LightDarkImage } from "@/components/shared/light-dark-image"
import { components, ListItem } from "@/components/shared/list-item"
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const links = [
  {
    title: "Documentation",
    path: "https://docs.walletlabels.xyz/",
    name: "docs",
  },
  {
    title: "Open Source",
    path: "https://github.com/function03-labs/WalletLabels",
    name: "open-source",
  },
  {
    title: "Updates",
    path: "https://twitter.com/walletlabels",
    name: "updates",
  },
]

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LightDarkImage
          LightImage="/logo-dark.png"
          DarkImage="/logo-light.png"
          alt="WalletLabel Logo"
          className="rounded-full"
          height={32}
          width={32}
        />
        <span className="hidden bg-clip-text text-2xl font-bold text-black dark:text-white sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-base font-medium">
        <MainNavMenu />
      </nav>
    </div>
  )
}

function MainNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <ul className="mx-3 hidden space-x-2 text-sm font-medium md:flex">
            <li>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-[#FDFDFC] dark:bg-[#121212]">
                    <div className="flex">
                      <Link
                        href="https://www.walletlabels.xyz"
                        className="border-r-DEFAULT border-border"
                      >
                        <div className="mb-6 w-[215px]">
                          <NavigationMenuLink asChild>
                            <GlowingStarsBackgroundCard>
                              <span className="text-lg font-medium">
                                Wallet Labels Engine
                              </span>
                              <div className="flex items-end justify-between">
                                <p className="line-clamp-2 text-sm leading-snug text-[#707070]">
                                  One API to rule them all. Unlimited
                                  connections.
                                </p>
                              </div>
                            </GlowingStarsBackgroundCard>
                          </NavigationMenuLink>
                        </div>
                      </Link>
                      <ul className="flex w-[400px] flex-col p-4">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            image={component.image}
                            external={component.external}
                          />
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </li>
            {links.map(({ path, name, title }) => {
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className={cn(
                      "mt-1 inline-flex h-8 items-center justify-center rounded-md px-3 py-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary"
                    )}
                  >
                    {title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
