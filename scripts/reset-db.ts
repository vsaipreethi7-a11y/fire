import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function reset() {
  console.log('Dropping tables...');
  await pool.query(`
    DROP TABLE IF EXISTS responder_assignment CASCADE;
    DROP TABLE IF EXISTS incident_report CASCADE;
    DROP TABLE IF EXISTS incident_zone CASCADE;
    DROP TABLE IF EXISTS incident CASCADE;
    DROP TABLE IF EXISTS occupancy_schedule CASCADE;
    DROP TABLE IF EXISTS person CASCADE;
    DROP TABLE IF EXISTS sensor CASCADE;
    DROP TABLE IF EXISTS zone CASCADE;
    DROP TABLE IF EXISTS floor CASCADE;
    DROP TABLE IF EXISTS building CASCADE;
    DROP TABLE IF EXISTS verification CASCADE;
    DROP TABLE IF EXISTS account CASCADE;
    DROP TABLE IF EXISTS session CASCADE;
    DROP TABLE IF EXISTS "user" CASCADE;
  `);
  console.log('Tables dropped!');
  process.exit(0);
}

reset().catch(console.error);
