import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL
    ? process.env.BETTER_AUTH_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000',
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || '',
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.V0_RUNTIME_URL || '',
  ].filter(Boolean),
  secret: process.env.BETTER_AUTH_SECRET,
  // Map snake_case database columns to Better Auth's expected column names
  databaseSchema: {
    user: {
      tableName: 'user',
      fields: {
        id: 'id',
        email: 'email',
        emailVerified: 'email_verified',
        name: 'name',
        image: 'image',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
    session: {
      tableName: 'session',
      fields: {
        id: 'id',
        userId: 'user_id',
        expiresAt: 'expires_at',
        token: 'token',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
    account: {
      tableName: 'account',
      fields: {
        id: 'id',
        userId: 'user_id',
        accountId: 'account_id',
        providerId: 'provider_id',
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        idToken: 'id_token',
        accessTokenExpiresAt: 'access_token_expires_at',
        refreshTokenExpiresAt: 'refresh_token_expires_at',
        scope: 'scope',
        password: 'password',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
    verification: {
      tableName: 'verification',
      fields: {
        id: 'id',
        identifier: 'identifier',
        value: 'value',
        expiresAt: 'expires_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  },
  advanced: {
    defaultCookieAttributes:
      process.env.NODE_ENV === 'development'
        ? { sameSite: 'none', secure: true }
        : {},
  },
})
