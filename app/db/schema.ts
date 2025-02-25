import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Base user table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  username: text("username").unique(),
  about: text("about"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for users
export const usersRelations = relations(users, ({ one }) => ({
  applicantProfile: one(applicantProfiles, {
    fields: [users.id],
    references: [applicantProfiles.userId],
  }),
  investorProfile: one(investorProfiles, {
    fields: [users.id],
    references: [investorProfiles.userId],
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
