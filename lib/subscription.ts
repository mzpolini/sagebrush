import { unstable_cache } from "next/cache";
import { db } from "@/app/db/drizzle";
import { subscriptions, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise";
export type SubscriptionStatus = "active" | "canceled" | "expired";

const tierLevels: Record<SubscriptionTier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
  enterprise: 3,
};

/**
 * Get user's subscription - cached for 1 minute
 */
export const getSubscription = unstable_cache(
  async (clerkId: string) => {
    // First get the user's UUID from their clerkId
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (!user[0]) {
      // Return default free tier if user not found
      return {
        tier: "free" as SubscriptionTier,
        status: "active" as SubscriptionStatus,
      };
    }

    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user[0].id))
      .limit(1);

    if (!result[0]) {
      // No subscription found, return free tier
      return {
        tier: "free" as SubscriptionTier,
        status: "active" as SubscriptionStatus,
      };
    }

    return {
      ...result[0],
      tier: result[0].tier as SubscriptionTier,
      status: result[0].status as SubscriptionStatus,
    };
  },
  ["user-subscription"],
  {
    revalidate: 60, // Cache for 1 minute
    tags: ["subscription"],
  }
);

/**
 * Get the current user's subscription
 */
export async function getCurrentUserSubscription() {
  const { userId } = await auth();
  if (!userId) {
    return {
      tier: "free" as SubscriptionTier,
      status: "active" as SubscriptionStatus,
    };
  }

  return getSubscription(userId);
}

/**
 * Check if user has access to a specific tier
 */
export async function hasAccess(
  requiredTier: SubscriptionTier
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return requiredTier === "free";

  const subscription = await getSubscription(userId);
  const userLevel = tierLevels[subscription.tier];
  const requiredLevel = tierLevels[requiredTier];

  return userLevel >= requiredLevel;
}

/**
 * Check if user can access a specific tier (with clerkId parameter)
 */
export async function canAccessTier(
  clerkId: string,
  requiredTier: SubscriptionTier
): Promise<boolean> {
  const subscription = await getSubscription(clerkId);
  const userLevel = tierLevels[subscription.tier];
  const requiredLevel = tierLevels[requiredTier];

  return userLevel >= requiredLevel;
}

/**
 * Create or update a user's subscription
 */
export async function upsertSubscription(
  clerkId: string,
  tier: SubscriptionTier,
  status: SubscriptionStatus = "active"
) {
  const { userId: authUserId } = await auth();

  // Security check: only allow users to update their own subscription
  // (or allow admin in future)
  if (clerkId !== authUserId) {
    throw new Error("Unauthorized: Cannot update other user's subscription");
  }

  // Get user's UUID
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (!user[0]) {
    throw new Error("User not found");
  }

  // Check if subscription exists
  const existing = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user[0].id))
    .limit(1);

  if (existing[0]) {
    // Update existing subscription
    await db
      .update(subscriptions)
      .set({
        tier,
        status,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.id, existing[0].id));
  } else {
    // Create new subscription
    await db.insert(subscriptions).values({
      userId: user[0].id,
      tier,
      status,
    });
  }

  // Revalidate cache
  return getSubscription(clerkId);
}

/**
 * Initialize a free subscription for a new user
 */
export async function initializeSubscription(clerkId: string) {
  // Get user's UUID
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (!user[0]) {
    throw new Error("User not found");
  }

  // Check if subscription already exists
  const existing = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user[0].id))
    .limit(1);

  if (existing[0]) {
    return existing[0];
  }

  // Create free tier subscription
  const result = await db
    .insert(subscriptions)
    .values({
      userId: user[0].id,
      tier: "free",
      status: "active",
    })
    .returning();

  return result[0];
}
