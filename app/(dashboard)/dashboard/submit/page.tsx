import React from "react"
import { redirect } from "next/navigation"

import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { DashboardSubmitBulkAddress } from "@/components/app/dashboard-submit-bulk-address"
import { DashboardSubmitSoloAddress } from "@/components/app/dashboard-submit-solo-address"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Separator } from "@/components/ui/separator"

import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export const runtime = "edge"

export default async function SubmitPage() {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/")
  }

  const user = await getUser(session.user.id)

  return (
    <section className="w-full py-4 sm:p-10">
      <PageHeader
        title="Submit"
        description="Contribute new labels and get rewarded!"
      />
      <div className="h-4" />
      <IsSignedIn>
        <Card className="w-full p-6">
          <h3 className="text-2xl font-semibold">Bulk</h3>
          <hr className="my-3 dark:opacity-30" />
          <DashboardSubmitBulkAddress />
        </Card>
        <Separator />
        <Card className="w-full p-6">
          <h3 className="text-2xl font-semibold">Submit Label</h3>
          <hr className="my-3 dark:opacity-30" />
          <DashboardSubmitSoloAddress userId={user.id} />
        </Card>
      </IsSignedIn>
      <IsSignedOut>
        <ButtonSIWELogin />
      </IsSignedOut>
    </section>
  )
}
