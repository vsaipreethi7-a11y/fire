'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { building, floor, zone, sensor } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getBuildings() {
  const userId = await getUserId()
  return db.query.building.findMany({
    where: eq(building.userId, userId),
  })
}

export async function getBuildingDetail(buildingId: string) {
  const userId = await getUserId()
  const bldg = await db.query.building.findFirst({
    where: and(eq(building.id, buildingId), eq(building.userId, userId)),
  })
  
  if (!bldg) throw new Error('Building not found')
  
  const floors = await db.query.floor.findMany({
    where: eq(floor.buildingId, buildingId),
  })
  
  const zones = await db.query.zone.findMany({
    where: eq(zone.buildingId, buildingId),
  })
  
  const sensors = await db.query.sensor.findMany({
    where: eq(sensor.buildingId, buildingId),
  })
  
  return { building: bldg, floors, zones, sensors }
}

export async function createBuilding(data: {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  type: string
  totalFloors: number
  totalOccupancy: number
}) {
  const userId = await getUserId()
  const id = nanoid()
  
  const newBuilding = await db.insert(building).values({
    id,
    userId,
    ...data,
  }).returning()
  
  revalidatePath('/dashboard')
  return newBuilding[0]
}

export async function updateBuilding(
  buildingId: string,
  data: Partial<typeof building.$inferInsert>
) {
  const userId = await getUserId()
  
  const updated = await db
    .update(building)
    .set(data)
    .where(and(eq(building.id, buildingId), eq(building.userId, userId)))
    .returning()
  
  revalidatePath('/dashboard')
  return updated[0]
}

export async function createFloor(buildingId: string, data: {
  floorNumber: number
  name: string
  area?: number
}) {
  const userId = await getUserId()
  const id = nanoid()
  
  const newFloor = await db.insert(floor).values({
    id,
    userId,
    buildingId,
    ...data,
  }).returning()
  
  revalidatePath('/dashboard')
  return newFloor[0]
}

export async function createZone(buildingId: string, floorId: string, data: {
  name: string
  description?: string
  x?: number
  y?: number
  width?: number
  height?: number
  occupancy?: number
}) {
  const userId = await getUserId()
  const id = nanoid()
  
  const newZone = await db.insert(zone).values({
    id,
    userId,
    buildingId,
    floorId,
    ...data,
  }).returning()
  
  revalidatePath('/dashboard')
  return newZone[0]
}

export async function createSensor(buildingId: string, zoneId: string, data: {
  type: string
  name: string
  location?: string
  status?: string
}) {
  const userId = await getUserId()
  const id = nanoid()
  
  const newSensor = await db.insert(sensor).values({
    id,
    userId,
    buildingId,
    zoneId,
    ...data,
  }).returning()
  
  revalidatePath('/dashboard')
  return newSensor[0]
}
