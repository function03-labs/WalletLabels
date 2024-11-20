import React from "react"
import { redirect } from "next/navigation"

import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { DashboardSubmitLabel } from "@/components/app/dashboard-submit-label"
import { DashboardSubmitBulkLabels } from "@/components/app/dashboard-submit-bulk-labels"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default async function SubmitPage() {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/")
  }

  const user = await getUser(session.user.id)

  return (
    <section className="w-full py-4">
      <div className="h-4" />
      <IsSignedIn>
        <Card className="w-full">
          <CardHeader>
            <PageHeader
              title="Submit"
              description="Contribute new labels and get rewarded!"
            />
          </CardHeader>
          <CardContent>
            <DashboardSubmitLabel userId={user.id} />
            <DashboardSubmitBulkLabels userId={user.id} />
          </CardContent>
        </Card>
      </IsSignedIn>
      <IsSignedOut>
        <ButtonSIWELogin />
      </IsSignedOut>
    </section>
  )
}
