import { randomBytes } from 'crypto';
import { env } from "@/env.mjs";
import Airwallex from '@/types/airwallex';

const API_URL = env.AIRWALLEX_API_URL || 'https://api-demo.airwallex.com';
const CLIENT_ID = env.AIRWALLEX_CLIENT_ID;
const API_KEY = env.AIRWALLEX_API_KEY;

export class AirwallexAuth {
  private authToken: string | null = null;
  private tokenExpiry: Date | null = null;

  async authenticate() {
    try {
      const response = await fetch(`${API_URL}/api/v1/authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": CLIENT_ID,
          "x-api-key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.authToken = data.token;
      this.tokenExpiry = new Date(data.expires_at);
    } catch (error) {
      console.error("Authentication failed", { error: (error as Error).message });
      throw error;
    }
  }

  async getAuthToken() {
    if (!this.authToken || new Date() >= this.tokenExpiry!) {
      await this.authenticate();
    }
    return this.authToken!;
  }
}

function generateRequestId(prefix: string) {
  return `${prefix}-${randomBytes(8).toString("hex")}`;
}

async function makeAirwallexRequest<T extends Airwallex.AirwallexResponse>(endpoint: string, method: string, body: any): Promise<T> {
  const airwallexAuth = new AirwallexAuth();
  const authToken = await airwallexAuth.getAuthToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody: Airwallex.AirwallexErrorResponse = await response.json();
    console.error('Airwallex API error response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    });
    throw new Error(`Airwallex API error: ${errorBody.code} - ${errorBody.message}`);
  }

  return await response.json() as T;
}

export async function createAirwallexCustomer(address: string): Promise<Airwallex.Customer> {
  const requestBody = {
    email: `${address.slice(0, 6)}@example.com`,
    first_name: "User",
    last_name: address.slice(0, 6),
    merchant_customer_id: address,
    metadata: {
      user_id: address
    },
    request_id: generateRequestId('create-customer')
  };

  try {
    return await makeAirwallexRequest<Airwallex.Customer>('/api/v1/pa/customers/create', 'POST', requestBody);
  } catch (error) {
    console.error('Error creating Airwallex customer:', error);
    throw new Error('Failed to create Airwallex customer');
  }
}

export async function createPaymentConsent(customerId: string, currency: string = 'USD'): Promise<Airwallex.PaymentConsent> {
  const paymentConsentData = {
    customer_id: customerId,
    currency,
    next_triggered_by: 'merchant',
    merchant_trigger_reason: 'scheduled',
    requires_cvc: false,
    request_id: generateRequestId('consent'),
  };

  return await makeAirwallexRequest<Airwallex.PaymentConsent>('/api/v1/pa/payment_consents/create', 'POST', paymentConsentData);
}

export async function verifyPaymentConsent(paymentConsentId: string, paymentMethod: any, customerId: string): Promise<Airwallex.VerifiedPaymentConsent> {
  const verificationData = {
    payment_consent_id: paymentConsentId,
    payment_method: paymentMethod,
    customer_id: customerId,
    request_id: generateRequestId('verify-consent'),
  };

  return await makeAirwallexRequest<Airwallex.VerifiedPaymentConsent>(`/api/v1/pa/payment_consents/${paymentConsentId}/verify`, 'POST', verificationData);
}

export async function createPaymentIntent(customerId: string, amount: number, currency: string, paymentConsentId: string): Promise<Airwallex.PaymentIntent> {
  const paymentIntentData = {
    amount,
    currency,
    customer_id: customerId,
    payment_consent_id: paymentConsentId,
    request_id: generateRequestId('payment-intent'),
  };

  return await makeAirwallexRequest<Airwallex.PaymentIntent>('/api/v1/pa/payment_intents/create', 'POST', paymentIntentData);
}

export async function createSubscription(customerId: string, paymentConsentId: string, priceId: string, quantity: number, frequency: string): Promise<Airwallex.Subscription> {
  const subscriptionData = {
    customer_id: customerId,
    payment_consent_id: paymentConsentId,
    items: [
      {
        price_id: priceId,
        quantity: quantity,
      }
    ],
    recurring: {
      period: frequency === "monthly" ? 1 : frequency === "biannually" ? 6 : 12,
      period_unit: "MONTH"
    },
    request_id: generateRequestId('subscription'),
  };

  return await makeAirwallexRequest<Airwallex.Subscription>('/api/v1/subscriptions/create', 'POST', subscriptionData);
}
