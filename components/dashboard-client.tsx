'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Flame, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

interface Zone {
  id: string
  name: string
  occupancy: number
  x: number
  y: number
  width: number
  height: number
}

interface IncidentZone {
  id: string
  zoneId: string
  occupancy: number
  impactMagnitude: number
  zoneColor: string
  detectionTime: string
}

interface Incident {
  id: string
  severity: string
  status: string
  totalImpactMagnitude: number
  createdAt: string
}

interface Building {
  id: string
  name: string
  address: string
  city: string
  state: string
}

interface DashboardClientProps {
  user: any
  building: Building
  floors: any[]
  zones: Zone[]
  sensors: any[]
  incidents: Incident[]
}

export default function DashboardClient({
  user,
  building,
  zones,
  incidents,
}: DashboardClientProps) {
  const router = useRouter()
  const [activeIncidents, setActiveIncidents] = useState<Incident[]>(incidents)
  const [incidentZones, setIncidentZones] = useState<IncidentZone[]>([])

  useEffect(() => {
    // Simulate real-time updates - in production this would use WebSockets
    const interval = setInterval(() => {
      // Poll for updates
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/sign-in')
  }

  // Sort incident zones by impact magnitude (highest first)
  const sortedZones = [...incidentZones].sort(
    (a, b) => b.impactMagnitude - a.impactMagnitude
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">WB-FDVA Dashboard</h1>
            <p className="text-slate-400">
              {building.name} • {building.city}, {building.state}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-400">Logged in as</p>
              <p className="font-semibold text-white">{user.name || user.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        {/* Active Incidents Alert */}
        {activeIncidents.length > 0 && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-200">Active Incidents</h3>
              <p className="text-red-300/80">
                {activeIncidents.length} incident(s) detected - Evacuation in progress
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Floor Plan */}
          <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Flame className="text-orange-500" size={20} />
                Floor Plan - Live View
              </CardTitle>
              <CardDescription>Real-time zone status and impact visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <svg
                viewBox="0 0 1000 600"
                className="w-full border border-slate-600 rounded-lg bg-slate-900"
              >
                {/* Draw zones */}
                {zones.map((zone) => {
                  const zoneIncident = incidentZones.find((iz) => iz.zoneId === zone.id)
                  const color = zoneIncident?.zoneColor || '#E2E8F0'

                  return (
                    <g key={zone.id}>
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height}
                        fill={color}
                        fillOpacity="0.6"
                        stroke="#94A3B8"
                        strokeWidth="2"
                      />
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold"
                        fill="#0F172A"
                      >
                        {zone.name}
                      </text>
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 + 20}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs"
                        fill="#0F172A"
                      >
                        {zone.occupancy} persons
                      </text>
                      {zoneIncident && (
                        <text
                          x={zone.x + zone.width / 2}
                          y={zone.y + zone.height / 2 + 40}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-bold"
                          fill="#EF4444"
                        >
                          Impact: {zoneIncident.impactMagnitude.toFixed(1)}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-slate-300">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded" />
                  <span className="text-slate-300">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded" />
                  <span className="text-slate-300">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-slate-300">Critical</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Triage Table */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Triage Priority</CardTitle>
              <CardDescription>
                Sorted by impact magnitude (highest first)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedZones.length === 0 ? (
                <p className="text-slate-400 text-sm">No active incident zones</p>
              ) : (
                <div className="space-y-2">
                  {sortedZones.slice(0, 8).map((zone, idx) => (
                    <div
                      key={zone.id}
                      className="p-3 rounded-lg border"
                      style={{
                        borderColor: zone.zoneColor,
                        backgroundColor: zone.zoneColor + '20',
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-white">
                            {idx + 1}. Zone {zone.id}
                          </p>
                          <p className="text-xs text-slate-300">
                            Occupancy: {zone.occupancy}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm" style={{ color: zone.zoneColor }}>
                            {zone.impactMagnitude.toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-400">magnitude</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Zones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{zones.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Active Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-400">{activeIncidents.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                At Risk (Occupancy)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-400">
                {zones.reduce((sum, z) => sum + (z.occupancy || 0), 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Sensors Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">Active</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
