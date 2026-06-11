# Admin Account Setup - WB-FDVA

## Quick Start

To set up your admin account and start using WB-FDVA:

### Option 1: Create Admin Account via Sign-Up (Recommended)

1. Go to http://localhost:3000/sign-up
2. Fill in:
   - **Name**: Administrator
   - **Email**: admin@admin.com
   - **Password**: ADMIN123
3. Click "Create account"
4. You'll be automatically logged in as admin

### Option 2: Already Have Account?

If you already created the admin account:

1. Navigate to http://localhost:3000/sign-in
2. Enter credentials:
   - Email: `admin@admin.com`
   - Password: `ADMIN123`
3. Click "Sign In"
4. You'll be redirected to the Dashboard

## What You Can Do

As the admin user, you have full access to:
- Create and manage buildings
- Add floors, zones, and sensors
- Monitor incidents and alerts
- View all reports and analytics
- Manage responder assignments
- Configure system settings

##Creating Additional Accounts

To create additional user accounts:

1. While logged in as admin, go to http://localhost:3000/sign-up
2. Create a new account with:
   - **Name**: Any name (e.g., "Fire Chief Smith")
   - **Email**: Any valid email
   - **Password**: Any password (8+ characters)
3. The new account will be created as a "Building Manager" by default

## First-Time Setup Workflow

After logging in with admin credentials:

1. **Create a Building**
   - Go to /buildings
   - Click "Add Building"
   - Fill in building details (name, address, type, etc.)

2. **Add Floors**
   - Select your building
   - Click "Add Floor"
   - Specify floor number and area

3. **Add Zones**
   - Go to each floor
   - Click "Add Zone"
   - Define zone boundaries (position and size)
   - Set expected occupancy

4. **Add Sensors**
   - For each zone, add sensors
   - Configure sensor types (heat, smoke, flame detectors)
   - Set sensor locations

5. **Test the System**
   - Go to Dashboard
   - Simulate an incident (if testing feature available)
   - View incident response workflow

## Troubleshooting

**I can't log in with admin@admin.com / ADMIN123**
- Make sure the dev server is running: `pnpm dev`
- Clear browser cache and cookies
- Try signing up for a new account to verify the app works
- Check that you're using the correct email: `admin@admin.com` (not just `ADMIN`)

**I'm getting "Something went wrong" on sign-up**
- This might be a network/database issue
- Try again in a few seconds
- Check that the Neon database is connected (see Settings → Vars)

**I can't create buildings or zones**
- Make sure you're logged in as admin
- Try refreshing the page
- Check browser console for errors (F12 → Console tab)

## Database Information

- **Provider**: Neon PostgreSQL
- **Tables**: user, session, account, verification, building, floor, zone, sensor, incident, incident_report, and more
- **Authentication**: Better Auth with email/password

## Next Steps

1. Log in with admin credentials
2. Create your first building
3. Set up zones and sensors
4. Test the incident response dashboard
5. Create additional user accounts as needed

---

**System Ready**: You can start using WB-FDVA immediately!
