import { getCurrentSubscription } from "@/lib/app/actions"
import { getSession } from "@/lib/session"

export async function GET() {
  try {
    const session = await getSession()

    if (session?.user) {
      const subscription = session.user.id
        ? await getCurrentSubscription(session.user.id)
        : null


      return Response.json({
        address: session.user.address,
        isLoggedIn: true,
        user: session.user,
        subscription
      }, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Add cache control headers to help with stale data
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        }
      })
    }

    return Response.json({
      isLoggedIn: false
    }, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      }
    })
  } catch (error) {
    console.error('Error in user API route:', error)

    return Response.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}