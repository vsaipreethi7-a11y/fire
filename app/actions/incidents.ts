'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { incident, incident_zone, zone, sensor } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

/**
 * IFIVA Algorithm: Impact magnitude calculation
 * Formula: Impact Magnitude = (Occupancy × Hazard Level × Distance Factor) / Response Time
 * Where:
 * - Occupancy: Current persons in zone
 * - Hazard Level: 1-5 scale (1=low, 5=critical)
 * - Distance Factor: Based on fire spread proximity
 * - Response Time: Seconds to respond
 */
function calculateIFIVA(
  occupancy: number,
  hazardLevel: number = 3,
  distanceFactor: number = 1.0,
  responseTime: number = 300 // 5 minutes default
): number {
  return Math.round(((occupancy * hazardLevel * distanceFactor) / responseTime) * 100) / 100
}

function getZoneColor(impactMagnitude: number): string {
  if (impactMagnitude <= 1) return '#90EE90' // Green - Low risk
  if (impactMagnitude <= 5) return '#FFD700' // Yellow - Medium risk
  if (impactMagnitude <= 10) return '#FFA500' // Orange - High risk
  return '#FF0000' // Red - Critical risk
}

export async function createIncident(buildingId: string, data: {
  type: string
  severity: string
  description: string
}) {
  const userId = await getUserId()
  const id = nanoid()
  
  const newIncident = await db.insert(incident).values({
    id,
    userId,
    buildingId,
    status: 'active',
    ...data,
    createdAt: new Date(),
  }).returning()
  
  revalidatePath('/dashboard')
  return newIncident[0]
}

export async function triggerSensorAlarm(buildingId: string, sensorId: string) {
  const userId = await getUserId()
  
  // Get sensor details
  const sensorData = await db.query.sensor.findFirst({
    where: and(eq(sensor.id, sensorId), eq(sensor.userId, userId)),
  })
  
  if (!sensorData) throw new Error('Sensor not found')
  
  // Create new incident
  const incidentId = nanoid()
  const newIncident = await db.insert(incident).values({
    id: incidentId,
    userId,
    buildingId,
    type: 'fire_alarm',
    status: 'active',
    severity: 'high',
    description: `Fire alarm triggered by ${sensorData.type} sensor at ${sensorData.location}`,
    createdAt: new Date(),
  }).returning()
  
  // Get the zone with occupancy info
  const zoneData = await db.query.zone.findFirst({
    where: eq(zone.id, sensorData.zoneId),
  })
  
  if (!zoneData) throw new Error('Zone not found')
  
  // Calculate impact magnitude using IFIVA
  const impactMagnitude = calculateIFIVA(
    zoneData.occupancy,
    4, // Hazard level: 4 (high) for detected fire
    1.0, // Distance factor: 1.0 at origin
    60 // Response time: 1 minute (60 seconds)
  )
  
  const zoneColor = getZoneColor(impactMagnitude)
  
  // Create incident zone
  await db.insert(incident_zone).values({
    id: nanoid(),
    userId,
    incidentId,
    zoneId: sensorData.zoneId,
    buildingId,
    sensorTriggered: sensorId,
    detectionTime: new Date(),
    occupancy: zoneData.occupancy,
    impactMagnitude,
    zoneColor,
  })
  
  // Update sensor last triggered time
  await db
    .update(sensor)
    .set({ lastTriggered: new Date() })
    .where(eq(sensor.id, sensorId))
  
  revalidatePath('/dashboard')
  return { incident: newIncident[0], impactMagnitude, zoneColor }
}

export async function updateIncidentZone(
  incidentZoneId: string,
  data: { occupancy?: number; impactMagnitude?: number }
) {
  const userId = await getUserId()
  
  const zoneColor = data.impactMagnitude 
    ? getZoneColor(data.impactMagnitude)
    : undefined
  
  const updated = await db
    .update(incident_zone)
    .set({
      ...data,
      ...(zoneColor && { zoneColor }),
    })
    .where(and(eq(incident_zone.id, incidentZoneId), eq(incident_zone.userId, userId)))
    .returning()
  
  revalidatePath('/dashboard')
  return updated[0]
}

export async function closeIncident(incidentId: string) {
  const userId = await getUserId()
  
  const updated = await db
    .update(incident)
    .set({
      status: 'resolved',
      evacuationEndTime: new Date(),
    })
    .where(and(eq(incident.id, incidentId), eq(incident.userId, userId)))
    .returning()
  
  revalidatePath('/dashboard')
  return updated[0]
}

export async function getActiveIncidents(buildingId: string) {
  const userId = await getUserId()
  
  const incidents = await db.query.incident.findMany({
    where: and(
      eq(incident.buildingId, buildingId),
      eq(incident.userId, userId),
      eq(incident.status, 'active')
    ),
  })
  
  return incidents
}

export async function getIncidentDetail(incidentId: string) {
  const userId = await getUserId()
  
  const incidentData = await db.query.incident.findFirst({
    where: and(eq(incident.id, incidentId), eq(incident.userId, userId)),
  })
  
  if (!incidentData) throw new Error('Incident not found')
  
  const affectedZones = await db.query.incident_zone.findMany({
    where: eq(incident_zone.incidentId, incidentId),
  })
  
  return { incident: incidentData, affectedZones }
}
