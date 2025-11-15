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

// Base user table - stores core user info synced from Clerk
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
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
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Applicants table - stores dispensary license applications
export const applicants = pgTable("applicants", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.clerkId, { onDelete: "cascade" }),
  profileId: varchar("profile_id", { length: 255 }).notNull(),
  licenseType: varchar("license_type", { length: 255 }).notNull(),
  experience: text("experience").notNull(),
  criminalHistory: text("criminal_history"),
  financialInvestment: text("financial_investment").notNull(),
  securityPlan: text("security_plan").notNull(),
  businessPlan: text("business_plan").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Investor profiles table - stores investor information and preferences
export const investorProfiles = pgTable("investor_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.clerkId, { onDelete: "cascade" }),
  investmentRange: text("investment_range"),
  investmentStyle: text("investment_style"),
  preferredLocations: jsonb("preferred_locations").$type<string[]>(),
  accreditedStatus: boolean("accredited_status"),
  investmentGoals: text("investment_goals"),
  investmentHistory: text("investment_history"),
  riskTolerance: text("risk_tolerance"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Relations - define relationships between tables
export const usersRelations = relations(users, ({ many }) => ({
  applicants: many(applicants),
  investorProfiles: many(investorProfiles),
}));

export const applicantsRelations = relations(applicants, ({ one }) => ({
  user: one(users, {
    fields: [applicants.userId],
    references: [users.clerkId],
  }),
}));

export const investorProfilesRelations = relations(
  investorProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [investorProfiles.userId],
      references: [users.clerkId],
    }),
  })
);

// Type exports for TypeScript - use these in your server actions
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Applicant = typeof applicants.$inferSelect;
export type NewApplicant = typeof applicants.$inferInsert;

export type InvestorProfile = typeof investorProfiles.$inferSelect;
export type NewInvestorProfile = typeof investorProfiles.$inferInsert;
