import { getCheckoutURL } from "@/lib/app/actions";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();

    if (!body.variantId) {
      return new Response(JSON.stringify({ error: "Product variant ID is required." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const checkoutUrl = await getCheckoutURL(Number(body.variantId), body.embed);
    return new Response(JSON.stringify({ url: checkoutUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },

    });
  } catch (error) {
    console.error("API Error creating checkout:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      body: body,
      stack: error instanceof Error ? error.stack : undefined
    });

    const errorMessage = error instanceof Error ? error.message : "Failed to create checkout session.";
    const status = errorMessage.includes("Authentication required") ? 401 :
      errorMessage.includes("Unprocessable Entity") ? 422 : 500;

    return new Response(JSON.stringify({
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
      requestBody: body
    }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}