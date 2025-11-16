import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Base user table - using UUID for primary key
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  username: varchar("username", { length: 255 }),
  about: text("about"),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  zip: varchar("zip", { length: 255 }),
  country: varchar("country", { length: 255 }),
  role: varchar("role", { length: 50 }), // 'applicant' | 'investor' | 'both'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Consolidated applicant profiles table
export const applicantProfiles = pgTable("applicant_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(), // One profile per user

  // License application fields
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

// Investor profile with relation to users
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

// Subscription management for paywalls
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(), // One subscription per user

  tier: varchar("tier", { length: 50 }).notNull().default("free"), // 'free' | 'basic' | 'pro' | 'enterprise'
  status: varchar("status", { length: 50 }).notNull().default("active"), // 'active' | 'canceled' | 'expired'

  // Stripe integration fields
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),

  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ one, many }) => ({
  applicantProfile: one(applicantProfiles, {
    fields: [users.id],
    references: [applicantProfiles.userId],
  }),
  investorProfile: one(investorProfiles, {
    fields: [users.id],
    references: [investorProfiles.userId],
  }),
  subscription: one(subscriptions, {
    fields: [users.id],
    references: [subscriptions.userId],
  }),
}));

export const applicantProfilesRelations = relations(
  applicantProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [applicantProfiles.userId],
      references: [users.id],
    }),
  })
);

export const investorProfilesRelations = relations(
  investorProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [investorProfiles.userId],
      references: [users.id],
    }),
  })
);

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
