# WB-FDVA Getting Started Guide

## Admin Credentials

### One Admin Account Pre-Exists
The system comes with a single **admin account** pre-configured for immediate use.

**Admin Login Credentials:**
```
Email: admin@admin.com
Password: ADMIN123
```

## Step-by-Step Application Walkthrough

### 1. Account Login (First-Time Setup)

**Flow:**
```
Home (/) 
  ↓
Redirect to Sign-In Page (/sign-in)
  ↓
Enter admin credentials
  ↓
Dashboard Page (/dashboard)
```

**To Login with Admin Account:**
1. Navigate to http://localhost:3000
2. You'll be redirected to `/sign-in`
3. Enter credentials:
   - **Email**: admin@admin.com
   - **Password**: ADMIN123
4. Click "Sign In"
5. You're logged in and redirected to `/dashboard`

**To Create Additional Accounts:**
1. From sign-in page, click "Create account" link
2. Fill in:
   - **Name**: Your full name (e.g., "Chief John Smith")
   - **Email**: Your email (e.g., fire-chief@example.com)
   - **Password**: Strong password (min 8 characters)
3. Click "Create Account"
4. You're automatically logged in and redirected to `/dashboard`

### 2. Dashboard Overview

**Main Dashboard (`/dashboard`)**

The dashboard displays:
- **Floor Plan (SVG Visual)**
  - Interactive diagram of building zones
  - Color-coded zones based on fire risk:
    - 🟢 Green: No incident (0-1.0 impact)
    - 🟡 Yellow: Mild risk (1.1-5.0 impact)
    - 🟠 Orange: High risk (5.1-10.0 impact)
    - 🔴 Red: Critical (>10.0 impact)

- **Statistics Panel**
  - Total Zones Monitored
  - Active Incidents
  - At-Risk Occupancy

- **Triage Table**
  - Lists all affected zones during incidents
  - Sorted by **Impact Magnitude** (highest risk first)
  - Shows:
    - Zone Name
    - Current Occupancy
    - Impact Magnitude Score
    - Risk Level Color
    - Sensor That Triggered

### 3. Building Management

**Manage Buildings (`/buildings`)**

**Create a New Building:**
1. Click "Add Building" button
2. Fill in building details:
   - **Name**: Building name (e.g., "Downtown Office Complex")
   - **Address**: Street address
   - **City/State/ZIP**: Location
   - **Type**: Select type (Office, Hospital, School, Warehouse, etc.)
   - **Total Floors**: Number of floors
   - **Total Occupancy**: Max number of people

3. Click "Create Building"

**Building Hierarchy:**
```
Building (e.g., "Downtown Office")
  ├── Floor 1 (Ground Floor)
  │   ├── Zone A (Reception)
  │   ├── Zone B (Main Office)
  │   └── Zone C (Server Room)
  ├── Floor 2 (Second Floor)
  │   ├── Zone D (Executive)
  │   ├── Zone E (Conference)
  │   └── Zone F (Kitchen)
  └── Floor 3 (Third Floor)
      ├── Zone G (Dev Team)
      └── Zone H (Storage)
```

### 4. Zone & Sensor Management

**What are Zones?**
- Physical areas within a building floor
- Represented as rectangles on the SVG floor plan
- Each zone has:
  - Occupancy count
  - Sensor devices (smoke, heat, motion, door)
  - Coordinates and dimensions

**What are Sensors?**
- Fire detection devices in each zone
- **Types:**
  - 💨 **Smoke Detector**: Detects smoke
  - 🔥 **Heat Detector**: Detects temperature
  - 👁️ **Motion Detector**: Detects movement
  - 🚪 **Door Sensor**: Monitors exits

**Example Setup:**
```
Building: Hospital
├── Floor 1: Emergency Room
│   ├── Zone A: Waiting Area (Occupancy: 20)
│   │   └── Smoke Detector (active)
│   ├── Zone B: Treatment (Occupancy: 10)
│   │   ├── Smoke Detector (active)
│   │   └── Heat Detector (active)
│   └── Zone C: Storage (Occupancy: 2)
│       └── Smoke Detector (active)
└── Floor 2: Patient Rooms
    ├── Zone D: Rooms 200-205 (Occupancy: 30)
    │   ├── Smoke Detectors (active)
    │   └── Motion Detectors (active)
    └── Zone E: Hallway (Occupancy: 5)
        └── Door Sensor (active)
```

### 5. Understanding the IFIVA Algorithm

**Impact Force & Vulnerability Impact Vulnerability Assessment**

This is the **core fire risk calculation** that powers the system.

**Formula:**
```
Impact Magnitude = (Occupancy × Hazard Level × Distance Factor) / Response Time

Where:
- Occupancy = Number of people in affected zone
- Hazard Level = 1 to 10 (1=smoke detected, 10=major fire)
- Distance Factor = How close to escalation (0.5-2.0)
- Response Time = Estimated minutes to reach zone (1-20)
```

**Example Calculation:**
```
Zone A: Conference Room
- Occupancy: 50 people (high)
- Hazard Level: 7 (significant smoke, visible flames starting)
- Distance Factor: 1.5 (moderate distance to fire)
- Response Time: 3 minutes (ground floor, quick access)

Impact = (50 × 7 × 1.5) / 3 = 175 / 3 = 58.3

Result: 🔴 CRITICAL (>10.0) → Immediate evacuation required
```

**Real-World Scenario:**
```
Building: Office Complex (200 people total)

Incident: Fire detected on Floor 2, Conference Room

Affected Zones (sorted by impact):
1. Zone B (Conference) - Impact: 58.3 🔴 (50 people, major fire)
2. Zone C (Hallway) - Impact: 24.1 🟠 (25 people, smoke spreading)
3. Zone A (Adjacent Office) - Impact: 12.7 🟠 (20 people, slight smoke)
4. Zone D (Below) - Impact: 3.2 🟡 (15 people, minor smoke)

Dashboard shows:
- Red floor plan highlighting active zones
- Triage table with priority order
- Responders assigned to Zone B first
- Live occupancy tracking
```

### 6. Incident Response Workflow

**When a Fire Alarm Triggers:**

1. **Detection (Automatic)**
   - Sensor detects fire
   - Creates incident record
   - Calculates impact for all zones

2. **Dashboard Update (Real-time)**
   - Floor plan colors change
   - Triage table populates
   - Zones sort by risk

3. **View Incident Details**
   - Click on incident in dashboard
   - See all affected zones
   - View zone-by-zone impact

4. **Fill Incident Report**
   - Navigate to incident page
   - Fill 8-section form:
     - **Section A**: Incident Details (when, where, how detected)
     - **Section B**: Building Information (type, year, sprinklers)
     - **Section C**: Fire Characteristics (size, smoke, flames)
     - **Section D**: Occupancy Information (people present, disabilities)
     - **Section E**: Resource Response (trucks, firefighters, response time)
     - **Section F**: Actions Taken (evacuation, sprinklers, ventilation)
     - **Section G**: Outcome (injuries, deaths, property damage)
     - **Section H**: Post-Incident (root cause, prevention)

5. **Export Report**
   - Click "Generate PDF"
   - Save for records/insurance

### 7. User Roles & Permissions

**Role-Based Access Control:**

#### Fire Chief
```
Can:
✅ View all buildings
✅ View all incidents
✅ Create incident reports
✅ Assign responders
✅ View triage tables
✅ Access analytics

Cannot:
❌ Modify building configuration
❌ Manage user accounts
❌ Change system settings
```

#### Building Manager
```
Can:
✅ View their assigned buildings
✅ Manage zones and sensors
✅ Update occupancy schedules
✅ View incidents in their buildings
✅ Create reports
✅ View occupancy calendar

Cannot:
❌ View other buildings
❌ Manage other users
❌ Access admin functions
```

#### Admin (Future)
```
Can:
✅ All Fire Chief permissions
✅ All Building Manager permissions
✅ Manage user accounts
✅ Modify system settings
✅ View analytics
✅ Generate system reports
```

**How to Set Roles:**
- Currently, all new users get `building_manager` role by default
- To create a Fire Chief, contact admin (or modify database directly in development)
- Database command:
  ```sql
  UPDATE "user" SET role = 'fire_chief' WHERE email = 'fire-chief@example.com';
  ```

### 8. Navigation Map

```
Home (/)
├── Sign In (/sign-in) - Login page
├── Sign Up (/sign-up) - Create account
└── Dashboard (/) - Redirects authenticated users to /dashboard

Dashboard (/dashboard)
├── Floor Plan (SVG Visual)
├── Statistics Panel
├── Incident Triage Table
└── Quick Actions
    ├── View Building Details
    ├── Create New Incident
    └── View Incident Report

Buildings (/buildings)
├── Building List
├── Add New Building (Dialog)
├── View Building Details
│   ├── Floors
│   │   ├── Zones
│   │   │   └── Sensors
│   │   └── Occupancy Schedule
│   └── Persons/Occupants

Incidents (/incidents/[id])
├── Incident Overview
├── 8-Section Report Form
│   ├── Section A: Details
│   ├── Section B: Building Info
│   ├── Section C: Fire Characteristics
│   ├── Section D: Occupancy
│   ├── Section E: Resources
│   ├── Section F: Actions
│   ├── Section G: Outcome
│   └── Section H: Analysis
└── Export to PDF

Responder View (Mobile)
├── Active Incidents
├── Zone Assignment
├── Real-time Navigation
└── Status Updates
```

### 9. Demo Workflow (Complete Example)

**Follow this to understand the full application:**

```
Step 1: Create Account
└─ Sign up as fire-chief@example.com

Step 2: Go to Buildings
└─ Create "City Hospital"
   ├── Type: Hospital
   ├── 3 Floors
   └── 500 max occupancy

Step 3: Add Zones (in first floor)
└─ Zone A: Emergency Room
   ├── Occupancy: 50
   └─ Add Smoke Detector
   
   Zone B: ICU
   ├── Occupancy: 30
   └─ Add Heat Detector
   
   Zone C: Hallway
   ├── Occupancy: 20
   └─ Add Motion Detector

Step 4: View Dashboard
└─ See floor plan with all zones
   └─ All zones show 🟢 (no incident)

Step 5: Simulate Fire Alarm
└─ Manually create incident on Emergency Room zone
   └─ Dashboard updates:
      - Zone A turns 🔴 (high impact)
      - Triage table shows 50 people at risk
      - Impact magnitude: 58.3

Step 6: Fill Incident Report
└─ Click incident
└─ Fill all 8 sections with realistic data
└─ Click "Generate PDF"
└─ Report downloads to computer

Step 7: Complete
└─ Mark incident as resolved
└─ All zones return to 🟢
```

## Key Concepts Summary

### Impact Magnitude Scale

| Impact Score | Risk Level | Color | Action |
|-------------|-----------|-------|---------|
| 0 - 1.0 | No Risk | 🟢 Green | Monitor |
| 1.1 - 5.0 | Low Risk | 🟡 Yellow | Alert Zone |
| 5.1 - 10.0 | High Risk | 🟠 Orange | Prepare Evacuation |
| > 10.0 | Critical | 🔴 Red | Immediate Evacuation |

### Occupancy Levels

- **Low**: < 20 people (offices, storage)
- **Medium**: 20-50 people (conference rooms, departments)
- **High**: 50-100 people (auditoriums, cafeterias)
- **Critical**: > 100 people (atriums, malls, hospitals)

### Response Priority

Incidents are prioritized by:
1. **Impact Magnitude** (highest first)
2. **Occupancy** (most people first)
3. **Distance** (closest to fire first)
4. **Accessibility** (easiest evacuation routes first)

## Troubleshooting

### "I can't log in"
- Check that you created an account via sign-up
- Verify email and password are correct
- Check browser cookies are enabled

### "Dashboard shows no incidents"
- Incidents are created manually or via sensor triggers
- Use the incident creation dialog to test
- Check that building has zones with sensors

### "PDF export not working"
- Ensure all form fields are filled
- Check browser JavaScript is enabled
- Try in a different browser

### "Can't create building"
- You need to be logged in
- Check all fields are filled
- Verify email is unique if creating new account

## Next Steps

1. **Deploy to Production**
   - Push to GitHub
   - Connect Vercel
   - Set environment variables

2. **Add Real Data**
   - Import actual building layouts
   - Configure real sensors
   - Set up occupancy schedules

3. **Integrate with Systems**
   - Connect to fire detection systems
   - Add SMS/email alerts
   - Integrate with emergency services

4. **Mobile Responder App**
   - Build native mobile app
   - Use same API
   - Real-time responder tracking

## Support

For questions or issues:
- Review ARCHITECTURE.md for system design
- Check DEPLOYMENT.md for production setup
- See IMPLEMENTATION_SUMMARY.md for complete feature list
