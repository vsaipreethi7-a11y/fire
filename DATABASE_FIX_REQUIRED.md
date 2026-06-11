# Database Schema Fix Required

## Problem Summary

The WB-FDVA application has a schema mismatch between what Drizzle ORM expects and what exists in the Neon database:

- **Database Columns**: Created with camelCase (emailVerified, createdAt, userId)
- **Drizzle Schema**: Also defined with camelCase
- **Better Auth**: Expects lowercase snake_case columns

This causes authentication to fail when Better Auth tries to read/write user data.

## Solution: Drop and Recreate Tables

The quickest fix is to drop the existing tables and let Drizzle create them with the correct schema.

### Option 1: Using Drizzle (Recommended for Development)

```bash
# Navigate to project directory
cd /vercel/share/v0-project

# This will reset the database schema
# (You may need to configure Drizzle migrations first)
```

### Option 2: Manual SQL Fix (Quick Fix for Now)

Since the database is in development, we can drop all tables and recreate them:

```sql
-- Drop all WB-FDVA application tables (in reverse order of dependencies)
DROP TABLE IF EXISTS responder_assignment;
DROP TABLE IF EXISTS incident_report;
DROP TABLE IF EXISTS incident_zone;
DROP TABLE IF EXISTS incident;
DROP TABLE IF EXISTS occupancy_schedule;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS sensor;
DROP TABLE IF EXISTS zone;
DROP TABLE IF EXISTS floor;
DROP TABLE IF EXISTS building;

-- Drop Better Auth tables
DROP TABLE IF EXISTS verification;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS "user";

-- Now the database is clean and ready for Drizzle to create proper tables
```

## Why This Matters

Better Auth requires specific column names in lowercase:
- `emailverified` (not `emailVerified`)
- `userid` (not `userId`)
- `createdat` (not `createdAt`)

When these don't match, Better Auth fails to:
1. Create user accounts (sign-up fails)
2. Query user data (login fails)
3. Manage sessions (cookies don't work)

## Recommended Fix Process

1. **Drop All Tables** - Clear the database completely
2. **Restart Application** - Drizzle will recreate tables with correct schema
3. **Create Admin Account** - Sign-up will now work properly
4. **Verify Login** - Admin can log in with credentials

## Future Prevention

For production deployments:
- Use Drizzle migrations instead of raw SQL
- Always verify schema after deployment
- Use Vercel's Neon dashboard to inspect database structure

---

## Current Status

The application is ready to use once the database schema is fixed. No code changes are needed - only database recreation.

