import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getBuildings } from '@/app/actions/buildings'
import BuildingsList from '@/components/buildings-list'

export const metadata = {
  title: 'Buildings - WB-FDVA',
  description: 'Manage buildings and infrastructure',
}

export default async function BuildingsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const buildings = await getBuildings()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Buildings</h1>
        <p className="text-slate-400 mb-8">Manage your facility infrastructure</p>
        
        <BuildingsList buildings={buildings} user={session.user} />
      </div>
    </div>
  )
}
