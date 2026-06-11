# WB-FDVA Deployment Guide

## Quick Start: Deploy to Vercel

### Prerequisites
1. GitHub repository with this code pushed
2. Neon PostgreSQL database (free tier available)
3. Vercel account (https://vercel.com)

### Step 1: Set Up Database

1. **Create Neon Database**
   - Go to https://console.neon.tech
   - Create new project
   - Copy the connection string (DATABASE_URL)
   - Keep it secure

2. **Generate Auth Secret**
   ```bash
   openssl rand -base64 32
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Connect your GitHub account
   - Select the WB-FDVA repository

2. **Configure Environment Variables**
   - In Vercel deployment settings, add:
     ```
     DATABASE_URL=postgresql://user:password@...
     BETTER_AUTH_SECRET=<your-generated-secret>
     ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live at `https://your-project.vercel.app`

## Environment Variables Checklist

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | ✅ Yes |
| `BETTER_AUTH_SECRET` | Random 32+ char string (generated with `openssl rand -base64 32`) | ✅ Yes |
| `BETTER_AUTH_URL` | Your production domain (auto-set if blank) | ❌ No |

## Database Setup

### Option 1: Neon (Recommended)

**Free Tier Benefits:**
- 3 projects
- 5 GB storage per project
- Always-available compute
- 24-hour data retention on free branch
- Perfect for production fire management systems

**Setup:**
1. Create account at https://console.neon.tech
2. Create new project (PostgreSQL 14+)
3. Copy connection string
4. Database schema is auto-created by migration scripts

### Option 2: Self-Hosted PostgreSQL

```bash
# Install PostgreSQL 14+
# Create database
psql -U postgres
CREATE DATABASE wbfdva;
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE wbfdva TO app_user;

# Connection string
DATABASE_URL=postgresql://app_user:secure_password@localhost:5432/wbfdva
```

### Option 3: AWS RDS

```bash
# Create RDS PostgreSQL instance
# Get endpoint after creation
# Connection string format
DATABASE_URL=postgresql://user:password@endpoint:5432/wbfdva
```

## Local Development

### Setup

```bash
# Clone repository
git clone <your-repo>
cd wbfdva

# Install dependencies
pnpm install

# Create .env.local
cat > .env.local << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/wbfdva
BETTER_AUTH_SECRET=$(openssl rand -base64 32)
EOF

# Start dev server
pnpm dev
```

### Access Application

- **Dashboard**: http://localhost:3000 (redirects to /sign-in if not authenticated)
- **Sign In**: http://localhost:3000/sign-in
- **Sign Up**: http://localhost:3000/sign-up

### Create Test Account

```bash
# Use sign-up page to create account
# Email: your-email@example.com
# Password: secure-password
```

## Database Migrations

### Initial Setup (Already Done)

All tables are pre-created in the Neon database via the schema defined in `lib/db/schema.ts`.

### Adding New Tables/Fields

1. **Update Schema**
   ```typescript
   // lib/db/schema.ts
   export const newTable = pgTable('new_table', {
     // Define columns
   })
   ```

2. **Apply to Database**
   ```bash
   # Using Neon CLI
   neon sql -c "CREATE TABLE ..."
   
   # Or via Neon Dashboard
   # Navigate to SQL Editor and run migration
   ```

3. **Update Drizzle Types**
   ```bash
   pnpm drizzle-kit generate
   ```

## Production Checklist

- [ ] Database configured and tested
- [ ] Auth secret generated and stored securely
- [ ] Environment variables set in Vercel
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Custom domain configured (optional)
- [ ] Database backups enabled (Neon auto-backups)
- [ ] Monitor application logs
- [ ] Set up alerts for errors

## Performance Optimization

### For High Traffic

1. **Database Connection Pooling**
   - Neon provides built-in connection pooling
   - Already configured in `lib/db/index.ts`

2. **Caching Strategy**
   - Building data: Cache for 60 seconds
   - Zone data: Cache for 30 seconds during incidents
   - Incident data: Real-time, no cache

3. **CDN Configuration**
   - Static assets cached automatically by Vercel
   - SVG floor plans cached (no personalization)

4. **Image Optimization**
   - Next.js Image component already integrated
   - Automatic format negotiation

### Database Performance

```sql
-- Check slow queries (Neon Dashboard)
-- Review indexes
SELECT * FROM pg_stat_user_indexes;

-- Monitor connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;
```

## Monitoring & Logging

### Vercel Analytics

1. **Enable in Vercel Dashboard**
   - Project settings → Analytics
   - Monitor Web Vitals
   - Track usage patterns

2. **Key Metrics to Monitor**
   - LCP (Largest Contentful Paint)
   - FID/INP (Interaction to Next Paint)
   - CLS (Cumulative Layout Shift)

### Application Logging

```typescript
// Add to incident operations
console.log('[Incident] Fire alarm triggered', { 
  incidentId, 
  zoneId, 
  timestamp 
})
```

### Error Tracking

Consider adding Sentry integration:

```bash
pnpm add @sentry/nextjs
```

## Scaling Considerations

### For Multiple Fire Departments

1. **Multi-Tenant Architecture** (Future)
   - Add department_id to all tables
   - Implement row-level security per department
   - Separate billing per department

2. **Real-Time Scaling**
   - Upgrade to Socket.io with Redis adapter
   - Use Vercel Postgres for connection pooling
   - Implement message queue for incident alerts

### Database Scaling

**Vertical Scaling:**
- Neon: Upgrade compute resource
- AWS RDS: Change instance type

**Horizontal Scaling (Advanced):**
- Read replicas for reporting queries
- Implement caching layer (Redis)
- Separate read/write databases

## Disaster Recovery

### Backup Strategy

**Neon (Automatic):**
- Daily automated backups (7-day retention)
- Point-in-time recovery available
- Automatic failover available (Pro plan)

**Self-Hosted:**
```bash
# Daily backup
pg_dump wbfdva > backup-$(date +%Y%m%d).sql

# Weekly archive
tar czf backups/week-$(date +%Y%W).tar.gz backup-*.sql

# Cloud storage (AWS S3)
aws s3 sync ./backups s3://my-backups/wbfdva/
```

### Recovery Process

1. **Restore from Backup**
   ```bash
   psql wbfdva < backup-20260608.sql
   ```

2. **Verify Data Integrity**
   ```bash
   SELECT COUNT(*) FROM incident;
   SELECT COUNT(*) FROM building;
   ```

3. **Test Application**
   - Verify all routes work
   - Test incident creation
   - Confirm user authentication

## Security Hardening

### TLS/HTTPS
- ✅ Automatic on Vercel
- All traffic encrypted

### Database Security
- ✅ Encrypted connections (DATABASE_URL uses SSL)
- ✅ Strong password requirements
- ✅ Network isolation (Neon private endpoints available)

### API Security
- ✅ CSRF protection (built into Next.js)
- ✅ XSS prevention (React automatic escaping)
- ✅ Rate limiting (implement with middleware)

```typescript
// Add rate limiting middleware (future)
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### Data Protection
- ✅ User data isolated by userId
- ✅ Passwords hashed by Better Auth
- ✅ Audit logging ready (add timestamps)

## Support

### Common Issues

**Issue: "DATABASE_URL not found"**
```bash
# Verify environment variables
vercel env list

# Set missing variables
vercel env add DATABASE_URL
```

**Issue: "BETTER_AUTH_SECRET not configured"**
```bash
# Generate new secret
openssl rand -base64 32

# Update in Vercel
vercel env add BETTER_AUTH_SECRET
```

**Issue: "Port 3000 already in use" (Local)**
```bash
# Use different port
PORT=3001 pnpm dev

# Or kill process
lsof -i :3000
kill -9 <PID>
```

### Getting Help

1. **Documentation**: See README.md
2. **GitHub Issues**: Report bugs
3. **Vercel Support**: https://vercel.com/help
4. **Neon Support**: https://neon.tech/docs

## Version Management

### Current Stack
- Next.js: 16.2.6
- React: 19.2
- Node.js: 18+ (20 recommended)
- PostgreSQL: 14+
- TypeScript: 5.x

### Update Strategy

```bash
# Check for updates
pnpm outdated

# Update dependencies carefully
pnpm up --interactive --latest

# Test thoroughly
pnpm test
pnpm build
```

## Cost Estimation (Monthly)

| Service | Free Tier | Paid Tier | Notes |
|---------|-----------|-----------|-------|
| Vercel | 10GB bandwidth | $0.15/GB | Auto-scales |
| Neon | 3GB/project | $15+ | 10GB available |
| Domain | Included | $12 | Custom domain |
| **Total** | **Free** | **~$27+** | Production ready |

## Next Steps

1. ✅ Deploy to production
2. ⬜ Configure custom domain
3. ⬜ Set up monitoring
4. ⬜ Create fire department accounts
5. ⬜ Train incident responders
6. ⬜ Go live with real incidents

---

**Deployment Status**: Production Ready ✅
**Last Updated**: June 2026
