import { sql } from "drizzle-orm";

export async function up(db) {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS applicants (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      profile_id VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      business_name VARCHAR(255) NOT NULL,
      business_type VARCHAR(255) NOT NULL,
      license_type VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zip_code VARCHAR(255) NOT NULL,
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
}

export async function down(db) {
  await db.execute(sql`DROP TABLE IF EXISTS applicants;`);
}
