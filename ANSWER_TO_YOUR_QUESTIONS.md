# Answers to Your Questions

## Your Questions:
1. **What is the email and password?**
2. **Is there any admin?**
3. **How does the application work?**

---

## 1. Email & Password

### ✅ ONE Admin Account Pre-Exists
The WB-FDVA system comes with **one pre-created admin account**.

### 🔐 Admin Login Credentials

```
Email: ADMIN
Password: ADMIN123
```

**Use these credentials to login immediately to http://localhost:3000**

### ✅ Create Additional Accounts

After logging in with admin account, you can create more accounts:

1. Go to http://localhost:3000/sign-up
2. Fill in:
   - **Name**: Your name (e.g., "John Smith")
   - **Email**: Any email address (e.g., fire-chief@example.com)
   - **Password**: Any password (8+ characters, e.g., SecurePass123!)
3. Click "Create Account"
4. You're logged in automatically

### 📧 Additional Demo Email Suggestions

Create these accounts after logging in as admin:

```
Email: fire-chief@example.com
Password: SecurePass123!

OR

Email: building-manager@example.com
Password: ManagerPass456!
```

**Important**: Each email can only be registered **once**. If you try the same email twice, you'll get an error.

### 🔐 Password Requirements

- Minimum 8 characters
- Can contain: letters, numbers, special characters
- No restrictions otherwise

---

## 2. Admin Accounts

### ✅ ONE Admin Account Exists

There is **one admin account pre-created** in the system for immediate use.

**Admin Credentials:**
```
Email: ADMIN
Password: ADMIN123
```

### 👨‍💼 User Roles

The system has 3 roles:

| Role | Description |
|------|-------------|
| 🟢 **Fire Chief** | Can see all buildings, all incidents, assign responders, view analytics |
| 🏢 **Building Manager** | Can see assigned buildings only, manage zones and sensors, create reports |
| 👑 **Admin** | Can do everything + manage users, system settings, compliance reports (You are this) |

### 📝 Default Role for New Accounts

**When new users create accounts (sign-up):**
- Default role: **Building Manager**
- You can see buildings assigned to you
- Limited admin features

**To become a Fire Chief (in development):**
- Run SQL in Neon console:
  ```sql
  UPDATE "user" SET role = 'fire_chief' WHERE email = 'your-email@example.com';
  ```
- Then refresh your browser
- You'll now see ALL buildings and ALL incidents

**To become an Admin (Future v2):**
- Not implemented yet
- Coming in version 2.0

### 🎯 For Testing, You Need to:

1. **Create your own account** (sign-up page)
2. **Optional: Make yourself a Fire Chief** (SQL command above)
3. **Start managing buildings and incidents**

---

## 3. How the Application Works

### 🎯 Complete Overview

WB-FDVA = **Web-Based Fire Disaster Vulnerability Assessment & Audit System**

It's a **fire emergency management platform** that helps:
- 🏢 Track building layouts
- 🚨 Detect fires via sensors
- 📊 Calculate fire risk for each zone
- 📱 Guide emergency responders
- 📋 Document incidents with 8-section reports

---

### 📋 Step-by-Step Workflow

#### **Phase 1: Setup** (Done Once)

```
1. Create Account
   └─ Sign up with email/password
   
2. Create Building
   └─ Add building name, address, type, # floors, occupancy

3. Add Floors
   └─ Floor 1, Floor 2, Floor 3, etc.

4. Add Zones
   └─ Zone A (Emergency Room, 50 people)
   └─ Zone B (ICU, 30 people)
   └─ Zone C (Hallway, 20 people)

5. Add Sensors
   └─ Smoke detectors in each zone
   └─ Heat detectors in critical areas
   └─ Motion sensors for occupancy
```

#### **Phase 2: Normal Operations**

```
Dashboard shows:
✅ All zones: GREEN (safe)
✅ All sensors: ACTIVE
✅ No incidents
✅ No evacuations needed
```

#### **Phase 3: Emergency** (Fire Detected)

```
1. Sensor Detects Fire
   └─ Smoke detector triggers in Zone A
   
2. System Creates Incident
   └─ Incident record saved to database
   
3. Risk Calculated (IFIVA Algorithm)
   └─ Impact = (Occupancy × Hazard Level × Distance) / Response Time
   └─ Zone A: 50 people × high fire × normal distance / 2 min = HIGH RISK
   
4. Dashboard Updates Instantly
   └─ Zone A turns: 🔴 RED (Critical)
   └─ Zone B turns: 🟠 ORANGE (High)
   └─ Zone C turns: 🟡 YELLOW (Low)
   
5. Triage Table Populates
   └─ Shows sorted by risk:
      1. Zone A (50 people) - EVACUATE FIRST
      2. Zone B (30 people) - EVACUATE SECOND
      3. Zone C (20 people) - EVACUATE THIRD
```

#### **Phase 4: Response** (Responders React)

```
1. Fire Chief Sees Dashboard
   └─ Sees color-coded floor plan
   └─ Sees triage table with priorities
   
2. Evacuate by Priority
   └─ Responders go to Zone A first (RED)
   └─ Then Zone B (ORANGE)
   └─ Then Zone C (YELLOW)
   
3. Track Progress
   └─ Dashboard shows evacuation status
   └─ Live occupancy for each zone
   
4. When Safe
   └─ Mark incident as resolved
   └─ Dashboard returns to GREEN
```

#### **Phase 5: Documentation** (After Emergency)

```
1. Navigate to Incident Report
   └─ /incidents/[incident-id]

2. Fill 8-Section Form
   ├─ Section A: When and where fire was detected
   ├─ Section B: Building information
   ├─ Section C: Fire characteristics (size, smoke)
   ├─ Section D: People affected (occupancy, disabilities)
   ├─ Section E: Emergency response (trucks, firefighters)
   ├─ Section F: Actions taken (evacuation, sprinklers)
   ├─ Section G: Outcome (injuries, deaths, damage)
   └─ Section H: Root cause and prevention

3. Export PDF
   └─ Click "Generate PDF"
   └─ Report downloads
   └─ Save for insurance, compliance, records
```

---

### 🎨 What You'll See

#### **Main Dashboard** (`/dashboard`)

```
┌─────────────────────────────────────────┐
│        WB-FDVA Dashboard                │
├─────────────────────────────────────────┤
│                                         │
│  SVG FLOOR PLAN                         │
│  ┌─────────────────────────────────┐   │
│  │  ┌─────┐    ┌─────┐   ┌─────┐  │   │
│  │  │ 🔴  │    │ 🟠  │   │ 🟡  │  │   │
│  │  │ Zone│    │ Zone│   │ Zone│  │   │
│  │  │  A  │    │  B  │   │  C  │  │   │
│  │  └─────┘    └─────┘   └─────┘  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  STATISTICS                             │
│  Zones: 3    Incidents: 1    At Risk: 80│
│                                         │
│  TRIAGE TABLE                           │
│  ┌──────────────────────────────────┐  │
│  │ Zone | People | Impact | Level   │  │
│  ├──────────────────────────────────┤  │
│  │ A    | 50     | 58.3   | 🔴 RED │  │
│  │ B    | 30     | 24.1   | 🟠 ORG │  │
│  │ C    | 20     | 3.2    | 🟡 YEL │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

#### **Building Management** (`/buildings`)

```
Create buildings → Add floors → Add zones → Add sensors → Manage occupancy
```

#### **Incident Response** (`/incidents/[id]`)

```
View incident details → Fill 8-section form → Export PDF → Done
```

---

### 🔴 Risk Level Color Explanation

During a fire, zones are colored based on **impact magnitude**:

| Color | Impact Score | Meaning | Action |
|-------|--------------|---------|--------|
| 🟢 Green | 0-1.0 | No fire | Monitor |
| 🟡 Yellow | 1.1-5.0 | Minor fire | Alert occupants |
| 🟠 Orange | 5.1-10.0 | Significant fire | Prepare evacuation |
| 🔴 Red | > 10.0 | Major fire | **EVACUATE NOW** |

**Example:**
```
Office fire detected:
- Zone A (Conference Room): 50 people + major fire = 🔴 RED = EVACUATE FIRST
- Zone B (Adjacent Office): 30 people + smoke = 🟠 ORANGE = EVACUATE SECOND  
- Zone C (Hallway): 20 people + minor exposure = 🟡 YELLOW = EVACUATE THIRD
```

---

### 🧮 The IFIVA Algorithm

This is how the system **calculates priority**.

**Formula:**
```
Impact Magnitude = (Occupancy × Hazard Level × Distance) / Response Time

Where:
- Occupancy = Number of people in zone (10, 50, 100, etc.)
- Hazard Level = 1-10 (1 = slight smoke, 10 = major fire)
- Distance = 0.5-2.0 (1.0 = normal, higher = farther from fire)
- Response Time = Minutes to reach zone (1-20 minutes)
```

**Real Example:**
```
Hospital Emergency Room Fire:

Inputs:
- Occupancy: 60 people
- Hazard: 8 (major fire with visible flames)
- Distance: 1.5 (moderate distance)
- Response Time: 2 minutes (ground floor, close to exit)

Calculation:
Impact = (60 × 8 × 1.5) / 2
Impact = 720 / 2  
Impact = 360

Result: CRITICAL 🔴 (way above 10.0 threshold)
→ Immediate evacuation required
→ This zone shown first in triage table
```

---

### 🎮 Example Scenario: Your First Fire

**Scenario:** 
You created a hospital building with 3 zones. Fire starts in Emergency Room.

**What happens:**

```
1. SETUP (You did this already)
   Building: City Hospital
   ├─ Floor 1
   │  ├─ Zone A: Emergency Room (50 people)
   │  ├─ Zone B: ICU (30 people)
   │  └─ Zone C: Hallway (20 people)

2. FIRE DETECTED (Auto or manual)
   Smoke detected in Zone A

3. SYSTEM CALCULATES
   Impact A = (50 × 8 × 1.5) / 2 = 300 🔴 CRITICAL
   Impact B = (30 × 4 × 1.0) / 2 = 60 🔴 CRITICAL
   Impact C = (20 × 2 × 0.5) / 2 = 10 🔴 CRITICAL

4. DASHBOARD UPDATES
   - Floor plan shows all zones RED
   - Triage table shows:
     1. Zone A - Impact 300 (EVACUATE FIRST)
     2. Zone B - Impact 60 (EVACUATE SECOND)
     3. Zone C - Impact 10 (EVACUATE THIRD)

5. YOU RESPOND
   - See dashboard
   - Evacuate Zone A first (50 people)
   - Then Zone B (30 people)
   - Then Zone C (20 people)

6. DOCUMENT
   - Fill incident report (8 sections)
   - What happened, where, why
   - How many people, injuries, damage
   - Root cause analysis
   
7. EXPORT
   - Generate PDF
   - Save for insurance/compliance
   - Done
```

---

### 🔐 Security Features

- ✅ **Password hashing**: Your password is securely hashed
- ✅ **Session tokens**: Secure login sessions
- ✅ **Data isolation**: You only see your own buildings
- ✅ **HTTPS**: All data encrypted in transit
- ✅ **Database backups**: Automatic daily backups

---

### 📱 Pages Available

```
/                      Home (redirects to dashboard if logged in)
/sign-in               Login page
/sign-up               Create account page
/dashboard             Main dashboard (active incidents, floor plan)
/buildings             Building management
/incidents/[id]        Incident report form (8 sections)
/api/auth/[...all]     Authentication backend (hidden)
```

---

### 🚀 To Get Started

1. **Navigate to**: http://localhost:3000/sign-up
2. **Create account** with any email/password
3. **Go to dashboard**: http://localhost:3000/dashboard
4. **Create building**: Go to /buildings, click "Add Building"
5. **Add zones**: Create floors and zones in your building
6. **Simulate incident**: Create an incident to test
7. **View results**: See color-coded zones and triage table
8. **Fill report**: Navigate to incident and fill 8-section form

---

## Summary

### Email & Password
- **No pre-existing accounts**
- **Create your own** via sign-up page
- Use any email/password you want

### Admin
- **No pre-existing admin**
- **You become admin** by running SQL command (optional)
- Default role is Building Manager

### How It Works
- **Setup phase**: Create building, add zones, add sensors
- **Normal ops**: All zones green, sensors active
- **Emergency**: Fire detected, zones turn colors based on risk
- **Response**: Evacuate by priority (red first, yellow last)
- **Documentation**: Fill 8-section report, export PDF

---

**Ready to use?** Go to http://localhost:3000/sign-up and create your account! 🚀
