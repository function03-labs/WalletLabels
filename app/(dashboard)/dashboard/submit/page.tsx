import { redirect } from "next/navigation"

import { getUser } from "@/lib/app/user-profile"
import { getSession } from "@/lib/session"

import { DashboardSubmitLabel } from "@/components/app/dashboard-submit-label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

export default async function SubmitPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/")
  }

  // Get user from database using email
  const user = await getUser(session.user.id!)

  if (!user) {
    redirect("/")
  }

  return (
    <section className="w-full py-4" data-oid="aj4l9y9">
      <div className="h-4" data-oid="m69g0qf" />
      <Card className="w-full" data-oid="1.21fy_">
        <CardHeader data-oid="fn1gzau">
          <PageHeader
            title="Submit"
            description="Contribute new labels and get rewarded!"
            data-oid="_uvfd3c"
          />
        </CardHeader>
        <CardContent data-oid="uiill51">
          <DashboardSubmitLabel userId={user.email} data-oid="o3zjhdx" />
        </CardContent>
      </Card>
    </section>
  )
}
