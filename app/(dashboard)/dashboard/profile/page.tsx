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
    <section className="w-full py-4 sm:p-10" data-oid="k:9lahk">
      <PageHeader
        title="Account"
        description="Manage your account information"
        data-oid="dzr1rdi"
      />

      <div className="h-4" data-oid="cpvake." />
      <Card className="w-full p-6" data-oid="71q90.j">
        <h3 className="text-2xl font-semibold" data-oid="26narvm">
          Profile
        </h3>
        <hr className="my-3 dark:opacity-30" data-oid="-evu8ut" />
        <AppAccountForm user={user} data-oid="5yhrdkh" />
      </Card>
    </section>
  )
}
