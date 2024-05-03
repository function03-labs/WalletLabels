"use client"

import { useState } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { apiEndpoints, endpoints } from "@/data/walletlabels-api-endpoints"
import { LuMenu } from "react-icons/lu"

import { menuDashboard } from "@/config/menu-dashboard"
import { cn } from "@/lib/utils"

import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { ModeToggle } from "@/components/shared/mode-toggle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex w-full items-center md:hidden">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="ml-auto mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white md:hidden"
          >
            <LuMenu className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="right" className="pr-0">
        <div className="flex items-center gap-x-4">
          <MobileLink
            href="/"
            className="flex items-center"
            onOpenChange={setOpen}
          >
            <LightDarkImage
              LightImage="/logo-dark.png"
              DarkImage="/logo-light.png"
              alt="WalletLabels Logo"
              height={32}
              width={32}
            />
          </MobileLink>
          <ModeToggle />
        </div>
        <ScrollArea className="my-4 mr-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-4">
            <Accordion type="single" collapsible className="mx-auto w-full">
              <IsWalletConnected>
                <IsSignedIn>
                  <AccordionItem value="dashboard">
                    <AccordionTrigger className="text-base font-medium dark:text-white">
                      Dashboard
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {menuDashboard?.map((item, index) =>
                          item.href ? (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={() => setOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <div
                              key={index}
                              className="text-muted-foreground/70 transition-colors"
                            >
                              {item.label}
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </IsSignedIn>
              </IsWalletConnected>
              <AccordionItem value="api">
                <AccordionTrigger className="text-base font-medium dark:text-white">
                  API
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2">
                    {apiEndpoints.map((category) => {
                      const endpointIntegrations = endpoints[category]

                      return (
                        endpointIntegrations.length > 0 && (
                          <>
                            <h4 className="text-sm font-medium leading-none dark:text-white">
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </h4>
                            <Separator className="col-span-3" />
                            {endpointIntegrations.map(({ name, url }) => (
                              <NavMenuListItem
                                key={name}
                                name={name}
                                href={url}
                                onOpenChange={setOpen}
                              />
                            ))}
                          </>
                        )
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="https://docs.turboeth.xyz/overview"
              className="font-medium dark:text-white"
            >
              Documentation
            </Link>
            <Separator />
          </div>
        </ScrollArea>
        <div className="-mt-4 flex items-center justify-between space-x-2">
          <IsWalletDisconnected>
            <Button>
              <WalletConnect />
            </Button>
          </IsWalletDisconnected>
          <IsWalletConnected>
            <IsSignedOut>
              <ButtonSIWELogin />
            </IsSignedOut>
          </IsWalletConnected>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

interface NavMenuListItemProps {
  name: string
  href: string
  lightImage?: string
  darkImage?: string
  onOpenChange?: (open: boolean) => void
}

const NavMenuListItem = ({
  name,
  href,
  lightImage,
  darkImage,
  onOpenChange,
}: NavMenuListItemProps) => {
  return (
    <li key={name}>
      <MobileLink
        onOpenChange={onOpenChange}
        href={href}
        className="block select-none space-y-1 rounded-md py-3 pl-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="flex items-center space-x-2">
          {lightImage && darkImage && (
            <LightDarkImage
              LightImage={lightImage}
              DarkImage={darkImage}
              alt="icon"
              height={16}
              width={16}
              className="size-4"
            />
          )}

          <span className="text-sm font-medium leading-none dark:text-white">
            {name}
          </span>
        </div>
      </MobileLink>
    </li>
  )
}
