import { redirect } from "next/navigation"

import { getApiKeys } from "@/lib/app/api-key"
import { getSession } from "@/lib/session"

import { DashboardGenerateAPIkeysDialog } from "@/components/app/dashboard-generate-apikeys-dialog"
import { DashboardTableAPIKeys } from "@/components/app/dashboard-table-apikeys"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export const runtime = "edge"

export default async function PageDashboardApiKeys() {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/")
  }

  const apiKeys = await getApiKeys(session.user.id)

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
            <DashboardGenerateAPIkeysDialog
              user={session.user}
              apiKeysCount={apiKeys.length}
            />
          </CardContent>

          <DashboardTableAPIKeys apiKeys={apiKeys} />
        </Card>
      </IsSignedIn>
    </section>
  )
}
