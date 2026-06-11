# Simple Admin Account Setup

## Problem
The admin account needs to be created with proper password hashing that Better Auth can verify.

## Solution: Manual Sign-Up (Recommended)

Instead of trying to create the admin account through direct database inserts, we'll use the application's built-in sign-up process which handles password hashing correctly.

### Steps:

1. **Go to Sign-Up Page**
   ```
   http://localhost:3000/sign-up
   ```

2. **Fill in the Admin Account Details:**
   - Name: `Administrator`
   - Email: `admin@admin.com`
   - Password: `ADMIN123`

3. **Click "Create Account"**

4. **You're Now Logged In as Admin**

That's it! The admin account is now created with properly hashed password.

### Then Log In:

1. **Go to Sign-In Page**
   ```
   http://localhost:3000/sign-in
   ```

2. **Enter Admin Credentials:**
   - Email: `admin@admin.com`
   - Password: `ADMIN123`

3. **Click "Sign In"**

4. **Dashboard Loads** - You're now in the application as admin!

---

## Admin Credentials Summary

| Field | Value |
|-------|-------|
| **Email** | admin@admin.com |
| **Password** | ADMIN123 |
| **Role** | admin |

---

## What the Admin Can Do

- View all buildings and zones
- Create new buildings
- Manage all incidents
- View and edit reports
- Create additional user accounts

---

## Notes

- The admin account is created through the standard sign-up process
- Password is automatically hashed with bcrypt by Better Auth
- Session is automatically maintained after login
- No additional configuration needed

