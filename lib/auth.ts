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

  advanced: {
    defaultCookieAttributes:
      process.env.NODE_ENV === 'development'
        ? { sameSite: 'none', secure: true }
        : {},
  },
})
