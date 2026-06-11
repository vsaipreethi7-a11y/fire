import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getIncidentDetail } from '@/app/actions/incidents'
import IncidentReportForm from '@/components/incident-report-form'

export const metadata = {
  title: 'Incident Report - WB-FDVA',
  description: 'Comprehensive 8-section incident assessment and documentation',
}

export default async function IncidentReportPage({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const { incident, affectedZones } = await getIncidentDetail(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Incident Report - {incident.id}
          </h1>
          <p className="text-slate-400">
            Created: {new Date(incident.createdAt).toLocaleString()}
          </p>
        </div>

        <IncidentReportForm 
          incidentId={incident.id}
          buildingId={incident.buildingId}
          affectedZones={affectedZones}
          user={session.user}
        />
      </div>
    </div>
  )
}
