import { redirect } from "next/navigation"

import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { AppAccountForm } from "@/components/app/app-account-form"
import { DashboardProfileDeleteAccount } from "@/components/app/dashboard-profile-delete-account"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Separator } from "@/components/ui/separator"

import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export const runtime = "edge"

export default async function PageDashboardAccount() {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/")
  }

  const user = await getUser(session.user.id)

  return (
    <section className="w-full py-4 sm:p-10">
      <PageHeader
        title="Account"
        description="Manage your account information"
      />
      <div className="h-4" />
      <IsSignedIn>
        <Card className="w-full p-6">
          <h3 className="text-2xl font-semibold">Profile</h3>
          <hr className="my-3 dark:opacity-30" />

          <AppAccountForm user={user} />
        </Card>
        <Separator className="my-3" />
        <Card className="w-full p-6">
          <h3 className="text-2xl font-semibold">Danger Zone</h3>
          <hr className="my-3 dark:opacity-30" />

          <DashboardProfileDeleteAccount user={session.user} />
        </Card>
      </IsSignedIn>
      <IsSignedOut>
        <ButtonSIWELogin />
      </IsSignedOut>
    </section>
  )
}
