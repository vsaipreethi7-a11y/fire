import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  console.log('Running migration...');
  const sql = fs.readFileSync(path.join(__dirname, '../drizzle/0000_same_thor_girl.sql'), 'utf-8');
  await pool.query(sql);
  console.log('Migration successful!');
  process.exit(0);
}

migrate().catch(console.error);
