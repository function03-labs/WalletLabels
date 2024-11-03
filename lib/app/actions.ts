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
  console.log(session)

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
        redirectUrl: `http://localhost:3000/dashboard/subscription`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
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




// /**
//  * This action will cancel a subscription on Lemon Squeezy.
//  */
// export async function cancelSub(id: string) {
//   configureLemonSqueezy();

//   // Get user subscriptions
//   const userSubscriptions = await getUserSubscriptions();

//   // Check if the subscription exists
//   const subscription = userSubscriptions.find(
//     (sub) => sub.lemonSqueezyId === id,
//   );

//   if (!subscription) {
//     throw new Error(`Subscription #${id} not found.`);
//   }

//   const cancelledSub = await cancelSubscription(id);

//   if (cancelledSub.error) {
//     throw new Error(cancelledSub.error.message);
//   }

//   // Update the db
//   try {
//     await prisma.subscription.update({
//       where: { lemonSqueezyId: id },
//       data: {
//         status: cancelledSub.data.data.attributes.status,
//         statusFormatted: cancelledSub.data.data.attributes.status_formatted,
//         endsAt: cancelledSub.data.data.attributes.ends_at,
//       },
//     });
//   } catch (error) {
//     throw new Error(`Failed to cancel Subscription #${id} in the database.`);
//   }

//   revalidatePath("/");

//   return cancelledSub;
// }

// /**
//  * This action will check if a webhook exists on Lemon Squeezy.
//  */
// export async function hasWebhook() {
//   configureLemonSqueezy();

//   if (!process.env.WEBHOOK_URL) {
//     throw new Error(
//       "Missing required WEBHOOK_URL env variable. Please, set it in your .env file.",
//     );
//   }

//   // Check if a webhook exists on Lemon Squeezy.
//   const allWebhooks = await listWebhooks({
//     filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
//   });

//   // Check if WEBHOOK_URL ends with a slash. If not, add it.
//   let webhookUrl = process.env.WEBHOOK_URL;
//   if (!webhookUrl.endsWith("/")) {
//     webhookUrl += "/";
//   }
//   webhookUrl += "api/webhook";

//   const webhook = allWebhooks.data?.data.find(
//     (wh) => wh.attributes.url === webhookUrl && wh.attributes.test_mode,
//   );

//   revalidatePath("/");

//   return webhook;
// }

// /**
//  * This action will set up a webhook on Lemon Squeezy.
//  */
// export async function setupWebhook() {
//   configureLemonSqueezy();

//   if (!process.env.WEBHOOK_URL) {
//     throw new Error(
//       "Missing required WEBHOOK_URL env variable. Please, set it in your .env file.",
//     );
//   }

//   // Check if WEBHOOK_URL ends with a slash. If not, add it.
//   let webhookUrl = process.env.WEBHOOK_URL;
//   if (!webhookUrl.endsWith("/")) {
//     webhookUrl += "/";
//   }
//   webhookUrl += "api/webhook";

//   // Do not set a webhook on Lemon Squeezy if it already exists.
//   let webhook = await hasWebhook();

//   // If the webhook does not exist, create it.
//   if (!webhook) {
//     const newWebhook = await createWebhook(process.env.LEMONSQUEEZY_STORE_ID!, {
//       secret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET!,
//       url: webhookUrl,
//       testMode: true,
//       events: [
//         "subscription_created",
//         "subscription_expired",
//         "subscription_updated",
//       ],
//     });

//     webhook = newWebhook.data?.data;
//   }

//   revalidatePath("/");
// }

// /**
//  * This action will store a webhook event in the database.
//  */
// export async function storeWebhookEvent(
//   eventName: string,
//   body: any, // Replace with proper type
// ) {
//   const id = crypto.randomInt(100000000, 1000000000);

//   const webhookEvent = await prisma.webhookEvent.create({
//     data: {
//       id,
//       eventName,
//       processed: false,
//       body,
//     },
//   });

//   return webhookEvent;
// }




// /**
//  * This action will process a webhook event in the database.
//  */
// export async function processWebhookEvent(webhookEvent: any) {
//   configureLemonSqueezy();

//   const dbwebhookEvent = await prisma.webhookEvent.findUnique({
//     where: { id: webhookEvent.id },
//   });

//   if (!dbwebhookEvent) {
//     throw new Error(`Webhook event #${webhookEvent.id} not found in the database.`);
//   }

//   let processingError = "";
//   const eventBody = webhookEvent.body;

//   if (!webhookHasMeta(eventBody)) {
//     processingError = "Event body is missing the 'meta' property.";
//   } else if (webhookHasData(eventBody)) {
//     if (webhookEvent.eventName.startsWith("subscription_")) {
//       const attributes = eventBody.data.attributes;
//       const variantId = attributes.variant_id as string;

//       // Get the plan from the database
//       const plan = await prisma.plan.findFirst({
//         where: { variantId: parseInt(variantId, 10) },
//       });

//       if (!plan) {
//         processingError = `Plan with variantId ${variantId} not found.`;
//       } else {
//         const priceId = attributes.first_subscription_item.price_id;

//         // Get the price data from Lemon Squeezy
//         const priceData = await getPrice(priceId);
//         if (priceData.error) {
//           processingError = `Failed to get price data for subscription ${eventBody.data.id}.`;
//         }

//         try {
//           await prisma.subscription.upsert({
//             where: { lemonSqueezyId: eventBody.data.id },
//             create: {
//               lemonSqueezyId: eventBody.data.id,
//               orderId: attributes.order_id as number,
//               status: attributes.status as string,
//               statusFormatted: attributes.status_formatted as string,
//               renewsAt: attributes.renews_at as string,
//               endsAt: attributes.ends_at as string,
//               price: priceData.data?.data.attributes.unit_price.toString() ?? "",
//               isUsageBased: attributes.first_subscription_item.is_usage_based,
//               isPaused: false,
//               subscriptionItemId: attributes.first_subscription_item.id,
//               userId: eventBody.meta.custom_data.user_id,
//               planId: plan.id,
//             },
//             update: {
//               status: attributes.status as string,
//               statusFormatted: attributes.status_formatted as string,
//               renewsAt: attributes.renews_at as string,
//               endsAt: attributes.ends_at as string,
//               price: priceData.data?.data.attributes.unit_price.toString() ?? "",
//               isPaused: false,
//             },
//           });
//         } catch (error) {
//           processingError = `Failed to upsert Subscription #${eventBody.data.id}`;
//           console.error(error);
//         }
//       }
//     }
//   }

//   // Update the webhook event status
//   await prisma.webhookEvent.update({
//     where: { id: webhookEvent.id },
//     data: {
//       processed: true,
//       processingError,
//     },
//   });
// }

// /**
//  * This action will pause a subscription on Lemon Squeezy.
//  */
// export async function pauseUserSubscription(id: string) {
//   configureLemonSqueezy();

//   // Get user subscriptions
//   const userSubscriptions = await getUserSubscriptions();

//   // Check if the subscription exists
//   const subscription = userSubscriptions.find(
//     (sub) => sub.lemonSqueezyId === id,
//   );

//   if (!subscription) {
//     throw new Error(`Subscription #${id} not found.`);
//   }

//   const returnedSub = await updateSubscription(id, {
//     pause: {
//       mode: "void",
//     },
//   });

//   // Update the db
//   try {
//     await prisma.subscription.update({
//       where: { lemonSqueezyId: id },
//       data: {
//         status: returnedSub.data?.data.attributes.status,
//         statusFormatted: returnedSub.data?.data.attributes.status_formatted,
//         endsAt: returnedSub.data?.data.attributes.ends_at,
//         isPaused: returnedSub.data?.data.attributes.pause !== null,
//       },
//     });
//   } catch (error) {
//     throw new Error(`Failed to pause Subscription #${id} in the database.`);
//   }

//   revalidatePath("/");

//   return returnedSub;
// }

// /**
//  * This action will unpause a subscription on Lemon Squeezy.
//  */
// export async function unpauseUserSubscription(id: string) {
//   configureLemonSqueezy();

//   // Get user subscriptions
//   const userSubscriptions = await getUserSubscriptions();

//   // Check if the subscription exists
//   const subscription = userSubscriptions.find(
//     (sub) => sub.lemonSqueezyId === id,
//   );

//   if (!subscription) {
//     throw new Error(`Subscription #${id} not found.`);
//   }

//   const returnedSub = await updateSubscription(id, { pause: null });

//   // Update the db
//   try {
//     await prisma.subscription.update({
//       where: { lemonSqueezyId: id },
//       data: {
//         status: returnedSub.data?.data.attributes.status,
//         statusFormatted: returnedSub.data?.data.attributes.status_formatted,
//         endsAt: returnedSub.data?.data.attributes.ends_at,
//         isPaused: returnedSub.data?.data.attributes.pause !== null,
//       },
//     });
//   } catch (error) {
//     throw new Error(`Failed to unpause Subscription #${id} in the database.`);
//   }

//   revalidatePath("/");

//   return returnedSub;
// }

// /**
//  * This action will change the plan of a subscription on Lemon Squeezy.
//  */
// export async function changePlan(currentPlanId: number, newPlanId: number) {
//   configureLemonSqueezy();

//   // Get user subscriptions
//   const userSubscriptions = await getUserSubscriptions();

//   // Check if the subscription exists
//   const subscription = userSubscriptions.find(
//     (sub) => sub.planId === currentPlanId,
//   );

//   if (!subscription) {
//     throw new Error(
//       `No subscription with plan id #${currentPlanId} was found.`,
//     );
//   }

//   // Get the new plan details from the database
//   const newPlan = await prisma.plan.findUniqueOrThrow({
//     where: { id: newPlanId },
//   });

//   // Send request to Lemon Squeezy to change the subscription
//   const updatedSub = await updateSubscription(subscription.lemonSqueezyId, {
//     variantId: newPlan.variantId,
//   });

//   // Save in db
//   try {
//     await prisma.subscription.update({
//       where: { lemonSqueezyId: subscription.lemonSqueezyId },
//       data: {
//         planId: newPlanId,
//         price: newPlan.price,
//         endsAt: updatedSub.data?.data.attributes.ends_at,
//       },
//     });
//   } catch (error) {
//     throw new Error(
//       `Failed to update Subscription #${subscription.lemonSqueezyId} in the database.`,
//     );
//   }

//   revalidatePath("/");

//   return updatedSub;
// }

/**
 * Gets the current subscription for a user.
 * Returns a FREE tier subscription if no active subscription is found.
 */
export async function getCurrentSubscription(userId: string): Promise<Subscription> {
  console.log("userId", userId)
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: "ACTIVE"
    }
  })

  if (!subscription) {
    console.log("no subscription found")
    return {
      id: `free-${userId}`,
      lemonSqueezyId: "",
      orderId: "",
      status: "ACTIVE",
      renewsAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      planId: 0,
    }
  }

  return subscription
}
