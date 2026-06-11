import { createHash } from 'crypto'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function setupAdmin() {
  try {
    const client = await pool.connect()
    
    // Generate a simple hash for testing
    const password = 'ADMIN123'
    const hash = createHash('sha256').update(password).digest('hex')
    
    console.log('Generated hash:', hash)
    
    // Check if admin exists
    const checkResult = await client.query(
      'SELECT id FROM "user" WHERE email = $1',
      ['admin@admin.com']
    )
    
    if (checkResult.rows.length > 0) {
      console.log('Admin user already exists')
      client.release()
      return
    }
    
    // Create admin user
    const userId = 'admin-' + Date.now()
    const userResult = await client.query(
      `INSERT INTO "user" (id, email, name, role, emailVerified, createdAt, updatedAt)
       VALUES ($1, $2, $3, $4, $5, now(), now())
       RETURNING id`,
      [userId, 'admin@admin.com', 'Administrator', 'admin', true]
    )
    
    console.log('Admin user created:', userResult.rows[0])
    
    // Now use Better Auth signUp to properly create the account
    console.log('\nIMPORTANT: Please sign up using the web interface:')
    console.log('1. Go to http://localhost:3000/sign-up')
    console.log('2. Use these credentials to create account:')
    console.log('   Name: Administrator')
    console.log('   Email: admin@admin.com')
    console.log('   Password: ADMIN123')
    console.log('3. This will create the account with proper password hashing')
    
    client.release()
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await pool.end()
  }
}

setupAdmin()
