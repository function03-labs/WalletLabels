import { NextResponse } from 'next/server'
import { createSubscription } from '@/integrations/airwallex'

export async function POST(request: Request) {
  try {
    const { customerId, paymentConsentId, priceId, quantity, frequency } = await request.json()

    if (!customerId || !paymentConsentId || !priceId || !quantity || !frequency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const data = await createSubscription(customerId, paymentConsentId, priceId, quantity, frequency)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json({ error: 'Error creating subscription' }, { status: 500 })
  }
}