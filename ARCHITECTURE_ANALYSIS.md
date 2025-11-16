# NextJS App Router Architecture Analysis

**Date:** 2025-11-16
**Project:** Sagebrush Cannabis Platform
**Reviewer:** Claude Code

---

## Executive Summary

This analysis examines the current NextJS App Router implementation against the stated MVP goals:
1. **Onboarding** of 2 user types (Applicants and Investors) with AI-assisted forms
2. **Market Probability Dashboard** with advanced analytics, paywalls, and data-intensive features

**Overall Assessment:** The current architecture has significant structural problems that will impede both MVP features. Major refactoring is recommended before building out either feature.

---

## Current Architecture Overview

### Technology Stack
- **Framework:** Next.js 15.1.4 (App Router)
- **Auth:** Clerk (@clerk/nextjs)
- **Database:** Neon Postgres with Drizzle ORM
- **UI:** React 19, Tailwind CSS, Headless UI, Heroicons
- **Forms:** React Hook Form with Zod validation

### Current Route Structure
```
app/
├── page.tsx                           # Landing page (Hero component)
├── layout.tsx                         # Root layout with Clerk provider
├── features/
│   ├── page.tsx
│   ├── applicants/page.tsx           # Redirects to /profile
│   └── investors/page.tsx            # Redirects to /profile
└── profile/
    ├── page.tsx                       # Redirects to /profile/[id]/general
    └── [id]/
        ├── layout.tsx                 # Profile navigation
        ├── general/page.tsx           # General user info form
        ├── applicant/page.tsx         # Applicant onboarding form
        ├── investor/page.tsx          # Investor onboarding form
        └── dashboard/page.tsx         # Profile completion dashboard
```

---

## Critical Architectural Problems

### 🚨 PROBLEM 1: Route Structure Misalignment

#### Issues:
1. **Dashboard is NOT the Market Probability Dashboard**
   - Current: `/profile/[id]/dashboard` shows profile completion metrics
   - Expected: A data-intensive market analytics dashboard
   - **Impact:** Complete confusion about the purpose of the dashboard

2. **User ID Exposure in URLs**
   - Routes use `/profile/[id]` where `[id]` is the Clerk userId
   - **Security Risk:** Exposing internal user identifiers
   - **UX Problem:** URLs are not user-friendly
   - Location: `app/layout.tsx:37-38`, `app/profile/page.tsx:9`

3. **Profile vs Onboarding Conflation**
   - Applicant/Investor forms are profile pages, not onboarding flows
   - No dedicated onboarding route structure
   - All forms accessible from any profile page

4. **Unused `/features` Routes**
   - Routes exist but only redirect to `/profile`
   - Unclear purpose and wasted routes
   - Location: `app/features/applicants/page.tsx`, `app/features/investors/page.tsx`

#### Recommended Structure:
```
app/
├── (marketing)/
│   ├── page.tsx                       # Public landing page
│   └── features/page.tsx              # Features showcase
│
├── (auth)/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
│
├── (onboarding)/
│   ├── layout.tsx                     # Onboarding-specific layout
│   ├── role-selection/page.tsx        # Choose: Applicant vs Investor
│   ├── applicant/
│   │   ├── [step]/page.tsx            # Multi-step wizard
│   │   └── complete/page.tsx
│   └── investor/
│       ├── [step]/page.tsx
│       └── complete/page.tsx
│
├── (app)/
│   ├── layout.tsx                     # Authenticated app layout
│   ├── dashboard/                     # MARKET PROBABILITY DASHBOARD
│   │   ├── page.tsx
│   │   ├── loading.tsx                # Streaming UI
│   │   ├── error.tsx                  # Error boundary
│   │   ├── @charts/page.tsx           # Parallel route for charts
│   │   ├── @analytics/page.tsx        # Parallel route for analytics
│   │   └── components/
│   │       ├── paywall-guard.tsx
│   │       └── subscription-tier-lock.tsx
│   │
│   ├── profile/
│   │   ├── page.tsx                   # User's own profile
│   │   └── settings/page.tsx
│   │
│   └── subscription/
│       ├── page.tsx
│       └── upgrade/page.tsx
│
└── api/
    ├── webhooks/
    │   ├── clerk/route.ts
    │   └── stripe/route.ts
    └── trpc/[trpc]/route.ts           # For AI-assisted form APIs
```

**Benefits:**
- Route groups `(marketing)`, `(auth)`, `(onboarding)`, `(app)` organize without affecting URLs
- Parallel routes `@charts`, `@analytics` enable streaming different sections independently
- Clear separation of concerns
- No user IDs in URLs
- Dedicated onboarding flow separate from profile management

---

### 🚨 PROBLEM 2: Data Model Inconsistencies

#### Issues:

1. **Duplicate Applicant Tables**
   ```typescript
   // In schema.ts - TWO different applicant tables!

   export const applicants = pgTable("applicants", {
     id: serial("id").primaryKey(),
     userId: varchar("user_id", { length: 255 }).notNull(),
     // ... fields for license application
   });

   export const applicantProfiles = pgTable("applicant_profiles", {
     id: uuid("id").primaryKey().defaultRandom(),
     userId: uuid("user_id").references(() => users.id),
     // ... different fields
   });
   ```
   - Location: `app/db/schema.ts:32-83`
   - **Impact:** Confusion about which table to use, potential data fragmentation

2. **Inconsistent Foreign Key Strategy**
   ```typescript
   // applicants table
   userId: varchar("user_id", { length: 255 }).notNull(),
   // References: users.clerkId (varchar)

   // applicantProfiles table
   userId: uuid("user_id").references(() => users.id)
   // References: users.id (serial)

   // investorProfiles table
   userId: varchar("user_id", { length: 255 }).notNull(),
   // References: users.clerkId (varchar) - no FK constraint!
   ```
   - Location: `app/db/schema.ts:34, 62, 88`
   - **Impact:** Broken referential integrity, orphaned records

3. **Mixed Column Naming Conventions**
   - Database uses snake_case: `created_at`, `user_id`
   - Drizzle schema uses camelCase: `createdAt`, `userId`
   - **Impact:** Potential for mapping errors

#### Recommendations:

```typescript
// Recommended unified schema

// Base user table - use clerkId as the source of truth
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }), // 'applicant' | 'investor' | 'both'
  // ... other fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Single applicant profile table
export const applicantProfiles = pgTable("applicant_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(), // One profile per user

  // Application fields
  licenseType: varchar("license_type", { length: 100 }),
  experience: text("experience"),
  criminalHistory: text("criminal_history"),
  financialInvestment: text("financial_investment"),
  securityPlan: text("security_plan"),
  businessPlan: text("business_plan"),

  // Application status
  status: varchar("status", { length: 50 }).default("draft").notNull(),
  submittedAt: timestamp("submitted_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Single investor profile table
export const investorProfiles = pgTable("investor_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(), // One profile per user

  investmentRange: varchar("investment_range", { length: 50 }),
  investmentStyle: varchar("investment_style", { length: 50 }),
  preferredLocations: jsonb("preferred_locations").$type<string[]>(),
  accreditedStatus: boolean("accredited_status"),
  investmentGoals: text("investment_goals"),
  investmentHistory: text("investment_history"),
  riskTolerance: varchar("risk_tolerance", { length: 50 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// NEW: Subscription management for paywall
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  tier: varchar("tier", { length: 50 }).notNull(), // 'free' | 'basic' | 'pro' | 'enterprise'
  status: varchar("status", { length: 50 }).notNull(), // 'active' | 'canceled' | 'expired'

  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),

  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 🚨 PROBLEM 3: Dashboard Architecture for Large Data

The current dashboard (`app/profile/[id]/dashboard/page.tsx`) is a simple profile completion tracker. For a data-intensive **Market Probability Dashboard**, this approach will fail.

#### Current Dashboard Problems:

1. **No Streaming or Suspense**
   ```tsx
   // Current: All data fetched at once in a single async component
   export default async function Dashboard({ params }: { params: { id: string }}) {
     const user = await getUserProfile(id);              // Wait
     const investorProfile = await getInvestorProfile(id);  // Wait
     const applicantProfile = await getApplicantProfile(id); // Wait

     // All data must load before ANY UI renders
   }
   ```
   - Location: `app/profile/[id]/dashboard/page.tsx:9-21`
   - **Problem:** Waterfall loading, slow TTFB for large datasets

2. **No Loading States**
   - Missing `loading.tsx` file
   - User sees blank screen during data fetch
   - Location: `app/profile/[id]/dashboard/` (file doesn't exist)

3. **No Error Boundaries**
   - Missing `error.tsx` file
   - Any data fetch error crashes the entire page
   - Location: `app/profile/[id]/dashboard/` (file doesn't exist)

4. **Client-Side Rendering for Charts**
   - No charting library installed
   - For large datasets, need:
     - Server-side data aggregation
     - Client-side virtualization
     - Progressive data loading

5. **No Caching Strategy**
   - Every page load refetches all data
   - No use of Next.js caching APIs:
     - `unstable_cache` for function-level caching
     - `revalidatePath` / `revalidateTag` for cache invalidation
   - Location: `app/actions/user.ts:68-142`

#### Recommended Dashboard Architecture:

```tsx
// app/(app)/dashboard/page.tsx
import { Suspense } from 'react';
import { MarketOverview } from './components/market-overview';
import { AnalyticsCharts } from './components/analytics-charts';
import { RecommendationEngine } from './components/recommendation-engine';
import { PaywallGuard } from '@/components/paywall-guard';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function DashboardPage() {
  return (
    <div className="dashboard-grid">
      {/* Market Overview - loads first, critical data */}
      <Suspense fallback={<MarketOverviewSkeleton />}>
        <MarketOverview />
      </Suspense>

      {/* Analytics Charts - loads independently */}
      <PaywallGuard tier="pro">
        <Suspense fallback={<ChartsLoadingSkeleton />}>
          <AnalyticsCharts />
        </Suspense>
      </PaywallGuard>

      {/* AI Recommendations - can load slowly */}
      <PaywallGuard tier="enterprise">
        <Suspense fallback={<RecommendationSkeleton />}>
          <RecommendationEngine />
        </Suspense>
      </PaywallGuard>
    </div>
  );
}
```

```tsx
// app/(app)/dashboard/components/analytics-charts.tsx
import { unstable_cache } from 'next/cache';
import { db } from '@/app/db/drizzle';

// Cache the heavy aggregation query
const getMarketAnalytics = unstable_cache(
  async (userId: string) => {
    // Heavy database aggregation
    return await db.execute(sql`
      WITH market_trends AS (...)
      SELECT ...
    `);
  },
  ['market-analytics'],
  {
    revalidate: 300, // 5 minutes
    tags: ['analytics', 'market-data']
  }
);

export async function AnalyticsCharts() {
  const { userId } = await auth();
  const data = await getMarketAnalytics(userId);

  return <ClientChartComponent data={data} />;
}
```

**Key Improvements:**
- **Streaming:** Each section loads independently
- **Caching:** Heavy queries cached with `unstable_cache`
- **Incremental Loading:** Users see content progressively
- **Error Isolation:** Error in one section doesn't break others
- **Subscription Gates:** Premium features behind paywalls

---

### 🚨 PROBLEM 4: Onboarding Flow - Missing AI Assistance

MVP Goal: "AI assistance to ensure fields are sufficient"

#### Current Implementation:
- Location: `app/profile/[id]/applicant/form.tsx`, `app/profile/[id]/investor/form.tsx`
- Simple text areas with basic Zod validation
- No AI assistance whatsoever
- No intelligent field suggestions
- No progressive disclosure
- No multi-step wizard

#### Current Form Example:
```tsx
// Just a basic textarea - no AI help!
<textarea
  {...form.register("businessPlan")}
  rows={4}
  placeholder="Describe your business plan"
/>
```

#### Recommended AI-Assisted Onboarding:

1. **Multi-Step Wizard with AI Guidance**
```tsx
// app/(onboarding)/applicant/[step]/page.tsx
import { AIFormAssistant } from '@/components/ai-form-assistant';

const steps = [
  'license-type',
  'experience',
  'business-plan',
  'financial-plan',
  'security-plan',
  'review'
];

export default async function ApplicantOnboardingStep({
  params
}: {
  params: { step: string }
}) {
  const currentStepIndex = steps.indexOf(params.step);

  return (
    <OnboardingLayout
      currentStep={currentStepIndex}
      totalSteps={steps.length}
    >
      <AIFormAssistant step={params.step}>
        {params.step === 'business-plan' && <BusinessPlanStep />}
        {params.step === 'financial-plan' && <FinancialPlanStep />}
        {/* ... other steps */}
      </AIFormAssistant>
    </OnboardingLayout>
  );
}
```

2. **AI-Powered Field Assistance Component**
```tsx
// components/ai-form-assistant.tsx
'use client';

import { useState } from 'react';
import { streamText } from 'ai'; // Vercel AI SDK

export function AIFieldAssistant({
  field,
  context
}: {
  field: string;
  context: Record<string, any>;
}) {
  const [suggestion, setSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function generateSuggestion() {
    setIsGenerating(true);

    const result = await streamText({
      model: openai('gpt-4'),
      messages: [
        {
          role: 'system',
          content: `You are helping a cannabis license applicant complete their ${field} section.
                   Based on their previous answers, suggest what they should include.
                   Be specific and industry-relevant.`
        },
        {
          role: 'user',
          content: `Context: ${JSON.stringify(context)}\n\nHelp me write my ${field}.`
        }
      ],
    });

    for await (const textPart of result.textStream) {
      setSuggestion(prev => prev + textPart);
    }

    setIsGenerating(false);
  }

  return (
    <div className="ai-assistant">
      <button onClick={generateSuggestion} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : '✨ Get AI Suggestion'}
      </button>
      {suggestion && (
        <div className="suggestion-box">
          <p>{suggestion}</p>
          <button onClick={() => {/* Copy to field */}}>
            Use This Suggestion
          </button>
        </div>
      )}
    </div>
  );
}
```

3. **Field Completeness Validation**
```tsx
// lib/ai-validation.ts
export async function validateFieldCompleteness(
  field: string,
  value: string,
  context: Record<string, any>
): Promise<{
  isComplete: boolean;
  suggestions: string[];
  score: number; // 0-100
}> {
  const result = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Evaluate if this ${field} is complete and sufficient for a cannabis license application.
                 Provide a score (0-100) and specific suggestions for improvement.`
      },
      {
        role: 'user',
        content: `Field: ${field}\nValue: ${value}\nContext: ${JSON.stringify(context)}`
      }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(result.choices[0].message.content);
}
```

**Dependencies Needed:**
```bash
npm install ai @ai-sdk/openai
```

---

### 🚨 PROBLEM 5: Missing Subscription/Paywall Infrastructure

MVP Goal: "Paywalls based on subscription types for certain components"

#### Current State:
- No subscription management
- No paywall components
- No middleware to check subscription status
- No integration with payment provider

#### Recommended Architecture:

1. **Subscription Middleware**
```tsx
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/features"],

  async afterAuth(auth, req: NextRequest) {
    // For dashboard routes, check subscription
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!auth.userId) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }

      // Check subscription tier (cached)
      const subscription = await getSubscription(auth.userId);

      // Store in headers for components to access
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-subscription-tier', subscription.tier);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  },
});
```

2. **Paywall Guard Component**
```tsx
// components/paywall-guard.tsx
import { auth } from '@clerk/nextjs/server';
import { getSubscription } from '@/lib/subscription';
import { UpgradePrompt } from './upgrade-prompt';

type Tier = 'free' | 'basic' | 'pro' | 'enterprise';

const tierLevels: Record<Tier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
  enterprise: 3,
};

export async function PaywallGuard({
  tier,
  children,
  fallback,
}: {
  tier: Tier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const subscription = await getSubscription(userId);
  const userLevel = tierLevels[subscription.tier];
  const requiredLevel = tierLevels[tier];

  if (userLevel >= requiredLevel) {
    return <>{children}</>;
  }

  return fallback || <UpgradePrompt requiredTier={tier} />;
}
```

3. **Server Action for Subscription Check**
```tsx
// lib/subscription.ts
import { unstable_cache } from 'next/cache';
import { db } from '@/app/db/drizzle';
import { subscriptions } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export const getSubscription = unstable_cache(
  async (userId: string) => {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    return result[0] || { tier: 'free', status: 'active' };
  },
  ['user-subscription'],
  {
    revalidate: 60, // Cache for 1 minute
    tags: ['subscription']
  }
);

export async function hasAccess(userId: string, requiredTier: string): Promise<boolean> {
  const subscription = await getSubscription(userId);
  const tierLevels = { free: 0, basic: 1, pro: 2, enterprise: 3 };
  return tierLevels[subscription.tier] >= tierLevels[requiredTier];
}
```

4. **Dashboard with Tiered Components**
```tsx
// app/(app)/dashboard/page.tsx
import { PaywallGuard } from '@/components/paywall-guard';

export default function Dashboard() {
  return (
    <div>
      {/* Free tier - everyone sees this */}
      <MarketOverviewBasic />

      {/* Basic tier */}
      <PaywallGuard tier="basic">
        <HistoricalDataCharts />
      </PaywallGuard>

      {/* Pro tier */}
      <PaywallGuard tier="pro">
        <AdvancedAnalytics />
        <PredictiveModeling />
      </PaywallGuard>

      {/* Enterprise tier */}
      <PaywallGuard tier="enterprise">
        <AIRecommendations />
        <CustomReports />
        <APIAccess />
      </PaywallGuard>
    </div>
  );
}
```

---

### 🚨 PROBLEM 6: Security Issues

1. **Exposed User IDs in URLs**
   - Current: `/profile/[id]` where `id` is the Clerk userId
   - **Risk:** Enumeration attacks, privacy concerns
   - **Fix:** Use slugs or remove from URL entirely

2. **No Authorization Checks**
   ```tsx
   // app/actions/user.ts:68
   export async function getUserProfile(userId: string) {
     // Anyone can request any userId!
     const user = await db
       .select()
       .from(users)
       .where(eq(users.clerkId, userId));
   }
   ```
   - **Risk:** Users can view other users' profiles
   - **Fix:** Always verify `auth().userId === requestedUserId`

3. **No Rate Limiting**
   - Server actions have no rate limiting
   - Form submissions not protected
   - **Fix:** Add rate limiting middleware

4. **Missing CSRF Protection**
   - Forms don't include CSRF tokens
   - **Fix:** Next.js App Router handles this, but verify in production

#### Recommended Security Fixes:

```tsx
// app/actions/user.ts
export async function getUserProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Only allow users to fetch their own profile
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  return user[0] || null;
}

export async function updateUserProfile(data: UserProfileUpdate) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify ownership before update
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!existing[0]) throw new Error("User not found");

  // Update only the authenticated user's profile
  await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.clerkId, userId));

  revalidatePath('/profile');
}
```

---

## Performance Optimization Recommendations

### 1. Database Query Optimization

**Current Issues:**
- Multiple sequential queries in dashboard (waterfall)
- No query caching
- Missing database indexes

**Recommendations:**
```tsx
// Use Promise.all for parallel queries
export async function getDashboardData(userId: string) {
  const [user, applicant, investor] = await Promise.all([
    getUserProfile(userId),
    getApplicantProfile(userId),
    getInvestorProfile(userId),
  ]);

  return { user, applicant, investor };
}

// Add caching
import { unstable_cache } from 'next/cache';

export const getCachedDashboardData = unstable_cache(
  getDashboardData,
  ['dashboard-data'],
  { revalidate: 60 }
);
```

**Database Indexes:**
```sql
-- Add indexes for frequent queries
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_applicants_user_id ON applicants(user_id);
CREATE INDEX idx_investor_profiles_user_id ON investor_profiles(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

### 2. Advanced Charting Setup

For the Market Probability Dashboard with "tremendous amount of data":

**Recommended Libraries:**
```bash
npm install recharts @tanstack/react-virtual
# Or
npm install visx d3 @visx/responsive
```

**Client-Side Virtualization:**
```tsx
// components/data-table-virtualized.tsx
'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedDataTable({
  data
}: {
  data: Array<Record<string, any>>
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <DataRow data={data[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Streaming Data with Server Components

```tsx
// app/(app)/dashboard/components/market-data-stream.tsx
import { Suspense } from 'react';

async function MarketDataHeavy() {
  // Simulate heavy data fetch - 3 seconds
  const data = await fetchMarketData();
  return <ChartComponent data={data} />;
}

export function MarketDataSection() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded" />
        </div>
      }
    >
      <MarketDataHeavy />
    </Suspense>
  );
}
```

---

## File Structure Recommendations

### Missing Critical Files

These files should be added to leverage Next.js App Router features:

```
app/
├── (app)/
│   ├── dashboard/
│   │   ├── loading.tsx          # ❌ MISSING - Add loading UI
│   │   ├── error.tsx            # ❌ MISSING - Add error boundary
│   │   └── not-found.tsx        # ❌ MISSING - Add 404 handler
│   │
│   ├── layout.tsx               # Add authenticated app layout
│   └── template.tsx             # For animations between routes
│
├── (onboarding)/
│   ├── layout.tsx               # ❌ MISSING - Onboarding layout
│   └── applicant/
│       ├── [step]/
│       │   ├── page.tsx         # ❌ MISSING - Dynamic step pages
│       │   └── loading.tsx      # ❌ MISSING - Step loading states
│       └── loading.tsx
│
└── middleware.ts                # ❌ MISSING - Auth + subscription checks
```

**Create these files:**

```tsx
// app/(app)/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>
  );
}
```

```tsx
// app/(app)/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
```

---

## Migration Plan

### Phase 1: Foundation (Week 1)
1. ✅ Fix database schema (consolidate tables, add proper FKs)
2. ✅ Add subscription tables
3. ✅ Restructure routes using route groups
4. ✅ Add middleware for auth + subscription checks
5. ✅ Create `loading.tsx` and `error.tsx` files

### Phase 2: Onboarding (Week 2)
1. ✅ Build multi-step onboarding wizard
2. ✅ Integrate AI assistance (Vercel AI SDK)
3. ✅ Add field validation with AI
4. ✅ Create onboarding completion flow

### Phase 3: Dashboard Foundation (Week 3)
1. ✅ Build new Market Probability Dashboard shell
2. ✅ Implement streaming with Suspense
3. ✅ Add caching layer
4. ✅ Create paywall guard components
5. ✅ Set up basic charts (recharts/visx)

### Phase 4: Dashboard Features (Week 4)
1. ✅ Build subscription tiers
2. ✅ Implement data virtualization for large datasets
3. ✅ Add advanced analytics components
4. ✅ Create professional charting UX
5. ✅ Performance testing and optimization

---

## Key Metrics to Track

After implementing these changes, monitor:

1. **Performance Metrics:**
   - Time to First Byte (TTFB): Target < 600ms
   - First Contentful Paint (FCP): Target < 1.8s
   - Largest Contentful Paint (LCP): Target < 2.5s
   - Time to Interactive (TTI): Target < 3.8s

2. **Dashboard Metrics:**
   - Data fetch time for charts
   - Number of concurrent Suspense boundaries
   - Cache hit rate
   - Database query performance

3. **Onboarding Metrics:**
   - Completion rate by step
   - AI assistance usage rate
   - Form field completeness scores
   - Time to complete onboarding

---

## Next Steps

### Immediate Actions (Before Building Features):

1. **Database Migration**
   ```bash
   # Create new migration
   npm run db:push

   # Or use Drizzle migrations
   npx drizzle-kit generate:pg
   npx drizzle-kit push:pg
   ```

2. **Route Restructure**
   - Create route groups: `(marketing)`, `(auth)`, `(onboarding)`, `(app)`
   - Move existing pages to new structure
   - Update all internal links

3. **Add Missing Files**
   - Create `middleware.ts`
   - Add `loading.tsx` to all route segments
   - Add `error.tsx` to all route segments

4. **Security Hardening**
   - Add authorization checks to all server actions
   - Remove user IDs from URLs
   - Implement rate limiting

### After Foundation is Solid:

5. **Build Onboarding Flow**
   - Multi-step wizard
   - AI integration
   - Field validation

6. **Build Market Dashboard**
   - Streaming architecture
   - Charting library integration
   - Subscription gates

---

## Conclusion

The current architecture has good foundations (Next.js 15, Clerk, Drizzle) but significant structural problems that will block MVP features:

**Critical Issues:**
1. ❌ Route structure doesn't match MVP goals
2. ❌ Dashboard is not the Market Probability Dashboard
3. ❌ No AI assistance in onboarding
4. ❌ No subscription/paywall infrastructure
5. ❌ Data model inconsistencies
6. ❌ Missing Next.js App Router best practices
7. ❌ Security vulnerabilities

**Recommendation:** **Refactor first, then build features.** Attempting to build the MVP features on the current architecture will result in technical debt and poor performance.

**Estimated Effort:**
- Foundation refactor: 1-2 weeks
- MVP Feature 1 (Onboarding): 1-2 weeks
- MVP Feature 2 (Dashboard): 2-3 weeks

**Total: 4-7 weeks** for a solid MVP with proper architecture.

---

## Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Streaming and Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Drizzle ORM Best Practices](https://orm.drizzle.team/docs/overview)
