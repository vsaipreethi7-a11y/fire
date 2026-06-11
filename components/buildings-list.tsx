'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { createBuilding } from '@/app/actions/buildings'
import NewBuildingDialog from '@/components/new-building-dialog'

interface Building {
  id: string
  name: string
  address: string
  city: string
  state: string
  type: string
  totalFloors: number
  totalOccupancy: number
}

interface BuildingsListProps {
  buildings: Building[]
  user: any
}

export default function BuildingsList({ buildings, user }: BuildingsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateBuilding = async (data: any) => {
    setIsLoading(true)
    try {
      await createBuilding(data)
      setIsDialogOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="gap-2"
          size="lg"
        >
          <Plus size={20} />
          Add Building
        </Button>
      </div>

      {buildings.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <p className="text-slate-400 mb-4">No buildings yet. Create one to get started.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Create First Building
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building) => (
            <Link key={building.id} href={`/buildings/${building.id}`}>
              <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-white line-clamp-1">{building.name}</CardTitle>
                  <CardDescription className="text-slate-400 line-clamp-2">
                    {building.type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-slate-300">
                      {building.address}
                      <br />
                      {building.city}, {building.state}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500">Floors</p>
                      <p className="text-lg font-semibold text-white">{building.totalFloors}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Capacity</p>
                        <p className="text-lg font-semibold text-white">{building.totalOccupancy}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <NewBuildingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateBuilding}
        isLoading={isLoading}
      />
    </>
  )
}
