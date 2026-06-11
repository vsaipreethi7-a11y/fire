import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getBuildings, getBuildingDetail } from '@/app/actions/buildings'
import { getActiveIncidents } from '@/app/actions/incidents'
import DashboardClient from '@/components/dashboard-client'

export const metadata = {
  title: 'WB-FDVA Dashboard',
  description: 'Fire Disaster Vulnerability Assessment Dashboard',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const buildings = await getBuildings()
  
  if (buildings.length === 0) {
    redirect('/buildings/new')
  }
  
  const primaryBuilding = buildings[0]
  const { building: bldg, floors, zones, sensors } = await getBuildingDetail(primaryBuilding.id)
  const activeIncidents = await getActiveIncidents(primaryBuilding.id)
  
  return (
    <DashboardClient 
      user={session.user}
      building={bldg}
      floors={floors}
      zones={zones}
      sensors={sensors}
      incidents={activeIncidents}
    />
  )
}
