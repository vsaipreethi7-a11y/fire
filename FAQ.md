# WB-FDVA Frequently Asked Questions

## ❓ User Accounts & Authentication

### Q: What is the email and password?
**A:** There are **no pre-created accounts**. The system uses self-registration:

1. Navigate to http://localhost:3000/sign-up
2. Create your own account with any email/password:
   - **Email**: Any valid email (e.g., fire-chief@example.com)
   - **Password**: Any password with 8+ characters (e.g., SecurePass123!)
3. Click "Create Account"
4. You're automatically logged in

### Q: Can I use demo credentials?
**A:** Yes! Use these when signing up (create the account):
```
Email: fire-chief@example.com
Password: SecurePass123!

OR

Email: admin@example.com
Password: AdminPassword123!

OR

Email: building-manager@example.com
Password: ManagerPass456!
```

Each email can only be registered **once**. If you try the same email twice, you'll get an error.

### Q: Are there any admin accounts pre-configured?
**A:** **No**, there are no pre-existing accounts in the system. You must:
1. Create your own account via sign-up
2. Optionally modify your role in the database if needed

To set yourself as a Fire Chief in development:
```sql
-- Run this in Neon console
UPDATE "user" SET role = 'fire_chief' WHERE email = 'your-email@example.com';
```

### Q: How do I manage user accounts?
**A:** Currently, the system only supports:
- Users creating their own accounts (self-signup)
- Viewing your own profile

**Future features** (v2):
- Admin panel to manage users
- Invite users to buildings
- Disable user accounts
- Bulk import users

### Q: Can I reset my password?
**A:** Not yet in this version. The workaround:
1. Use a different email address
2. Create new account
3. (In production) Use "Forgot Password" feature (coming v2)

---

## 🏢 How the Application Works

### Q: What does WB-FDVA do?
**A:** WB-FDVA is a **fire disaster management system** that:

1. **Tracks buildings** - Stores building layouts, floors, zones
2. **Monitors sensors** - Receives alerts from smoke/heat detectors
3. **Calculates risk** - Uses IFIVA algorithm to determine priority
4. **Displays live data** - Dashboard shows color-coded zones
5. **Guides response** - Triage table prioritizes evacuation
6. **Documents incidents** - 8-section form for compliance

### Q: How does it work step-by-step?
**A:** Here's the complete workflow:

**Step 1: Setup Phase**
```
Sign Up → Create Building → Add Floors → Add Zones → Add Sensors
```

**Step 2: Normal Operations**
```
Dashboard shows all zones in GREEN (no incidents)
  ↓
All sensors ACTIVE and monitoring
```

**Step 3: Emergency**
```
Fire detected by sensor
  ↓
System creates incident record
  ↓
IFIVA algorithm calculates impact for each zone
  ↓
Dashboard updates:
  - Zone colors change based on risk level
  - Triage table populates
  - Highest risk zones shown first
```

**Step 4: Response**
```
Responders view dashboard
  ↓
See color-coded floor plan
  ↓
Evacuate highest-risk zones first (RED zones)
  ↓
Lower-risk zones next (ORANGE, then YELLOW)
```

**Step 5: Documentation**
```
Navigate to incident page
  ↓
Fill 8-section form (A-H)
  ↓
Generate PDF report
  ↓
Save for insurance/compliance
```

**Step 6: Resolution**
```
All people evacuated
  ↓
Mark incident as resolved
  ↓
Dashboard returns to GREEN
```

### Q: What is the IFIVA algorithm?
**A:** IFIVA = **Incident Force & Vulnerability Impact Assessment**

It calculates the **priority level** for each affected zone during a fire.

**Formula:**
```
Impact Magnitude = (Occupancy × Hazard Level × Distance) / Response Time
```

**Example:**
```
Zone: Conference Room
- Occupancy: 50 people (high occupancy = higher priority)
- Hazard Level: 8 (significant fire with visible flames)
- Distance: 1.5 (moderately far from source)
- Response Time: 3 minutes (close to emergency exit)

Calculation:
Impact = (50 × 8 × 1.5) / 3 = 600 / 3 = 200

Result: Impact = 200 = CRITICAL 🔴
→ Evacuate immediately
```

**Risk Color Scale:**
- 🟢 **Green**: 0-1.0 (No action needed)
- 🟡 **Yellow**: 1.1-5.0 (Monitor, prepare)
- 🟠 **Orange**: 5.1-10.0 (Alert, prepare evacuation)
- 🔴 **Red**: >10.0 (EVACUATE NOW)

### Q: What happens when I create an incident?
**A:** When fire is detected (manually or via sensor):

1. **Incident Created** - System records time, location, sensor that triggered
2. **IFIVA Calculates** - Computes impact for all zones:
   - Zones near fire = higher impact
   - More occupancy = higher priority
   - Longer response time = higher urgency
3. **Dashboard Updates**:
   - Floor plan shows colored zones
   - Red zones = highest priority
   - Triage table sorted by impact
4. **Responders See**:
   - Which zones to evacuate first
   - How many people in each
   - Fastest exit routes
5. **Report Filed** - After response, fill 8-section form

---

## 🎮 Usage Examples

### Example 1: Single Zone Fire

**Scenario:** Fire detected in office breakroom (20 people)

**What happens:**
```
1. Smoke detector triggers
2. System calculates impact = 15 (moderate)
3. Breakroom zone turns ORANGE
4. Dashboard shows occupancy: 20
5. Responders evacuate this zone
6. Fire extinguished
7. Zone returns to GREEN
```

### Example 2: Multi-Floor Fire

**Scenario:** Fire on Floor 2, smoke spreading to Floor 3

**What happens:**
```
1. Detectors trigger on multiple floors
2. System creates zones affected:
   - Zone B (Floor 2): Impact = 85 🔴 RED (primary fire)
   - Zone C (Floor 2): Impact = 42 🟠 ORANGE (spreading)
   - Zone E (Floor 3): Impact = 18 🟡 YELLOW (smoke rising)
   
3. Dashboard shows priority order: B → C → E
4. Responders evacuate Floor 2 first (B then C)
5. Then Floor 3 (E)
6. Incident report filed with all details
```

### Example 3: Hospital with High Occupancy

**Scenario:** Fire detected during shift change (600 people in building)

**What happens:**
```
Building: City Hospital (600 occupants)
  
Fire Location: ICU (Floor 3, 80 people in zone)
Hazard: Major smoke and flames visible
  
IFIVA Calculation:
Impact = (80 × 9 × 2.0) / 2 = 1440 / 2 = 720 ⚠️ EXTREME

Dashboard shows:
- ICU zone: 🔴 RED (Impact 720) - EVACUATE FIRST
- Adjacent zones: 🟠 ORANGE - PREPARE
- Lower floors: 🟡 YELLOW - ALERT

Response:
1. Evacuate ICU immediately (80 people)
2. Evacuate adjacent zones (50 people)
3. Floor evacuation (30 people)
4. Report filed: 8 sections covering 600-person facility
```

---

## 🔐 Roles & Permissions

### Q: What are the different user roles?
**A:** The system has 3 roles:

#### 1. Fire Chief
```
Can:
✅ View ALL buildings
✅ View ALL incidents across buildings
✅ Create incident reports
✅ Assign responders
✅ View analytics
✅ Access dashboard

Cannot:
❌ Edit building configs
❌ Manage user accounts
❌ Access admin panel
```

#### 2. Building Manager
```
Can:
✅ View ASSIGNED buildings only
✅ Manage zones and sensors in assigned buildings
✅ Update occupancy schedules
✅ View incidents in assigned buildings
✅ Create reports
✅ View occupancy calendar

Cannot:
❌ View other buildings
❌ View other incidents
❌ Manage other users
❌ Access admin functions
```

#### 3. Admin (Future)
```
Can:
✅ Everything Fire Chief can do
✅ Everything Building Manager can do
✅ Manage user accounts
✅ System settings
✅ Compliance reports
✅ Audit logs

Cannot:
❌ Manually trigger incidents (not their role)
```

### Q: How do I change my role?
**A:** Currently, you cannot self-assign roles. Options:

**Development (Local):**
```sql
-- Run in Neon console
UPDATE "user" SET role = 'fire_chief' WHERE email = 'your-email@example.com';

-- Valid roles: 'building_manager', 'fire_chief', 'admin'
```

**Production:**
- Contact administrator
- Or wait for admin panel (v2)

### Q: What if I don't see all buildings?
**A:** You're probably a Building Manager. You only see:
- Buildings assigned to you
- Incidents in those buildings
- Zones in those buildings

**To see all buildings:**
- Ask admin to change your role to 'fire_chief'
- Or have admin assign more buildings to you

---

## 📊 Dashboard & Reports

### Q: What does the dashboard show?
**A:** The dashboard (`/dashboard`) displays:

1. **SVG Floor Plan**
   - Visual representation of zones
   - Color-coded by risk level
   - Interactive (clickable zones)

2. **Statistics Panel**
   - Total zones monitored
   - Active incidents count
   - At-risk occupancy number

3. **Incident Triage Table**
   - List of affected zones
   - Sorted by impact magnitude (highest first)
   - Shows: Zone name, occupancy, risk level, sensor

4. **Quick Actions**
   - Create new incident
   - View building details
   - Fill incident report

### Q: What are the 8 report sections?
**A:** When you fill an incident report, you'll fill:

| Section | What to Include |
|---------|-----------------|
| **A: Incident Details** | Date/time, location, how detected, who discovered |
| **B: Building Info** | Building type, year built, floor area, sprinklers |
| **C: Fire Characteristics** | Fire type, size, smoke density, flame height |
| **D: Occupancy Info** | People present, mobility issues, evacuation time |
| **E: Resource Response** | Trucks dispatched, firefighters, response time |
| **F: Actions Taken** | Evacuation completed, alarm activated, sprinklers used |
| **G: Outcome** | Injuries, deaths, property damage, content damage |
| **H: Post-Incident** | Root cause, prevention tips, investigation notes |

### Q: Can I export reports?
**A:** Yes! After filling the 8-section form:
1. Click "Generate PDF"
2. Report downloads to your computer
3. Save for insurance, compliance, records

---

## 🚨 Incident Management

### Q: How do I create an incident (for testing)?
**A:** Manually create incidents via:

1. **Dashboard button** - Click "Create Incident"
2. **API** - Use the incident creation endpoint
3. **Sensor trigger** - Set up real sensors (future)

### Q: Can I trigger a test fire alarm?
**A:** Not in current version, but you can:
1. Create incident manually for testing
2. Dashboard updates as if fire occurred
3. View triage table and impact calculations
4. Fill out report form
5. Test entire workflow

### Q: What if I make a mistake filling the report?
**A:** In current version:
- Edit fields before submitting
- Once submitted, limited editing
- Contact admin to modify (future: admin edit panel)

---

## 🔧 Technical Questions

### Q: Where is the data stored?
**A:** All data stored in **Neon PostgreSQL** cloud database:
- User accounts
- Buildings and zones
- Incidents and reports
- Sensor data
- Occupancy schedules

### Q: Is data encrypted?
**A:** Yes:
- **In transit**: HTTPS/TLS
- **Passwords**: Hashed with bcrypt (Better Auth)
- **Database**: Neon encrypted backups

### Q: How often is data backed up?
**A:** Neon provides:
- Automatic daily backups
- Point-in-time recovery
- Automated failover

### Q: Can I export all my data?
**A:** Currently:
- Export individual incident PDFs
- Access database directly (for admins)

**Future**: Data export functionality

### Q: What's the database schema?
**A:** 13 tables including:
- user, session, account (authentication)
- building, floor, zone (structure)
- sensor (detection devices)
- incident, incident_zone, incident_report (emergencies)
- person, occupancy_schedule (occupants)
- responder_assignment (response coordination)

See `ARCHITECTURE.md` for full schema details.

---

## 🚀 Deployment

### Q: How do I deploy to production?
**A:** Three options:

**Option 1: Vercel (Recommended, 2 min)**
```
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Set 2 environment variables:
   - DATABASE_URL (from Neon)
   - BETTER_AUTH_SECRET (generate with openssl rand -base64 32)
4. Deploy (Vercel auto-deploys on git push)
```

**Option 2: Docker**
```bash
docker build -t wb-fdva .
docker run -e DATABASE_URL=... -e BETTER_AUTH_SECRET=... wb-fdva
```

**Option 3: Self-Hosted**
```bash
npm install
npm run build
npm run start
```

See `DEPLOYMENT.md` for detailed instructions.

### Q: Do I need a database?
**A:** Yes, one is included (Neon PostgreSQL) via the integration.

If you disconnect it, you must:
1. Create your own Postgres database
2. Set DATABASE_URL to point to it
3. Run migrations (included)

---

## ❌ Known Limitations (v1.0)

| Feature | Status |
|---------|--------|
| Email notifications | ❌ Coming v2 |
| SMS alerts | ❌ Coming v2 |
| Mobile app | ❌ Coming v2 |
| Real sensor integration | ❌ Coming v2 |
| Bulk user import | ❌ Coming v2 |
| Admin user panel | ❌ Coming v2 |
| Password reset | ❌ Coming v2 |
| Multi-language | ❌ Coming v2 |
| API (REST/GraphQL) | ❌ Coming v2 |

---

## 🆘 Troubleshooting

### "I can't create an account"
- Check email hasn't been used before
- Verify password is 8+ characters
- Check JavaScript is enabled
- Try incognito mode

### "I forgot my password"
- No password reset yet
- Create new account with different email
- Or contact admin for database reset

### "Dashboard shows no incidents"
- Create an incident first
- Check that building has zones
- Check zones have sensors

### "Zone colors not updating"
- Refresh page (F5)
- Check browser JavaScript enabled
- Check database connection

### "PDF export fails"
- Fill all form fields completely
- Try in Chrome browser
- Check popup blocker isn't blocking

---

## 📞 Support

**For more info:**
- 📖 Read `GETTING_STARTED.md` (complete walkthrough)
- 🏗️ Read `ARCHITECTURE.md` (system design)
- 🚀 Read `DEPLOYMENT.md` (production setup)
- ⚡ Read `QUICK_REFERENCE.md` (quick commands)
- 📋 Read `IMPLEMENTATION_SUMMARY.md` (features list)

**Version:** 1.0 MVP  
**Status:** Production Ready  
**Last Updated:** June 2026
