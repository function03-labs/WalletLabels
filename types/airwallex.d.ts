declare namespace Airwallex {
  interface AirwallexResponse {
    [key: string]: any;
  }

  interface AirwallexErrorResponse {
    code: string;
    source?: string;
    message: string;
    trace_id: string;
    details?: Record<string, any>;
  }

  interface PaymentIntent extends AirwallexResponse {
    id: string;
    amount: number;
    currency: string;
    customer_id: string;
    payment_consent_id?: string;
    status: string;
  }

  interface PaymentConsent extends AirwallexResponse {
    id: string;
    customer_id: string;
    payment_method: any; 
    next_triggered_by: string;
    merchant_trigger_reason: string;
    status: string;
  }

  interface VerifiedPaymentConsent extends PaymentConsent {
  }

  interface Subscription extends AirwallexResponse {
    id: string;
    customer_id: string;
    payment_consent_id: string;
    items: Array<{
      price_id: string;
      quantity: number;
    }>;
    recurring: {
      period: number;
      period_unit: string;
    };
    status: string;
  }

  interface Customer extends AirwallexResponse {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    merchant_customer_id: string;
    metadata: {
      user_id: string;
    };
  }
}

export = Airwallex;
export as namespace Airwallex;