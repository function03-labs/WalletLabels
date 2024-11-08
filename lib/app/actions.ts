"use server";

import crypto from "node:crypto";
import {
  cancelSubscription,
  createCheckout,
  createWebhook,
  getPrice,
  getProduct,
  getSubscription,
  listPrices,
  listProducts,
  listWebhooks,
  updateSubscription,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { configureLemonSqueezy } from "@/config/lemonsqueezy";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
// import { webhookHasData, webhookHasMeta } from "@/lib/typeguards";
import { siweLogout } from "@/integrations/siwe/actions/siwe-logout";
import { Subscription } from "@prisma/client"
import { webhookHasMeta, webhookHasData } from "../typeguards";

/**
 * This action will log out the current user.
 */
export async function logout() {
  await siweLogout();
}

/**
 * This action will create a checkout on Lemon Squeezy.
 */
export async function getCheckoutURL(variantId: number, embed = false) {
  configureLemonSqueezy();

  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated.");
  }

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: session.user.email ?? undefined,
        custom: {
          user_id: session.user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
        receiptButtonText: "Go back to Dashboard",
        receiptThankYouNote: "Thank you for signing up to WalletLabels!",
      },
    },
  );

  return checkout.data?.data.attributes.url;
}




/**
 * This action will get the subscriptions for the current user.
 */
export async function getUserSubscriptions() {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    notFound();
  }

  const userSubscriptions = await prisma.subscription.findMany({
    where: {
      userId,
    },
  });

  revalidatePath("/");

  return userSubscriptions;
}




/**
 * Cancels a subscription in Lemon Squeezy
 */
export async function cancelSub(id: string) {
  configureLemonSqueezy()

  const cancelledSub = await cancelSubscription(id)

  if (cancelledSub.error) {
    throw new Error(cancelledSub.error.message)
  }

  // Update the subscription in your database
  try {
    await prisma.subscription.update({
      where: {
        lemonSqueezyId: id
      },
      data: {
        status: cancelledSub.data?.data.attributes.status,
        statusFormatted: cancelledSub.data?.data.attributes.status_formatted,
        endsAt: cancelledSub.data?.data.attributes.ends_at,
      }
    })
  } catch (error) {
    throw new Error(`Failed to cancel Subscription #${id} in the database.`)
  }

  revalidatePath('/dashboard/subscription')
  return cancelledSub
}

/**
 * Pauses a subscription in Lemon Squeezy
 */
export async function pauseUserSubscription(id: string) {
  configureLemonSqueezy()

  const returnedSub = await updateSubscription(id, {
    pause: {
      mode: 'void',
    },
  })

  // Update the subscription in your database
  try {
    await prisma.subscription.update({
      where: {
        lemonSqueezyId: id
      },
      data: {
        status: returnedSub.data?.data.attributes.status,
        statusFormatted: returnedSub.data?.data.attributes.status_formatted,
        endsAt: returnedSub.data?.data.attributes.ends_at,
        isPaused: returnedSub.data?.data.attributes.pause !== null,
      }
    })
  } catch (error) {
    throw new Error(`Failed to pause Subscription #${id} in the database.`)
  }

  revalidatePath('/dashboard/subscription')
  return returnedSub
}

/**
 * Unpauses a subscription in Lemon Squeezy
 */
export async function unpauseUserSubscription(id: string) {
  configureLemonSqueezy()

  const returnedSub = await updateSubscription(id, {
    pause: null,
  })

  // Update the subscription in your database
  try {
    await prisma.subscription.update({
      where: {
        lemonSqueezyId: id
      },
      data: {
        status: returnedSub.data?.data.attributes.status,
        statusFormatted: returnedSub.data?.data.attributes.status_formatted,
        endsAt: returnedSub.data?.data.attributes.ends_at,
        isPaused: false,
      }
    })
  } catch (error) {
    throw new Error(`Failed to unpause Subscription #${id} in the database.`)
  }

  revalidatePath('/dashboard/subscription')
  return returnedSub
}

/**
 * This action will change the plan of a subscription on Lemon Squeezy.
 */
export async function changePlan(currentPlanId: number, newPlanId: number) {
  configureLemonSqueezy();

  // Get user subscriptions
  const userSubscriptions = await getUserSubscriptions();

  // Check if the subscription exists
  const subscription = userSubscriptions.find(
    (sub) => sub.planId === currentPlanId,
  );

  if (!subscription) {
    throw new Error(
      `No subscription with plan id #${currentPlanId} was found.`,
    );
  }

  // Get the new plan details from the database
  const newPlan = await prisma.plan.findUniqueOrThrow({
    where: { id: newPlanId },
  });

  // Send request to Lemon Squeezy to change the subscription
  const updatedSub = await updateSubscription(subscription.lemonSqueezyId, {
    variantId: newPlan.variantId,
  });

  // Save in db
  try {
    await prisma.subscription.update({
      where: { lemonSqueezyId: subscription.lemonSqueezyId },
      data: {
        planId: newPlanId,
        price: newPlan.price,
        endsAt: updatedSub.data?.data.attributes.ends_at,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to update Subscription #${subscription.lemonSqueezyId} in the database.`,
    );
  }

  revalidatePath("/");

  return updatedSub;
}

/**
 * Gets the current subscription for a user.
 * Returns a FREE tier subscription if no active subscription is found.
 */
export async function getCurrentSubscription(userId: string): Promise<Subscription> {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: "active"
    }
  })

  if (!subscription) {
    console.log("no subscription found")
    return {
      id: `free-${userId}`,
      lemonSqueezyId: "free",
      orderId: 0,
      status: "active",
      renewsAt: null,
      name: "Free Plan",
      email: "",
      statusFormatted: "Active",
      endsAt: null,
      trialEndsAt: null,
      price: "0",
      isUsageBased: false,
      isPaused: false,
      subscriptionItemId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      planId: 0,
      user: null!,
      plan: null!,
    }
  }

  return subscription
}

/**
 * This action will store a webhook event in the database.
 */
export async function storeWebhookEvent(
  eventName: string,
  body: any, // Replace with proper type
) {
  const id = crypto.randomInt(100000000, 1000000000);

  const webhookEvent = await prisma.webhookEvent.create({
    data: {
      id,
      eventName,
      processed: false,
      body,
    },
  });

  return webhookEvent;
}




/**
 * This action will process a webhook event in the database.
 */
export async function processWebhookEvent(webhookEvent: any) {
  configureLemonSqueezy();

  const dbwebhookEvent = await prisma.webhookEvent.findUnique({
    where: { id: webhookEvent.id },
  });

  if (!dbwebhookEvent) {
    throw new Error(`Webhook event #${webhookEvent.id} not found in the database.`);
  }

  let processingError = "";
  const eventBody = webhookEvent.body;

  if (!webhookHasMeta(eventBody)) {
    processingError = "Event body is missing the 'meta' property.";
  } else if (webhookHasData(eventBody)) {
    if (webhookEvent.eventName.startsWith("subscription_")) {
      const attributes = eventBody.data.attributes;
      const variantId = attributes.variant_id as string;

      // Get the plan from the database
      const plan = await prisma.plan.findFirst({
        where: { variantId: parseInt(variantId, 10) },
      });

      if (!plan) {
        processingError = `Plan with variantId ${variantId} not found.`;
      } else {
        const priceId = attributes.first_subscription_item.price_id;

        // Get the price data from Lemon Squeezy
        const priceData = await getPrice(priceId);
        if (priceData.error) {
          processingError = `Failed to get price data for subscription ${eventBody.data.id}.`;
        }

        try {
          await prisma.subscription.upsert({
            where: { lemonSqueezyId: eventBody.data.id },
            create: {
              lemonSqueezyId: eventBody.data.id,
              orderId: attributes.order_id as number,
              status: attributes.status as string,
              statusFormatted: attributes.status_formatted as string,
              renewsAt: attributes.renews_at as string,
              endsAt: attributes.ends_at as string,
              price: priceData.data?.data.attributes.unit_price.toString() ?? "",
              isUsageBased: attributes.first_subscription_item.is_usage_based,
              isPaused: false,
              subscriptionItemId: attributes.first_subscription_item.id,
              userId: eventBody.meta.custom_data.user_id,
              planId: plan.id,
              name: attributes.user_name as string,
              email: attributes.user_email as string,
            },
            update: {
              status: attributes.status as string,
              statusFormatted: attributes.status_formatted as string,
              renewsAt: attributes.renews_at as string,
              endsAt: attributes.ends_at as string,
              price: priceData.data?.data.attributes.unit_price.toString() ?? "",
              isPaused: false,
              name: attributes.user_name as string,
              email: attributes.user_email as string,
            },
          });
        } catch (error) {
          processingError = `Failed to upsert Subscription #${eventBody.data.id}`;
          console.error(error);
        }
      }
    }
  }

  // Update the webhook event status
  await prisma.webhookEvent.update({
    where: { id: webhookEvent.id },
    data: {
      processed: true,
      processingError,
    },
  });
}
