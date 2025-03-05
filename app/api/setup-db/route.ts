import { db } from "@/app/db/drizzle";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Drop the existing table
    await db.execute(sql`DROP TABLE IF EXISTS applicants;`);

    // Create the new table with simplified fields
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

    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

    return NextResponse.json({
      success: true,
      message: "Applicants table updated",
      tables: tables.rows,
    });
  } catch (error: any) {
    console.error("Error updating table:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
