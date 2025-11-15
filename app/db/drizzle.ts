// Database client configuration for Neon + Drizzle ORM
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Validate environment variable at module load time
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

// Create Neon HTTP client (optimized for serverless/Edge Runtime)
const sql = neon(process.env.DATABASE_URL);

// Export database instance with schema for type-safe queries and relations
export const db = drizzle(sql, {
  schema,
  logger: true, // Enable query logging in development
});
