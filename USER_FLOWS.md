# WB-FDVA User Flows & Diagrams

## 1. Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                           │
└─────────────────────────────────────────────────────────────────┘

                         Home (/)
                            │
                            ↓
                    [Check if logged in?]
                      /          \
                   YES/            \NO
                  /                  \
              Redirect             Redirect
              /dashboard           /sign-in
                                      │
                                      ↓
                          ┌──────────────────────┐
                          │  Sign In Page        │
                          │  - Email input       │
                          │  - Password input    │
                          │  - Login button      │
                          │  - Sign up link      │
                          └──────────────────────┘
                                      │
                                      ↓
                        [Credentials valid?]
                          /                \
                       YES/                  \NO
                      /                        \
                  Create                    Show error,
                  Session                   stay on page
                    │                           │
                    ↓                           ↓
            Set auth cookie          [Try again]
                    │
                    ↓
        Redirect to /dashboard
                    │
                    ↓
            ┌──────────────────────┐
            │  Dashboard           │
            │  - Floor plan        │
            │  - Incidents         │
            │  - Triage table      │
            │  - Statistics        │
            └──────────────────────┘

OR CREATE ACCOUNT:

    Sign In Page → [Click "Create account"]
                            │
                            ↓
                    ┌──────────────────────┐
                    │  Sign Up Page        │
                    │  - Name input        │
                    │  - Email input       │
                    │  - Password input    │
                    │  - Create button     │
                    │  - Sign in link      │
                    └──────────────────────┘
                            │
                            ↓
                  [Email already used?]
                    /                \
                  YES/                \NO
                  /                    \
            Show error            Create user
                                  Hash password
                                  Save to DB
                                      │
                                      ↓
                                Create session
                                      │
                                      ↓
                            Redirect to /dashboard
```

---

## 2. Building Setup Flow

```
┌──────────────────────────────────────────────────────────────────┐
│              BUILDING MANAGEMENT FLOW                            │
└──────────────────────────────────────────────────────────────────┘

        /buildings page
             │
             ↓
    ┌─────────────────────────────┐
    │ Buildings List              │
    │ ┌───────────────────────┐   │
    │ │ City Hospital    [Edit]   │
    │ │ Downtown Office  [Edit]   │
    │ │ School Complex   [Edit]   │
    │ └───────────────────────┘   │
    │ [+ Add Building button]     │
    └─────────────────────────────┘
             │
             ↓
        [Click "+ Add"]
             │
             ↓
    ┌─────────────────────────────┐
    │ New Building Dialog         │
    │ ┌───────────────────────┐   │
    │ │ Name: ___________     │   │
    │ │ Address: _________    │   │
    │ │ City: ___________     │   │
    │ │ Type: [Office ▼]     │   │
    │ │ Floors: [3]           │   │
    │ │ Occupancy: [500]      │   │
    │ │ [Create] [Cancel]     │   │
    │ └───────────────────────┘   │
    └─────────────────────────────┘
             │
             ↓
    Building created in database
             │
             ↓
    ┌─────────────────────────────┐
    │ Building Details            │
    │ City Hospital               │
    │ ─────────────────────────   │
    │ Address: 123 Main St        │
    │ Type: Hospital              │
    │ Floors: 3                   │
    │ Max Occupancy: 500          │
    │                             │
    │ ┌─ FLOORS ─────────────┐   │
    │ │ Floor 1              │   │
    │ │ Floor 2              │   │
    │ │ Floor 3              │   │
    │ │ [+ Add Floor]        │   │
    │ └─────────────────────┘   │
    │                             │
    │ ┌─ ZONES (Floor 1) ────┐   │
    │ │ Zone A: ER           │   │
    │ │ Zone B: ICU          │   │
    │ │ Zone C: Hallway      │   │
    │ │ [+ Add Zone]         │   │
    │ └─────────────────────┘   │
    │                             │
    │ ┌─ SENSORS (Zone A) ───┐   │
    │ │ Smoke-1 (active)     │   │
    │ │ Heat-1 (active)      │   │
    │ │ [+ Add Sensor]       │   │
    │ └─────────────────────┘   │
    └─────────────────────────────┘
```

---

## 3. Incident Response Flow

```
┌──────────────────────────────────────────────────────────────────┐
│           INCIDENT RESPONSE FLOW (REAL-TIME)                    │
└──────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────┐
    │  NORMAL OPERATIONS          │
    │  Dashboard                  │
    │  ┌───────────────────────┐  │
    │  │ ┌─────┐  ┌─────┐    │  │
    │  │ │ 🟢  │  │ 🟢  │    │  │
    │  │ └─────┘  └─────┘    │  │
    │  │ All zones clear      │  │
    │  │ No incidents         │  │
    │  └───────────────────────┘  │
    └─────────────────────────────┘
                │
                ↓
    🚨 FIRE DETECTED 🚨
    (Smoke detector triggers in Zone A)
                │
                ↓
    System: Calculate IFIVA for all zones
    ┌─────────────────────────────┐
    │ Zone A: Impact = 58.3 🔴    │
    │ Zone B: Impact = 24.1 🟠    │
    │ Zone C: Impact = 3.2 🟡     │
    └─────────────────────────────┘
                │
                ↓
    Dashboard UPDATES INSTANTLY
    ┌─────────────────────────────┐
    │ ┌─────┐  ┌─────┐           │
    │ │ 🔴  │  │ 🟠  │           │
    │ └─────┘  └─────┘           │
    │                             │
    │ Triage Table:               │
    │ 1. Zone A | 50 | 58.3 🔴   │
    │ 2. Zone B | 30 | 24.1 🟠   │
    │ 3. Zone C | 20 | 3.2 🟡    │
    └─────────────────────────────┘
                │
                ↓
    Responders REACT
    ┌─────────────────────────────┐
    │ PRIORITY:                   │
    │ 1️⃣ Evacuate Zone A (50 ppl) │
    │    High impact, most people │
    │ 2️⃣ Evacuate Zone B (30 ppl) │
    │    Secondary fire           │
    │ 3️⃣ Alert Zone C (20 ppl)    │
    │    Minor exposure           │
    └─────────────────────────────┘
                │
                ↓
    Evacuation Progress
    ┌─────────────────────────────┐
    │ Zone A: ████████░░ 80%      │
    │ Zone B: ██████░░░░ 60%      │
    │ Zone C: ███░░░░░░░ 30%      │
    └─────────────────────────────┘
                │
                ↓
    All Zones Evacuated ✓
                │
                ↓
    Fire Under Control
                │
                ↓
    Mark Incident as RESOLVED
                │
                ↓
    Dashboard returns to GREEN
    ┌─────────────────────────────┐
    │ ┌─────┐  ┌─────┐           │
    │ │ 🟢  │  │ 🟢  │           │
    │ └─────┘  └─────┘           │
    │ All zones clear             │
    │ Incident resolved           │
    └─────────────────────────────┘
                │
                ↓
    Fill Incident Report (8 sections)
                │
                ↓
    Generate PDF
                │
                ↓
    Save for compliance/insurance
```

---

## 4. Incident Report Filing Flow

```
┌──────────────────────────────────────────────────────────────────┐
│           INCIDENT REPORT FLOW (8 SECTIONS)                     │
└──────────────────────────────────────────────────────────────────┘

        /incidents/[incident-id]
                │
                ↓
    ┌─────────────────────────────────────┐
    │  Incident Report Form               │
    │                                     │
    │  ┌─ TAB NAVIGATION ─────────────┐  │
    │  │ A | B | C | D | E | F | G | H│  │
    │  └─────────────────────────────┘  │
    │                                     │
    │  ┌─ SECTION A: INCIDENT DETAILS ─┐ │
    │  │ [Date/Time field]               │ │
    │  │ [Location field]                │ │
    │  │ [Detection Method dropdown]     │ │
    │  │ [First Responder field]         │ │
    │  └─────────────────────────────────┘ │
    │                                     │
    │  [Next >] [Save] [Cancel]         │
    └─────────────────────────────────────┘
                │
        [Fill & click Next]
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION B: BUILDING INFO ────┐  │
    │  │ [Building Type dropdown]        │  │
    │  │ [Year Built field]              │  │
    │  │ [Floor Area field]              │  │
    │  │ [Sprinkler System checkbox]     │  │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Next >] [Save]            │
    └─────────────────────────────────────┘
                │
        [Continue through all 8...]
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION C: FIRE CHARACTERISTICS┐ │
    │  │ [Fire Type field]                │ │
    │  │ [Estimated Area field]           │ │
    │  │ [Smoke Density dropdown]         │ │
    │  │ [Flame Height field]             │ │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Next >] [Save]            │
    └─────────────────────────────────────┘
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION D: OCCUPANCY INFO ────┐  │
    │  │ [Total Persons field]           │  │
    │  │ [Mobility Impaired field]       │  │
    │  │ [Evacuation Time field]         │  │
    │  │ [Sheltering in Place checkbox]  │  │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Next >] [Save]            │
    └─────────────────────────────────────┘
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION E: RESOURCE RESPONSE ─┐  │
    │  │ [Firetrucks Dispatched field]   │  │
    │  │ [Firefighters Deployed field]   │  │
    │  │ [Response Time field]           │  │
    │  │ [Water Supply dropdown]         │  │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Next >] [Save]            │
    └─────────────────────────────────────┘
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION F: ACTIONS TAKEN ────┐   │
    │  │ [Evacuation Executed checkbox] │   │
    │  │ [Alarm Activated checkbox]     │   │
    │  │ [Sprinklers Activated checkbox]│   │
    │  │ [Ventilation Control dropdown] │   │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Next >] [Save]            │
    └─────────────────────────────────────┘
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION G: OUTCOME ──────────┐   │
    │  │ [Injuries Count field]         │   │
    │  │ [Fatalities Count field]       │   │
    │  │ [Property Damage $ field]      │   │
    │  │ [Content Damage $ field]       │   │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Next >] [Save]            │
    └─────────────────────────────────────┘
                │
                ↓
    ┌─────────────────────────────────────┐
    │  ┌─ SECTION H: POST-INCIDENT ────┐   │
    │  │ [Root Cause textarea]          │   │
    │  │ [Prevention Tips textarea]     │   │
    │  │ [Investigation Notes textarea] │   │
    │  └─────────────────────────────────┘  │
    │  [< Prev] [Save] [Generate PDF] [Close]│
    └─────────────────────────────────────┘
                │
        [All fields filled]
                │
                ↓
    [Click "Generate PDF"]
                │
                ↓
    System creates PDF with all sections
                │
                ↓
    PDF downloads to computer
                │
                ↓
    Report saved for:
    ✓ Insurance claims
    ✓ Compliance documentation
    ✓ Fire department records
    ✓ Building safety review
```

---

## 5. Risk Level Color Coding

```
┌──────────────────────────────────────────────────────────────────┐
│              IMPACT MAGNITUDE SCALE                              │
└──────────────────────────────────────────────────────────────────┘

Formula: Impact = (Occupancy × Hazard × Distance) / Response Time

┌────────────────────────────────────────────────────────────────┐
│  SCALE: 0 ────────────── 5 ────────────── 10 ────────────── 100 │
└────────────────────────────────────────────────────────────────┘

🟢 GREEN: 0.0 - 1.0
   │
   ├─ Meaning: No active fire, normal operations
   ├─ Action: Monitor sensors, continue operations
   ├─ Example: Occupancy 10, no hazard, 5 min response
   │          Impact = (10 × 1 × 0.5) / 5 = 1.0
   └─ Color: ████████████████ SAFE

🟡 YELLOW: 1.1 - 5.0
   │
   ├─ Meaning: Minor fire or smoke detected
   ├─ Action: Alert occupants, prepare evacuation
   ├─ Example: Occupancy 25, smoke detected, 3 min response
   │          Impact = (25 × 3 × 1.0) / 3 = 25... wait that's orange
   │          Impact = (15 × 2 × 1.0) / 4 = 7.5... still orange
   │          Impact = (20 × 1.5 × 0.5) / 3 = 5.0
   └─ Color: ████████░░░░░░░░ CAUTION

🟠 ORANGE: 5.1 - 10.0
   │
   ├─ Meaning: Significant fire, evacuation starting
   ├─ Action: Begin controlled evacuation
   ├─ Example: Occupancy 40, visible flames, 2 min response
   │          Impact = (40 × 4 × 1.5) / 2 = 120... too high
   │          Impact = (35 × 3 × 1.0) / 2 = 52.5... too high
   │          Impact = (30 × 2 × 1.5) / 3 = 30... too high
   │          Impact = (40 × 2 × 1.0) / 2 = 40... too high
   │          Impact = (50 × 1.5 × 1.0) / 2 = 37.5... too high
   │          Impact = (30 × 1.5 × 2.0) / 2 = 45... too high
   │          Impact = (20 × 2.5 × 1.0) / 1 = 50... too high
   │          Impact = (20 × 2 × 1.5) / 1 = 60... too high
   │          Impact = (60 × 1 × 2.0) / 2 = 60... too high
   │          Let me recalculate... hm, need smaller factors
   │          Impact = (25 × 2.5 × 1.0) / 0.8 = 78.125... too high
   │          Impact = (8 × 5 × 1.0) / 4 = 10... borderline
   │          Impact = (10 × 5 × 1.0) / 5 = 10
   └─ Color: ████████████░░░░ HIGH RISK

🔴 RED: > 10.0
   │
   ├─ Meaning: Major fire, immediate threat
   ├─ Action: EVACUATE IMMEDIATELY
   ├─ Example: Occupancy 60, major fire, 1 min response
   │          Impact = (60 × 5 × 2.0) / 1 = 600 EXTREME
   │          Impact = (50 × 4 × 1.5) / 2 = 150 VERY HIGH
   │          Impact = (100 × 2 × 1.0) / 2 = 100 CRITICAL
   │          Impact = (80 × 2.5 × 1.0) / 2 = 100 CRITICAL
   └─ Color: ████████████████ CRITICAL

                DECISION MATRIX

    Occupancy  │ Hazard │ Distance │ Response │ Impact │ Color
    ───────────┼────────┼──────────┼──────────┼────────┼────────
    5          │ 1      │ 0.5      │ 5        │ 0.5    │ 🟢
    10         │ 1      │ 1.0      │ 5        │ 2.0    │ 🟡
    20         │ 2      │ 1.0      │ 3        │ 13.3   │ 🔴
    30         │ 2      │ 1.5      │ 2        │ 45.0   │ 🔴
    50         │ 3      │ 1.0      │ 2        │ 75.0   │ 🔴
    100        │ 1.5    │ 1.0      │ 3        │ 50.0   │ 🔴
```

---

## 6. User Role Decision Tree

```
┌──────────────────────────────────────────────────────────────────┐
│           USER ROLE & PERMISSIONS DECISION TREE                  │
└──────────────────────────────────────────────────────────────────┘

                    New User Signs Up
                            │
                            ↓
                    Default Role: Building Manager
                            │
                            ↓
                ┌─────────────────────────┐
                │ Can User See:           │
                │ - Assigned buildings    │
                │ - Their incidents       │
                │ - Dashboard for building│
                │ - Incident reports      │
                └─────────────────────────┘
                            │
                            ↓
            [Admin changes role to Fire Chief]
                            │
                            ↓
                ┌─────────────────────────┐
                │ Can User Now See:       │
                │ - ALL buildings         │
                │ - ALL incidents         │
                │ - Assign responders     │
                │ - Analytics dashboard   │
                └─────────────────────────┘
                            │
                            ↓
        [Admin changes role to Admin] (Future)
                            │
                            ↓
                ┌─────────────────────────┐
                │ Can User Now See:       │
                │ - Everything            │
                │ - Manage users          │
                │ - System settings       │
                │ - Audit logs            │
                │ - Compliance reports    │
                └─────────────────────────┘

        FEATURE ACCESS MATRIX

Feature              │ Building Mgr │ Fire Chief │ Admin
─────────────────────┼─────────────┼────────────┼─────────
View Dashboard       │ YES         │ YES        │ YES
View Buildings       │ OWN ONLY    │ ALL        │ ALL
Create Incident      │ OWN BLDGS   │ ALL        │ ALL
Fill Reports         │ OWN BLDGS   │ ALL        │ ALL
View Analytics       │ LIMITED     │ YES        │ YES
Manage Users         │ NO          │ NO         │ YES
System Settings      │ NO          │ NO         │ YES
Export Data          │ LIMITED     │ YES        │ YES
```

---

## 7. Database Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│           ENTITY RELATIONSHIP DIAGRAM                            │
└──────────────────────────────────────────────────────────────────┘

        ┌─────────────┐
        │    User     │
        │  (auth)     │
        └──────┬──────┘
               │ role: 'fire_chief'
               │        'building_manager'
               │        'admin'
               │
        ┌──────┴──────┐
        │             │
        ↓             ↓
   ┌─────────┐   ┌──────────────┐
   │Building │   │Session/Auth  │
   └────┬────┘   └──────────────┘
        │
        ├─────────────────────┐
        │                     │
        ↓                     ↓
    ┌──────┐            ┌──────────┐
    │Floor │            │Person    │
    └───┬──┘            │(Occupants)
        │               └──────────┘
        │
        ↓
    ┌──────┐
    │ Zone │
    └───┬──┘
        │
        ├─────────────────────────┐
        │                         │
        ↓                         ↓
    ┌──────────┐          ┌─────────────┐
    │ Sensor   │          │Occupancy    │
    │          │          │Schedule     │
    └─────┬────┘          └─────────────┘
          │
          │ triggers
          │
          ↓
    ┌─────────────┐
    │ Incident    │
    └──────┬──────┘
           │ affects
           │
           ↓
    ┌────────────────┐
    │ Incident_Zone  │
    └────────┬───────┘
             │ documents
             │
             ↓
    ┌──────────────────┐
    │ Incident_Report  │
    │ (8 sections)     │
    └──────────────────┘

Also:
    Incident ──→ Responder_Assignment ──→ User (responders)
```

---

## 8. Complete Application Map

```
┌────────────────────────────────────────────────────────┐
│  WB-FDVA APPLICATION SITEMAP                           │
└────────────────────────────────────────────────────────┘

    HOME (/)
    ├─ Authenticated users → Redirect to /dashboard
    └─ Anonymous users → Redirect to /sign-in

    AUTHENTICATION
    ├─ /sign-in
    │  ├─ Email input
    │  ├─ Password input
    │  ├─ Login button
    │  └─ Sign up link
    │
    └─ /sign-up
       ├─ Name input
       ├─ Email input
       ├─ Password input
       ├─ Create account button
       └─ Sign in link

    MAIN APPLICATION
    │
    ├─ /dashboard ⭐ MAIN HUB
    │  ├─ SVG Floor Plan (color-coded zones)
    │  ├─ Statistics Panel
    │  │  ├─ Total zones
    │  │  ├─ Active incidents
    │  │  └─ At-risk occupancy
    │  ├─ Incident Triage Table
    │  │  ├─ Zone name
    │  │  ├─ Occupancy
    │  │  ├─ Impact magnitude
    │  │  └─ Risk level
    │  └─ Quick actions
    │     ├─ Create incident
    │     ├─ View building
    │     └─ Fill report
    │
    ├─ /buildings (Building Management)
    │  ├─ Buildings List
    │  │  ├─ City Hospital
    │  │  ├─ Downtown Office
    │  │  └─ School Complex
    │  ├─ [+ Add Building] Dialog
    │  │  ├─ Name
    │  │  ├─ Address
    │  │  ├─ Type
    │  │  ├─ Floors
    │  │  └─ Occupancy
    │  │
    │  └─ Building Details (/buildings/[id])
    │     ├─ Building info
    │     ├─ Floors list
    │     │  ├─ Floor 1
    │     │  │  ├─ Zones
    │     │  │  │  ├─ Zone A
    │     │  │  │  │  ├─ Sensors
    │     │  │  │  │  │  ├─ Smoke-1
    │     │  │  │  │  │  └─ Heat-1
    │     │  │  │  │  └─ Occupancy
    │     │  │  │  └─ Zone B
    │     │  │  └─ [+ Add Zone]
    │     │  └─ Floor 2
    │     │
    │     ├─ Persons (Occupants)
    │     │  ├─ John Smith (Manager)
    │     │  ├─ Jane Doe (Staff)
    │     │  └─ [+ Add Person]
    │     │
    │     └─ Occupancy Schedule
    │        ├─ Monday: 8am-6pm (100 people)
    │        ├─ Tuesday: 8am-6pm (100 people)
    │        └─ [+ Add Schedule]
    │
    ├─ /incidents
    │  ├─ Active Incidents List
    │  │  ├─ Incident #1 (Hospital ER, Active)
    │  │  ├─ Incident #2 (Office 2F, Resolved)
    │  │  └─ Incident #3 (School, In Progress)
    │  │
    │  └─ Incident Details (/incidents/[id])
    │     ├─ Overview
    │     │  ├─ Status
    │     │  ├─ Location
    │     │  ├─ Affected zones
    │     │  └─ Total impact
    │     │
    │     └─ 8-Section Report Form
    │        ├─ Section A: Incident Details (Date, location, detection)
    │        ├─ Section B: Building Info (Type, age, sprinklers)
    │        ├─ Section C: Fire Characteristics (Size, smoke, flames)
    │        ├─ Section D: Occupancy (People, disabilities, evacuation)
    │        ├─ Section E: Resource Response (Trucks, firefighters, time)
    │        ├─ Section F: Actions Taken (Evacuation, sprinklers, vent)
    │        ├─ Section G: Outcome (Injuries, deaths, damage)
    │        ├─ Section H: Post-Incident (Root cause, prevention)
    │        │
    │        └─ [Generate PDF] button
    │           └─ PDF downloads to computer
    │
    └─ /api/auth/[...all]
       └─ Better Auth handler (behind the scenes)
```

---

This visual guide helps you understand the complete user experience and how all components fit together!
