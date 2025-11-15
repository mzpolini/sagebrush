import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from .env.local (Next.js convention)
config({ path: ".env.local" });

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // Detailed output during migrations
  strict: true, // Safer schema changes
});
