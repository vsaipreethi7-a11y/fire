# Admin Setup Complete - WB-FDVA

## Status: Ready to Use

Your WB-FDVA application is fully configured and ready to start using!

## Admin Account

**Email**: admin@admin.com
**Password**: ADMIN123

## How to Login

1. Open http://localhost:3000/sign-in
2. Enter the admin credentials above
3. Click "Sign In"

The admin account has been created directly in the database with full administrative privileges.

## What's Configured

✓ Neon PostgreSQL database connected
✓ Better Auth authentication system enabled
✓ All 13 database tables created (user, building, floor, zone, sensor, incident, etc.)
✓ Admin user account created
✓ Admin password configured with bcrypt hashing
✓ Drizzle ORM schema updated with snake_case columns

## First Time Using the App

### Step 1: Log In
- URL: http://localhost:3000/sign-in
- Email: `admin@admin.com`
- Password: `ADMIN123`

### Step 2: Create Your First Building
- After logging in, go to `/buildings`
- Click "Create Building"
- Fill in:
  - Building name (e.g., "Office Building A")
  - Address
  - City, State, ZIP
  - Building type (office, school, hospital, etc.)
  - Total floors
  - Total occupancy

### Step 3: Add Floors
- Click on your building
- Add floors by specifying floor number and area

### Step 4: Add Zones
- For each floor, add zones
- Zones represent different areas of the building
- Configure zone dimensions (x, y, width, height)
- Set expected occupancy per zone

### Step 5: Add Sensors
- For each zone, add sensors
- Configure sensor types (heat detector, smoke detector, flame detector)
- Set sensor locations

### Step 6: Monitor Dashboard
- Go to `/dashboard`
- View all buildings and their current status
- Zones appear green when safe, change color during incidents

## Creating Additional User Accounts

To create additional accounts (fire chiefs, responders, managers):

1. Log in as admin
2. Go to `/sign-up`
3. Create new account with:
   - Name
   - Email (must be different from other accounts)
   - Password

New accounts will have "Building Manager" role by default.

## Important Notes

- **Admin Role**: Has full access to all buildings and features
- **Building Manager Role**: Can only see assigned buildings
- **Fire Chief Role**: Can see all buildings and incidents
- **Authentication**: Email + password only (no social login, magic links, etc.)
- **Database**: Neon PostgreSQL with automatic backups

## Development

### Run the App
```bash
pnpm dev
```

### Access the Database
- Connection string: Available in environment variables (DATABASE_URL)
- Database tool: Use Neon console or any PostgreSQL client
- Schema location: `/lib/db/schema.ts`

### API Routes
- Authentication: `/api/auth/*`
- Buildings: API endpoints are handled through server actions
- Incidents: Real-time updates via server components

## Troubleshooting

### "Something went wrong" on sign-up/sign-in
1. Make sure dev server is running: `pnpm dev`
2. Check database connection in environment variables
3. Clear browser cache and try again

### Database connection errors
1. Verify DATABASE_URL is set in environment
2. Check Neon dashboard for connection status
3. Ensure project has active Neon database

### Can't create buildings after login
1. Make sure you're logged in as admin
2. Refresh the page
3. Check browser console for errors (F12)

## File Structure

```
/app                  # Next.js app directory
  /api/auth          # Authentication endpoints
  /sign-in           # Sign-in page
  /sign-up           # Sign-up page
  /dashboard         # Main dashboard
  /buildings         # Buildings management
  /layout.tsx        # Root layout

/lib
  /auth.ts          # Better Auth configuration
  /db/schema.ts     # Drizzle ORM schema with snake_case columns

/components           # React components

/public              # Static assets
```

## Database Schema

### Authentication Tables
- `user` - User accounts
- `session` - Active sessions
- `account` - Login credentials (password hashes)
- `verification` - Email verification tokens

### Application Tables
- `building` - Building information
- `floor` - Floors within buildings
- `zone` - Zones/areas within floors
- `sensor` - Fire detection sensors
- `person` - Building occupants
- `occupancy_schedule` - Expected occupancy by time
- `incident` - Fire incidents
- `incident_zone` - Affected zones per incident
- `incident_report` - Detailed incident reports
- `responder_assignment` - Emergency responder assignments

## Next Steps

1. Log in with admin credentials
2. Create your first building
3. Add floors, zones, and sensors
4. Invite other users (create accounts for them)
5. Monitor the dashboard
6. Test incident scenarios

## Support

For detailed guides on specific features, see:
- `GETTING_STARTED.md` - Complete feature walkthrough
- `FAQ.md` - Common questions and answers
- `ARCHITECTURE.md` - Technical documentation
- `DEPLOYMENT.md` - Production deployment guide

---

**System Status**: Ready for Use
**Version**: 1.0 MVP
**Last Updated**: June 2026

