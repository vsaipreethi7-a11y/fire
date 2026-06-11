import { Pool } from 'pg'
import { nanoid } from 'nanoid'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function seed() {
  console.log('🌱 Starting database seed...')

  try {
    // Create demo user
    const userId = nanoid()
    const demoPassword = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZS43G' // hashed demo

    await pool.query(
      `INSERT INTO "user" (id, email, "emailVerified", name, role, "createdAt", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT DO NOTHING`,
      [userId, 'demo@example.com', true, 'Demo Fire Chief', 'fire_chief']
    )

    // Create demo building (Office)
    const officeId = nanoid()
    await pool.query(
      `INSERT INTO building (id, "userId", name, address, city, state, "zipCode", type, "totalFloors", "totalOccupancy", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
       ON CONFLICT DO NOTHING`,
      [
        officeId,
        userId,
        'Downtown Tech Office',
        '123 Main Street',
        'San Francisco',
        'CA',
        '94102',
        'Office',
        5,
        500,
      ]
    )

    // Create demo building (Hospital)
    const hospitalId = nanoid()
    await pool.query(
      `INSERT INTO building (id, "userId", name, address, city, state, "zipCode", type, "totalFloors", "totalOccupancy", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
       ON CONFLICT DO NOTHING`,
      [
        hospitalId,
        userId,
        'Metro City Hospital',
        '456 Hospital Ave',
        'Los Angeles',
        'CA',
        '90001',
        'Hospital',
        8,
        800,
      ]
    )

    // Create floors for office
    const officeFloors = []
    for (let i = 1; i <= 5; i++) {
      const floorId = nanoid()
      officeFloors.push(floorId)
      await pool.query(
        `INSERT INTO floor (id, "userId", "buildingId", "floorNumber", name, area, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
         ON CONFLICT DO NOTHING`,
        [floorId, userId, officeId, i, `Floor ${i}`, 5000]
      )
    }

    // Create zones for office floors
    const officeZones = []
    const zoneNames = [
      'Conference Room A',
      'Conference Room B',
      'Open Workspace',
      'Server Room',
      'Break Room',
    ]
    for (let floorIdx = 0; floorIdx < officeFloors.length; floorIdx++) {
      for (let zoneIdx = 0; zoneIdx < 5; zoneIdx++) {
        const zoneId = nanoid()
        officeZones.push({ id: zoneId, buildingId: officeId })

        await pool.query(
          `INSERT INTO zone (id, "userId", "floorId", "buildingId", name, description, x, y, width, height, occupancy, "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
           ON CONFLICT DO NOTHING`,
          [
            zoneId,
            userId,
            officeFloors[floorIdx],
            officeId,
            `${zoneNames[zoneIdx]} - Floor ${floorIdx + 1}`,
            `Zone for ${zoneNames[zoneIdx]}`,
            zoneIdx * 150,
            floorIdx * 100,
            120,
            80,
            20 + Math.floor(Math.random() * 30),
          ]
        )
      }
    }

    // Create sensors for office
    const sensorTypes = ['smoke_detector', 'heat_sensor', 'motion_sensor', 'door_sensor']
    for (const zone of officeZones.slice(0, 10)) {
      for (let i = 0; i < 3; i++) {
        const sensorId = nanoid()
        const sensorType = sensorTypes[i % sensorTypes.length]

        await pool.query(
          `INSERT INTO sensor (id, "userId", "buildingId", "zoneId", type, name, location, status, "lastTriggered", "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
           ON CONFLICT DO NOTHING`,
          [
            sensorId,
            userId,
            officeId,
            zone.id,
            sensorType,
            `${sensorType.replace(/_/g, ' ')} #${i + 1}`,
            `${sensorType} near zone ${zone.id}`,
            'active',
            null,
          ]
        )
      }
    }

    // Create demo persons (occupants)
    const departmentNames = ['Engineering', 'Sales', 'HR', 'Finance', 'Operations']
    for (let i = 0; i < 50; i++) {
      const personId = nanoid()
      const dept = departmentNames[i % departmentNames.length]

      await pool.query(
        `INSERT INTO person (id, "userId", "buildingId", name, role, department, phone, email, "isDisabled", "mobilityLevel", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
         ON CONFLICT DO NOTHING`,
        [
          personId,
          userId,
          officeId,
          `Employee ${i + 1}`,
          'Staff',
          dept,
          `555-000${String(i).padStart(4, '0')}`,
          `employee${i + 1}@company.com`,
          Math.random() < 0.05,
          Math.random() < 0.05 ? 'limited' : 'normal',
        ]
      )
    }

    console.log('✅ Seed completed successfully!')
    console.log('📝 Demo credentials:')
    console.log('   Email: demo@example.com')
    console.log('   Password: (use sign-up or auth system)')
    console.log('🏢 Created 2 buildings with zones, sensors, and occupants')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

seed()
