import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user, account } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(user)
      .where(eq(user.email, 'admin@admin.com'))
      .limit(1)

    if (existingAdmin.length > 0) {
      return Response.json(
        { message: 'Admin account already exists' },
        { status: 200 }
      )
    }

    // Create admin user via Better Auth
    const result = await auth.api.signUpEmail({
      email: 'admin@admin.com',
      password: 'ADMIN123',
      name: 'Administrator',
    })

    // Update role to admin
    await db
      .update(user)
      .set({ role: 'admin' })
      .where(eq(user.email, 'admin@admin.com'))

    return Response.json(
      {
        message: 'Admin account created successfully',
        credentials: {
          email: 'admin@admin.com',
          password: 'ADMIN123',
          role: 'admin',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin setup error:', error)
    return Response.json(
      {
        error: 'Failed to create admin account',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
