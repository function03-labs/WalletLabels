import { getCurrentSubscription } from "@/lib/app/actions"
import { getSession } from "@/lib/session"

export async function GET() {
  const session = await getSession()

  if (session?.user) {
    console.log(session?.user);
    const subscription = session.user.id
      ? await getCurrentSubscription(session.user.id)
      : null
    console.log(subscription)

    return Response.json({
      address: session.user.address,
      isLoggedIn: true,
      user: session.user,
      subscription
    }, { status: 200, headers: { "Content-Type": "application/json" } })
  }

  return Response.json({
    isLoggedIn: false
  }, { status: 200, headers: { "Content-Type": "application/json" } })
}