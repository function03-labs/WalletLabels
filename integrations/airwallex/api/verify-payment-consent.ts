import { NextResponse } from 'next/server'
import { verifyPaymentConsent } from '@/integrations/airwallex'

export async function POST(request: Request) {
  try {
    const { paymentConsentId, paymentMethod, customerId } = await request.json()

    if (!paymentConsentId || !paymentMethod || !customerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const data = await verifyPaymentConsent(paymentConsentId, paymentMethod, customerId)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error verifying payment consent:', error)
    return NextResponse.json({ error: 'Error verifying payment consent' }, { status: 500 })
  }
}