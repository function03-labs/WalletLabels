import { randomBytes } from 'crypto';
import { env } from "@/env.mjs";
import { AirwallexCustomer } from '@/types';

const API_URL = env.AIRWALLEX_API_URL || 'https://api-demo.airwallex.com';
const CLIENT_ID = env.AIRWALLEX_CLIENT_ID;
const API_KEY = env.AIRWALLEX_API_KEY;

class AirwallexAuth {
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

export async function createAirwallexCustomer(address: string) {
  const airwallexAuth = new AirwallexAuth(); // Create a new instance for each request
  const authToken = await airwallexAuth.getAuthToken();

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
    const response = await fetch(
      `${API_URL}/api/v1/pa/customers/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as AirwallexCustomer;
  } catch (error) {
    console.error('Error creating Airwallex customer:', error);
    throw error;
  }
}
