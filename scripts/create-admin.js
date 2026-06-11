const crypto = require('crypto');

// This script creates the admin user credentials
// Admin Email: ADMIN
// Admin Password: ADMIN123

// Hash password using bcrypt-like algorithm
async function hashPassword(password) {
  const saltRounds = 10;
  const bcrypt = require('bcrypt');
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  try {
    const bcrypt = require('bcrypt');
    const password = 'ADMIN123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('\n=== WB-FDVA Admin Account Setup ===\n');
    console.log('Credentials:');
    console.log('Email/Username: ADMIN');
    console.log('Password: ADMIN123');
    console.log('\nHashed Password for Database:');
    console.log(hashedPassword);
    console.log('\n=== Use these credentials to login ===\n');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
