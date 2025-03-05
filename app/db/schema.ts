import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
  integer,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Base user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// New applicants table
export const applicants = pgTable("applicants", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  profileId: varchar("profile_id", { length: 255 }).notNull(),
  licenseType: varchar("license_type", { length: 255 }).notNull(),
  experience: text("experience").notNull(),
  criminalHistory: text("criminal_history"),
  financialInvestment: text("financial_investment").notNull(),
  securityPlan: text("security_plan").notNull(),
  businessPlan: text("business_plan").notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  applicants: many(applicants),
}));

export const applicantsRelations = relations(applicants, ({ one }) => ({
  user: one(users, {
    fields: [applicants.userId],
    references: [users.clerkId],
  }),
}));

// Applicant profile with relation to users
export const applicantProfiles = pgTable("applicant_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  experience: text("experience"),
  skills: jsonb("skills").$type<string[]>(),
  desiredLocation: text("desired_location"),
  availability: text("availability"),
  licensingStatus: text("licensing_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for applicant profiles
export const applicantProfilesRelations = relations(
  applicantProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [applicantProfiles.userId],
      references: [users.id],
    }),
  })
);

// Investor profile with relation to users
export const investorProfiles = pgTable("investor_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  investmentRange: text("investment_range"),
  investmentStyle: text("investment_style"),
  preferredLocations: jsonb("preferred_locations").$type<string[]>(),
  accreditedStatus: boolean("accredited_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for investor profiles
export const investorProfilesRelations = relations(
  investorProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [investorProfiles.userId],
      references: [users.id],
    }),
  })
);
