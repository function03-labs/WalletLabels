import { NextResponse } from 'next/server'
import { createPaymentConsent } from '@/integrations/airwallex'

export async function POST(request: Request) {
  try {
    const { customerId, currency } = await request.json()

    if (!customerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const data = await createPaymentConsent(customerId, currency)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating payment consent:', error)
    return NextResponse.json({ error: 'Error creating payment consent' }, { status: 500 })
  }
}