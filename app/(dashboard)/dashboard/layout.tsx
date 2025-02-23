import Link from "next/link"
import { redirect } from "next/navigation"
import { FaGithub, FaTwitter } from "react-icons/fa"

import { menuDashboard } from "@/config/menu-dashboard"
import { menuResources } from "@/config/menu-resources"
import { siteConfig } from "@/config/site"
import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

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

  if (!session?.user) {
    redirect("/")
  }

  const user = await getUser(session.user.id)

  if (!user) {
    redirect("/")
  }

  return (
    <div className="relative flex min-h-screen flex-col" data-oid="yfot4iu">
      <SiteHeader data-oid="fma90a_" />
      <div
        className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
        data-oid="wqqnjoj"
      >
        <aside
          className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 justify-between overflow-y-auto border-r md:sticky md:flex md:flex-col"
          data-oid="r283uhr"
        >
          <ScrollArea className="py-6 pr-6 lg:py-8" data-oid="_8f23fs">
            <h3
              className="pb-4 text-2xl font-semibold dark:text-white/80"
              data-oid="4pj.i9j"
            >
              Dashboard
            </h3>
            <SidebarNav items={menuDashboard} data-oid="06podbw" />

            <hr className="my-6 border-t border-muted" data-oid="u2fuycp" />

            <h3
              className="pb-4 text-2xl font-semibold dark:text-white/80"
              data-oid="s35sdph"
            >
              Resources
            </h3>
            <SidebarNav items={menuResources} data-oid="vlz_9st" />
          </ScrollArea>
          <footer
            className="fixed bottom-6 flex flex-col border-t pr-2 pt-4"
            data-oid="i-_h5q3"
          >
            <LoggedUser user={user} data-oid="2i6.-__" />
            <a
              href="https://fn03.xyz"
              target="_blank"
              rel="noreferrer"
              className="w-fit py-2 text-xs text-primary underline-offset-4 hover:underline"
              data-oid="v33s8s0"
            >
              Built by Function03 Labs
            </a>
            <div
              className="mt-2 flex items-center space-x-2 dark:text-white/80"
              data-oid="3axqlck"
            >
              <Link href={siteConfig.links.github} data-oid="5k_yl_j">
                <FaGithub data-oid="fi63rmq" />
              </Link>
              <Link href={siteConfig.links.twitter} data-oid="z891ugg">
                <FaTwitter data-oid="ktzboii" />
              </Link>
            </div>
          </footer>
        </aside>
        <main
          className="flex w-full flex-col overflow-hidden"
          data-oid="0ovd2m-"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
