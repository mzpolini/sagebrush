-- Phase 1: Database Schema Refactor
-- This migration consolidates tables, fixes foreign keys, and adds subscription support

-- Step 1: Create new users table with UUID primary key
CREATE TABLE IF NOT EXISTS users_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  username VARCHAR(255),
  about TEXT,
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(255),
  country VARCHAR(255),
  role VARCHAR(50), -- 'applicant' | 'investor' | 'both'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Step 2: Migrate data from old users table to new users table
INSERT INTO users_new (clerk_id, email, first_name, last_name, username, about, address, city, state, zip, country, created_at, updated_at)
SELECT clerk_id, email, first_name, last_name, username, about, address, city, state, zip, country,
       COALESCE(created_at, CURRENT_TIMESTAMP),
       COALESCE(updated_at, CURRENT_TIMESTAMP)
FROM users
ON CONFLICT (clerk_id) DO NOTHING;

-- Step 3: Drop old tables
DROP TABLE IF EXISTS applicants CASCADE;
DROP TABLE IF EXISTS applicant_profiles CASCADE;
DROP TABLE IF EXISTS investor_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Step 4: Rename new users table
ALTER TABLE users_new RENAME TO users;

-- Step 5: Create consolidated applicant_profiles table
CREATE TABLE IF NOT EXISTS applicant_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  license_type VARCHAR(100),
  experience TEXT,
  criminal_history TEXT,
  financial_investment TEXT,
  security_plan TEXT,
  business_plan TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Step 6: Create investor_profiles table with proper foreign keys
CREATE TABLE IF NOT EXISTS investor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  investment_range VARCHAR(50),
  investment_style VARCHAR(50),
  preferred_locations JSONB,
  accredited_status BOOLEAN,
  investment_goals TEXT,
  investment_history TEXT,
  risk_tolerance VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Step 7: Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL DEFAULT 'free',
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Step 8: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_applicant_profiles_user_id ON applicant_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_user_id ON investor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tier ON subscriptions(tier);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Step 9: Initialize free tier subscriptions for all existing users
INSERT INTO subscriptions (user_id, tier, status)
SELECT id, 'free', 'active'
FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Step 10: Add comments for documentation
COMMENT ON TABLE users IS 'Base user table with UUID primary key';
COMMENT ON TABLE applicant_profiles IS 'Consolidated applicant license applications';
COMMENT ON TABLE investor_profiles IS 'Investor profile information';
COMMENT ON TABLE subscriptions IS 'User subscription tiers for paywall management';
COMMENT ON COLUMN users.role IS 'User role: applicant, investor, or both';
COMMENT ON COLUMN applicant_profiles.status IS 'Application status: draft, pending, approved, rejected';
COMMENT ON COLUMN subscriptions.tier IS 'Subscription tier: free, basic, pro, enterprise';
COMMENT ON COLUMN subscriptions.status IS 'Subscription status: active, canceled, expired';
