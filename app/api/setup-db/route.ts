import { db } from "@/app/db/drizzle";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Drop the existing applicants table
    await db.execute(sql`DROP TABLE IF EXISTS applicants;`);

    // Create the new applicants table with simplified fields
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS applicants (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        profile_id VARCHAR(255) NOT NULL,
        license_type VARCHAR(255) NOT NULL,
        experience TEXT NOT NULL,
        criminal_history TEXT,
        financial_investment TEXT NOT NULL,
        security_plan TEXT NOT NULL,
        business_plan TEXT NOT NULL,
        status VARCHAR(255) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Drop investor_profiles table
    await db.execute(sql`DROP TABLE IF EXISTS investor_profiles;`);

    // Create investor_profiles table with correct field types
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS investor_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        investment_range TEXT,
        investment_style TEXT,
        preferred_locations JSONB,
        accredited_status BOOLEAN,
        investment_goals TEXT,
        investment_history TEXT,
        risk_tolerance TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

    return NextResponse.json({
      success: true,
      message: "Database tables updated",
      tables: tables.rows,
    });
  } catch (error) {
    console.error("Error updating table:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
