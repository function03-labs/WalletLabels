import Link from "next/link"
import { redirect } from "next/navigation"

import { getApiKeys } from "@/lib/app/api-key"
import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { DashboardGenerateAPIkeysDialog } from "@/components/app/dashboard-generate-apikeys-dialog"
import { DashboardTableAPIKeys } from "@/components/app/dashboard-table-apikeys"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default async function PageDashboardApiKeys() {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/")
  }

  const apiKeys = await getApiKeys(session.user.id)
  const user = await getUser(session.user.id)
  const hasActiveSubscription = user.subscriptions?.some(
    (sub) =>
      sub.status === "active" &&
      !sub.isPaused &&
      (!sub.endsAt || new Date(sub.endsAt) > new Date()) &&
      sub.planId != 0 // Not free Tier
  )

  return (
    <section className="w-full py-2 sm:p-10">
      <div>
        <PageHeader title="API Keys" description="Manage your API keys." />
        <IsSignedOut>
          <div className="flex items-center justify-between gap-x-5 text-center">
            <span className="text-sm">
              Authenticate to access your api keys.
            </span>
          </div>
        </IsSignedOut>
      </div>
      <hr className="my-5 opacity-50" />
      <IsSignedIn>
        <Card className="w-full p-6">
          <CardContent>
            {hasActiveSubscription ? (
              <DashboardGenerateAPIkeysDialog
                user={user}
                apiKeysCount={apiKeys.length}
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
                <h3 className="text-lg font-semibold">Subscription Required</h3>
                <p className="text-muted-foreground">
                  You need an active subscription to generate API keys.
                </p>
                <Button asChild>
                  <Link href="/dashboard/subscription">
                    View Subscription Plans
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>

          <DashboardTableAPIKeys apiKeys={apiKeys} />
        </Card>
      </IsSignedIn>
    </section>
  )
}
