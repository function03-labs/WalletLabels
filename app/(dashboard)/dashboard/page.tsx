import { redirect } from "next/navigation"

import { getApiKeys } from "@/lib/app/api-key"
import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { DashboardGenerateAPIkeysDialog } from "@/components/app/dashboard-generate-apikeys-dialog"
import { DashboardTableAPIKeys } from "@/components/app/dashboard-table-apikeys"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

export default async function PageDashboardApiKeys() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/")
  }

  // Get user from database
  const user = await getUser(session.user.id)

  if (!user) {
    redirect("/")
  }

  // Get API keys for the user
  const apiKeys = await getApiKeys(user.id)

  return (
    <section className="w-full py-2 sm:p-10">
      <div>
        <PageHeader title="API Keys" description="Manage your API keys." />
      </div>
      <hr className="my-5 opacity-50" />
      <Card className="w-full p-6">
        <CardContent>
          <DashboardGenerateAPIkeysDialog
            user={user}
            apiKeysCount={apiKeys.length}
          />
        </CardContent>

        <DashboardTableAPIKeys apiKeys={apiKeys} />
      </Card>
    </section>
  )
}
