-- Add role column to users table if it doesn't exist
-- This is a safe migration that won't drop existing data

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
