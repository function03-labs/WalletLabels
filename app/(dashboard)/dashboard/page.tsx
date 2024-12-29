import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { User } from "next-auth"

import { getCurrentSubscription } from "@/lib/app/actions"
import { getApiKeys } from "@/lib/app/api-key"
import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { DashboardGenerateAPIkeysDialog } from "@/components/app/dashboard-generate-apikeys-dialog"
import { DashboardTableAPIKeys } from "@/components/app/dashboard-table-apikeys"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

// Always revalidate the page to get the latest user data in case of an update
export const revalidate = 0

const planToApiKeyLimit: Record<number, number> = {
  0: 0, // Free
  1: 3, // Basic Monthly
  2: 3, // Basic Bi-Annually
  3: 3, // Basic Annually
  4: 5, // Pro Monthly
  5: 5, // Pro Bi-Annually
  6: 5, // Pro Annually
  7: 25, // Enterprise
}

async function APIKeysTable({
  user,
  apiKeyLimit,
}: {
  user: User
  apiKeyLimit: number
}) {
  const apiKeys = await getApiKeys(user.id) // This will be fresh on each render

  return (
    <DashboardTableAPIKeys
      apiKeys={apiKeys}
      user={user}
      apiKeyLimit={apiKeyLimit}
    />
  )
}

export default async function PageDashboardApiKeys() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/")
  }

  // Get user from database
  const user = await getUser(session.user.id)
  const subscription = await getCurrentSubscription(user.id)
  const isFreeTier = subscription.planId === 0
  const apiKeyLimit = planToApiKeyLimit[subscription.planId]

  if (!user) {
    redirect("/")
  }

  if (!user.email) {
    redirect("/dashboard/profile")
  }

  // Get API keys for the user
  const apiKeys = await getApiKeys(user.id)

  return (
    <section className="w-full py-2 sm:p-10">
      {isFreeTier ? (
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Unlock WalletLabels API Access
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You’re currently on a free plan. To utilize the WalletLabels API
              and access advanced features, you’ll need to subscribe to one of
              our plans. Choose the plan that fits your needs and start
              leveraging powerful tools to analyze and categorize blockchain
              wallets.
            </p>
            <Link href="/dashboard/subscription">
              <Button className="w-full rounded-lg bg-secondary-foreground px-6 py-2 text-center font-semibold text-background transition-colors sm:w-auto">
                Explore Plans
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div>
            <PageHeader title="API Keys" description="Manage your API keys." />
          </div>
          <hr className="my-5 opacity-50" />
          <Card className="w-full p-6">
            <CardContent>
              <DashboardGenerateAPIkeysDialog
                user={user}
                apiKeysCount={apiKeys.length}
                apiKeyLimit={apiKeyLimit}
              />
              <Suspense fallback={<div>Loading...</div>}>
                <APIKeysTable user={user} apiKeyLimit={apiKeyLimit} />
              </Suspense>
            </CardContent>
          </Card>
        </>
      )}
    </section>
  )
}
