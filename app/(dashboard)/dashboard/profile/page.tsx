import { redirect } from "next/navigation"

import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { AppAccountForm } from "@/components/app/app-account-form"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

export default async function PageDashboardAccount() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/")
  }

  const user = await getUser(session.user.id)

  if (!user) {
    redirect("/")
  }

  return (
    <section className="w-full py-4 sm:p-10">
      <PageHeader
        title="Account"
        description="Manage your account information"
      />
      <div className="h-4" />
      <Card className="w-full p-6">
        <h3 className="text-2xl font-semibold">Profile</h3>
        <hr className="my-3 dark:opacity-30" />
        <AppAccountForm user={user} />
      </Card>
    </section>
  )
}
