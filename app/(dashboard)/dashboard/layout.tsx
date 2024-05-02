import Link from "next/link"
import { redirect } from "next/navigation"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

import { menuDashboard } from "@/config/menu-dashboard"
import { menuResources } from "@/config/menu-resources"
import { siteConfig } from "@/config/site"
import { getSession } from "@/lib/session"

import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { LoggedUser } from "@/components/layout/logged-user"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { SiteHeader } from "@/components/layout/site-header"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/")
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 justify-between overflow-y-auto border-r md:sticky md:flex md:flex-col">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <h3 className="pb-4 text-2xl font-semibold">Dashboard</h3>
            <SidebarNav items={menuDashboard} />
            <hr className="border-muted my-6 border-t" />

            <h3 className="pb-4 text-2xl font-semibold">Resources</h3>

            <SidebarNav items={menuResources} />
          </ScrollArea>
          <footer className="fixed bottom-6 flex flex-col border-t pr-2 pt-4">
            <LoggedUser />
            <a
              href="https://fn03.xyz"
              target="_blank"
              rel="noreferrer"
              className="text-primary w-fit py-2 text-xs underline-offset-4 hover:underline"
            >
              Built by Function03 Labs
            </a>
            <div className="mt-2 flex items-center space-x-2">
              <Link href={siteConfig.links.github}>
                <FaGithub />
              </Link>
              <Link href={siteConfig.links.twitter}>
                <FaTwitter />
              </Link>
              <Link href={siteConfig.links.telegram}>
                <FaDiscord />
              </Link>
            </div>
          </footer>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <div className="fixed bottom-6 right-6">
        <WalletConnect />
      </div>
    </div>
  )
}
