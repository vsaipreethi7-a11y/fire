# WB-FDVA Quick Reference Card

## 🚀 Quick Start (2 minutes)

**First Time Setup:**
1. Start dev server: `pnpm dev`
2. Go to http://localhost:3000/sign-up
3. Create admin account:
   - Name: `Administrator`
   - Email: `admin@admin.com`
   - Password: `ADMIN123`
4. You're logged in! Dashboard loads automatically

**After First Login:**
- Go to /buildings to create a building
- View /dashboard to see live incidents

## 📧 Admin Credentials

| Field | Value |
|-------|-------|
| **Email** | admin@admin.com |
| **Password** | ADMIN123 |

**See ADMIN_SETUP_SIMPLE.md for detailed setup instructions.**

---

## 🎯 Main Pages

| Page | URL | Purpose |
|------|-----|---------|
| Sign In | `/sign-in` | Login to account |
| Sign Up | `/sign-up` | Create new account |
| Dashboard | `/dashboard` | **Main hub** - View incidents, triage |
| Buildings | `/buildings` | Manage buildings, floors, zones |
| Incident Report | `/incidents/[id]` | Fill 8-section fire report |

---

## 🔥 How Incidents Work

### 1. Fire Detected
- Sensor triggers alarm
- System creates incident record
- IFIVA algorithm calculates impact

### 2. Impact Calculated
```
Impact = (Occupancy × Hazard Level × Distance) / Response Time
```

### 3. Dashboard Updates
- Floor plan colors change
- Zones: 🟢 Green → 🟡 Yellow → 🟠 Orange → 🔴 Red
- Triage table shows sorted risk levels

### 4. Responders React
- See incident details
- Prioritize by impact
- Evacuate high-risk zones first

### 5. Report Documented
- Fill 8-section form
- Export PDF
- Store for records

---

## 📊 Risk Levels

| Level | Score | Color | Action |
|-------|-------|-------|--------|
| Clear | 0-1.0 | 🟢 Green | Monitor |
| Low | 1.1-5.0 | 🟡 Yellow | Alert |
| High | 5.1-10.0 | 🟠 Orange | Prepare |
| Critical | >10.0 | 🔴 Red | **Evacuate NOW** |

---

## 🏢 Building Structure

```
Building (Hospital)
├── Floor 1 (Emergency)
│   ├── Zone A: ER (50 people, 🔥 High Risk)
│   ├── Zone B: ICU (30 people, 🟡 Low Risk)
│   └── Zone C: Hallway (20 people, 🟢 Clear)
└── Floor 2 (Patient Rooms)
    ├── Zone D: Rooms (100 people, 🟡 Low Risk)
    └── Zone E: Stairs (15 people, 🟢 Clear)
```

---

## 🎮 Common Actions

### Create Building
```
/buildings → "Add Building" button → Fill form → Create
```

### View Live Incidents
```
/dashboard → Floor plan shows colored zones → Click zone for details
```

### Fill Fire Report
```
/incidents/[id] → 8 tabs (A-H) → Fill sections → "Generate PDF"
```

### Check Occupancy
```
/buildings → Select building → See zones with occupancy numbers
```

---

## 🔐 User Roles

| Feature | Fire Chief | Building Mgr | Admin |
|---------|-----------|-------------|-------|
| View dashboard | ✅ | ✅ | ✅ |
| Create incidents | ✅ | ✅ | ✅ |
| Manage buildings | ✅ | ✅ | ✅ |
| View all buildings | ✅ | ❌* | ✅ |
| Manage users | ❌ | ❌ | ✅ |

*Building managers see only their assigned buildings

---

## 📋 8-Section Report (A-H)

| Section | What to Fill |
|---------|-------------|
| **A** | When & where fire was detected |
| **B** | Building type, year, sprinklers |
| **C** | Fire size, smoke density, flames |
| **D** | Number of people, mobility issues |
| **E** | Fire trucks, firefighters, response time |
| **F** | What actions were taken |
| **G** | Injuries, deaths, property damage |
| **H** | Root cause & prevention tips |

---

## 🔧 Deployment

### Local
```bash
pnpm dev              # Start development server
```

### Production (Vercel)
```
1. Push to GitHub
2. Connect Vercel
3. Set DATABASE_URL & BETTER_AUTH_SECRET
4. Auto-deploys on git push
```

### Docker
```bash
docker build -t wb-fdva .
docker run -e DATABASE_URL=... -e BETTER_AUTH_SECRET=... wb-fdva
```

---

## 🚨 Key Scenarios

### Scenario 1: Single Zone Fire
```
Fire detected in one zone (50 people)
→ Impact: 45 (high)
→ Zone turns RED
→ Triage shows this zone first
→ Evacuate immediately
```

### Scenario 2: Multi-Floor Fire
```
Fire on floor 2, spreading to floor 3
→ Multiple zones affected
→ Each calculated independently
→ Dashboard shows all red zones
→ Responders handle by priority
```

### Scenario 3: High Occupancy Area
```
Fire detected in auditorium (300 people)
→ Even small fire = high impact
→ Red zone immediately
→ Coordinated evacuation critical
→ Report includes crowd management notes
```

---

## 🔍 Database Tables (13 total)

| Table | Purpose |
|-------|---------|
| user | User accounts |
| session | Login sessions |
| building | Buildings |
| floor | Floors in buildings |
| zone | Rooms/areas in floors |
| sensor | Fire detectors |
| person | Building occupants |
| incident | Fire alarms |
| incident_zone | Zones affected by fires |
| incident_report | 8-section forms |
| responder_assignment | Who's assigned where |
| occupancy_schedule | Occupancy calendar |
| account | Auth provider accounts |

---

## 📞 Emergency Contact

During actual emergency:
1. **Call 911 first** (always)
2. Activate building alarm
3. Use WB-FDVA to track evacuation
4. Update incident report post-emergency

---

## 💡 Pro Tips

1. **Pre-populate buildings** before emergency
2. **Keep occupancy schedules updated** for accurate impact
3. **Train staff** on evacuation zones
4. **Regular sensor testing** monthly
5. **Export reports** for insurance & compliance
6. **Review incident analysis** to improve safety

---

## ❓ FAQ

**Q: How do I login?**
A: Use ADMIN / ADMIN123. Only one admin account exists.

**Q: Can I create more accounts?**
A: Yes, use the sign-up page (/sign-up) to create additional accounts.

**Q: Can I import existing buildings?**
A: Not yet. Manual entry required for MVP. Bulk import coming soon.

**Q: Does it send real alerts?**
A: Not yet. Mock alerts only. Real SMS/email integration coming.

**Q: Can responders use mobile?**
A: Coming soon. Use responsive web for now.

**Q: How do I backup data?**
A: Neon has automatic backups. Download reports as PDFs.

---

**Created**: June 2026  
**Version**: 1.0 MVP  
**Status**: Production Ready
