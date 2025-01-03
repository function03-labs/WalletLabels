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
    <section className="w-full py-4">
      <div className="h-4" />
      <Card className="w-full">
        <CardHeader>
          <PageHeader
            title="Submit"
            description="Contribute new labels and get rewarded!"
          />
        </CardHeader>
        <CardContent>
          <DashboardSubmitLabel userId={user.email} />
        </CardContent>
      </Card>
    </section>
  )
}
