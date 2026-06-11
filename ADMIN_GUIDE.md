# WB-FDVA Admin Guide

## 🔐 Admin Login Credentials

**Email**: `admin@admin.com`  
**Password**: `ADMIN123`

> ⚠️ **IMPORTANT**: Change this password immediately after first login in a production environment!

---

## 📋 Admin Account Details

| Field | Value |
|-------|-------|
| User ID | admin-user-wb-fdva |
| Email | admin@admin.com |
| Name | Administrator |
| Role | admin |
| Email Verified | Yes |
| Account Type | credential (email/password) |

---

## 🚀 First Login Steps

1. Navigate to: `http://localhost:3000/sign-in`
2. Enter email: `admin@admin.com`
3. Enter password: `ADMIN123`
4. Click "Sign in"
5. You'll be redirected to the dashboard

---

## 👑 Admin Capabilities

As an ADMIN user, you have full access to:

### Buildings Management
- View all buildings in the system
- Create new buildings
- Edit building information
- Delete buildings
- View all zones across all buildings

### Incident Management
- View all incidents system-wide
- Access incident reports
- Monitor real-time incident status
- View occupancy and risk assessments

### User Management (Future v2)
- Create user accounts
- Assign user roles
- Edit user information
- Delete user accounts
- View user activity logs

### Reports
- View system-wide incident reports
- Export incident reports to PDF
- Access audit logs
- Generate system statistics

### System Settings (Future v2)
- Configure system parameters
- Manage API keys
- Configure notifications
- View system logs

---

## 🔒 Security Best Practices

### Immediately After First Login:

1. **Change Password**
   - Click "Settings" (top right)
   - Select "Security"
   - Change password to a strong, unique password
   - Save changes

2. **Enable Two-Factor Authentication** (Future v2)
   - Add phone number
   - Verify via SMS
   - Keep backup codes secure

3. **Set Up Audit Logging**
   - Enable detailed logging
   - Monitor suspicious activity
   - Review logs regularly

---

## 📊 Admin Dashboard Features

The admin dashboard shows:

- **System Overview**
  - Total buildings: X
  - Total zones: X
  - Active incidents: X
  - Total occupancy: X persons

- **Recent Activity**
  - Latest incidents
  - User login history
  - Building changes
  - Zone modifications

- **Risk Assessment**
  - System-wide risk level
  - High-risk zones
  - Response times
  - Equipment status

- **Reports**
  - Incident statistics
  - Incident trends
  - Zone usage patterns
  - Response effectiveness

---

## 🛠️ Common Admin Tasks

### Task 1: Create a New Building

1. Go to "Buildings" page
2. Click "Add New Building"
3. Fill in building details:
   - Name
   - Address
   - Type (Office, Hospital, etc.)
   - Number of floors
   - Total occupancy
4. Click "Create Building"
5. Building appears in list with ID

### Task 2: View All Incidents

1. Go to "Dashboard"
2. View "Recent Incidents" panel
3. Click any incident to view details
4. See zone status with color coding:
   - Green: Safe
   - Yellow: Medium risk
   - Orange: High risk
   - Red: Critical risk

### Task 3: Export Incident Report

1. Go to incident details page
2. Click "Generate Report"
3. Fill in 8 sections (A-H)
4. Click "Export PDF"
5. Report downloads to computer

### Task 4: Monitor System Health

1. Go to "Settings" → "System"
2. View uptime and status
3. Check database connections
4. Review error logs
5. Monitor API response times

---

## 🚨 Emergency Response Protocol

If there's an active incident:

1. **Immediate Actions**
   - Go to Dashboard
   - View floor plan with color-coded zones
   - Identify RED zones (critical)
   - Note occupancy in affected zones

2. **Coordination**
   - Assign responders to zones
   - Track evacuation progress
   - Monitor response times
   - Update incident status

3. **Documentation**
   - Ensure incident report is being filled
   - Verify all sections are complete
   - Export report for records

---

## 📞 Admin Support

### Common Issues

**Q: Admin password not working?**
A: Verify you're using the correct email: `admin@admin.com` and password: `ADMIN123`

**Q: Forgot admin password?**
A: Run the create-admin script again to reset:
```bash
node scripts/create-admin.js
```

**Q: How to promote another user to admin?**
A: Use the database:
```sql
UPDATE "user" SET role = 'admin' WHERE email = 'user@example.com';
```

**Q: How to demote admin user?**
A: Use the database:
```sql
UPDATE "user" SET role = 'fire_chief' WHERE email = 'admin@admin.com';
```

---

## 🔐 Database Access

If you need direct database access:

**Neon Console:**
- Go to: https://console.neon.tech
- Project: crimson-forest-69021412
- Database: neondb
- Run SQL queries directly

**Via Application:**
- All admin functions available through UI
- No direct database access needed for normal operations

---

## 📱 Multi-Device Access

Admin account can be logged in from multiple devices:

1. Desktop computer (primary)
2. Laptop
3. Tablet
4. Mobile phone

**Security Note**: For security, log out from other devices if:
- Device is lost or stolen
- Session seems compromised
- Password is changed

---

## 🔄 Session Management

**Session Timeout**: 30 days of inactivity

**Manual Logout**:
1. Click "Settings" (top right)
2. Click "Logout"
3. Session ends immediately

**View Active Sessions**:
1. Settings → Security
2. See list of active sessions
3. Can manually end sessions from other devices

---

## 📈 Admin Metrics & KPIs

Track these key metrics:

| Metric | Meaning | Ideal Range |
|--------|---------|-------------|
| Response Time | Avg time to respond | < 5 minutes |
| False Alarm Rate | % false alarms | < 2% |
| Evacuation Rate | % successfully evacuated | > 98% |
| System Uptime | % time available | > 99.9% |
| Incident Rate | Incidents per month | < 1 per building |

---

## 🎓 Admin Training

### New Admin Checklist

- [ ] Read this guide (ADMIN_GUIDE.md)
- [ ] Login with admin credentials
- [ ] View dashboard overview
- [ ] Create a test building
- [ ] Simulate an incident
- [ ] Generate an incident report
- [ ] Export report to PDF
- [ ] Review all pages
- [ ] Understand user roles
- [ ] Test security features
- [ ] Change admin password
- [ ] Set up monitoring alerts
- [ ] Review backup procedures
- [ ] Document emergency procedures

---

## 🚀 Production Deployment Checklist

Before deploying to production:

- [ ] Change admin password
- [ ] Enable 2FA (when available)
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Set up logging
- [ ] Test disaster recovery
- [ ] Train other admins
- [ ] Document procedures
- [ ] Create runbooks
- [ ] Set up alerts
- [ ] Configure HTTPS
- [ ] Set up SSL certificates
- [ ] Configure CDN
- [ ] Enable rate limiting
- [ ] Set up DDoS protection

---

## 📞 Support & Resources

**For Issues:**
1. Check TROUBLESHOOTING.md
2. Review ARCHITECTURE.md for technical details
3. Check DEPLOYMENT.md for setup issues
4. Review FAQ.md for common questions

**Emergency Contact**:
- Contact: System Administrator
- Phone: [Your contact]
- Email: [Your email]
- Status Page: [Your status page]

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| Login Page | http://localhost:3000/sign-in |
| Dashboard | http://localhost:3000/dashboard |
| Buildings | http://localhost:3000/buildings |
| Full Documentation | See INDEX.md |
| User Roles | See GETTING_STARTED.md |

---

**Version**: 1.0  
**Last Updated**: June 2026  
**Status**: Active
