import { getCheckoutURL } from "@/lib/app/actions";

export async function POST(req: Request) {
  const { variantId, embed } = await req.json();

  try {
    const checkoutUrl = await getCheckoutURL(Number(variantId), embed);
    return new Response(JSON.stringify({ url: checkoutUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("API Error creating checkout:", error);
    return new Response(JSON.stringify({ error: "Failed to create checkout session." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}