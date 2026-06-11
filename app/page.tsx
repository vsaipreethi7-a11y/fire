import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'WB-FDVA - Fire Disaster Vulnerability Assessment',
  description: 'Web-Based Fire Disaster Vulnerability Assessment & Audit System',
}

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/dashboard')
  }

  redirect('/sign-in')
}
