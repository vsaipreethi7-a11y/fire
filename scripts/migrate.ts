import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  console.log('Running migration...');
  const drizzleDir = path.join(__dirname, '../drizzle');
  const files = fs.readdirSync(drizzleDir);
  const sqlFile = files.find(f => f.endsWith('.sql'));
  if (!sqlFile) throw new Error('No .sql migration file found in drizzle directory');
  const sql = fs.readFileSync(path.join(drizzleDir, sqlFile), 'utf-8');
  await pool.query(sql);
  console.log('Migration successful!');
  process.exit(0);
}

migrate().catch(console.error);
