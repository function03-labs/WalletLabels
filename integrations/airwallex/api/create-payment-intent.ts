import { NextResponse } from 'next/server'
import { createPaymentIntent } from '@/integrations/airwallex'

export async function POST(request: Request) {
  try {
    const { customerId, amount, currency, paymentConsentId } = await request.json()

    if (!customerId || !amount || !currency || !paymentConsentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const data = await createPaymentIntent(customerId, amount, currency, paymentConsentId)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}