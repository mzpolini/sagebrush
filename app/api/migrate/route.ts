import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Security: Only allow this in development or with a secret token
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Check for authorization
  if (process.env.NODE_ENV === 'production' && token !== process.env.MIGRATION_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    console.log('Running migration: add_role_column');

    // Migration SQL - adds role column if it doesn't exist
    const migrationSQL = `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'users'
          AND column_name = 'role'
        ) THEN
          ALTER TABLE users ADD COLUMN role VARCHAR(50);
          COMMENT ON COLUMN users.role IS 'User role: applicant, investor, or both';
        END IF;
      END $$;
    `;

    // Execute the migration
    await sql(migrationSQL);

    // Verify the column was added
    const result = await sql`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'role';
    `;

    if (result.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Migration completed successfully',
        column: result[0]
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Migration ran but column not found'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
