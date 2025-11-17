const { neon } = require('@neondatabase/serverless');
const { config } = require('dotenv');
const { readFileSync } = require('fs');
const { join } = require('path');

// Load environment variables
config();

async function runMigration() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Running migration: add_role_column.sql');

    // Read the migration file
    const migrationSQL = readFileSync(
      join(process.cwd(), 'app/db/migrations/add_role_column.sql'),
      'utf-8'
    );

    // Execute the migration
    await sql(migrationSQL);

    console.log('✅ Migration completed successfully!');

    // Verify the column was added
    const result = await sql`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'role';
    `;

    if (result.length > 0) {
      console.log('✅ Verified: role column exists in users table');
      console.log(result[0]);
    } else {
      console.log('⚠️  Warning: role column not found after migration');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
