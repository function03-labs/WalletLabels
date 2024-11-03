/* eslint-disable @typescript-eslint/no-unsafe-call */

import { getCurrentSubscription } from "@/lib/app/actions"
import { getSession } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    return NextResponse.json(null)
  }

  // Get subscription data for the user
  const subscription = await getCurrentSubscription(user.id)
  // Return combined user and subscription data
  return NextResponse.json({
    ...user,
    subscription
  })
}
