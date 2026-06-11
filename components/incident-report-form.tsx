'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Download, Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface IncidentReportFormProps {
  incidentId: string
  buildingId: string
  affectedZones: any[]
  user: any
}

const SECTIONS = [
  { id: 'a', title: 'Incident Details', description: 'Date, time, location, detection method' },
  { id: 'b', title: 'Building Information', description: 'Structure, year built, fire protection systems' },
  { id: 'c', title: 'Fire Characteristics', description: 'Fire type, area, smoke, flame height' },
  { id: 'd', title: 'Occupancy Information', description: 'Number of persons, mobility status, evacuation time' },
  { id: 'e', title: 'Resource Response', description: 'Fire trucks, firefighters, response time, water supply' },
  { id: 'f', title: 'Actions Taken', description: 'Evacuation, alarms, sprinklers, ventilation' },
  { id: 'g', title: 'Outcome', description: 'Injuries, fatalities, property/content damage' },
  { id: 'h', title: 'Post-Incident', description: 'Root cause, prevention recommendations, investigation notes' },
]

export default function IncidentReportForm({
  incidentId,
  buildingId,
  affectedZones,
  user,
}: IncidentReportFormProps) {
  const [activeTab, setActiveTab] = useState('a')
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    // Section A
    dateTime: new Date().toISOString().slice(0, 16),
    location: affectedZones[0]?.zoneId || '',
    detectionMethod: 'Smoke Detector',
    firstResponder: user.name || user.email,
    // Section B
    buildingType: '',
    yearBuilt: new Date().getFullYear().toString(),
    floorArea: '',
    sprinklerSystem: false,
    // Section C
    fireType: 'Structure Fire',
    estimatedArea: '',
    smokeDensity: 'Heavy',
    flameHeight: 'High',
    // Section D
    totalPersons: affectedZones.reduce((sum: number, z: any) => sum + (z.occupancy || 0), 0).toString(),
    mobilityImpaired: '0',
    evacuationTime: '15',
    shelteringInPlace: false,
    // Section E
    firetrucksDispatched: '5',
    firefightersDeployed: '20',
    responseTime: '5',
    waterSupply: 'Hydrant - On-site',
    // Section F
    evacuationExecuted: true,
    alarmActivated: true,
    sprinklersActivated: true,
    ventilationControl: 'Activated',
    // Section G
    injuriesCount: '0',
    fatalitiesCount: '0',
    propertyDamageEstimate: '0',
    contentDamageEstimate: '0',
    // Section H
    rootCause: '',
    recommendedPrevention: '',
    investigationNotes: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: val }))
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      // In production, this would call an API endpoint that generates a PDF
      alert('PDF generation would be implemented with Puppeteer or similar library')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-8 gap-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`py-2 px-3 rounded text-sm font-semibold transition-colors ${
                  activeTab === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {section.id.toUpperCase()}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        {SECTIONS.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Section {section.id.toUpperCase()}: {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.id === 'a' && (
                  <>
                    <div>
                      <Label htmlFor="dateTime" className="text-slate-300">
                        Date & Time
                      </Label>
                      <Input
                        id="dateTime"
                        name="dateTime"
                        type="datetime-local"
                        value={formData.dateTime}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-slate-300">
                        Location/Zone
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="detectionMethod" className="text-slate-300">
                        Detection Method
                      </Label>
                      <Input
                        id="detectionMethod"
                        name="detectionMethod"
                        value={formData.detectionMethod}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="firstResponder" className="text-slate-300">
                        First Responder
                      </Label>
                      <Input
                        id="firstResponder"
                        name="firstResponder"
                        value={formData.firstResponder}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </>
                )}

                {section.id === 'b' && (
                  <>
                    <div>
                      <Label htmlFor="buildingType" className="text-slate-300">
                        Building Type
                      </Label>
                      <Input
                        id="buildingType"
                        name="buildingType"
                        value={formData.buildingType}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearBuilt" className="text-slate-300">
                        Year Built
                      </Label>
                      <Input
                        id="yearBuilt"
                        name="yearBuilt"
                        type="number"
                        value={formData.yearBuilt}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="floorArea" className="text-slate-300">
                        Floor Area (sq ft)
                      </Label>
                      <Input
                        id="floorArea"
                        name="floorArea"
                        type="number"
                        value={formData.floorArea}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="sprinklerSystem"
                        name="sprinklerSystem"
                        checked={formData.sprinklerSystem}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="sprinklerSystem" className="text-slate-300 cursor-pointer">
                        Sprinkler System Present
                      </Label>
                    </div>
                  </>
                )}

                {section.id === 'c' && (
                  <>
                    <div>
                      <Label htmlFor="fireType" className="text-slate-300">
                        Fire Type
                      </Label>
                      <Input
                        id="fireType"
                        name="fireType"
                        value={formData.fireType}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedArea" className="text-slate-300">
                        Estimated Area (sq ft)
                      </Label>
                      <Input
                        id="estimatedArea"
                        name="estimatedArea"
                        type="number"
                        value={formData.estimatedArea}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smokeDensity" className="text-slate-300">
                        Smoke Density
                      </Label>
                      <Input
                        id="smokeDensity"
                        name="smokeDensity"
                        value={formData.smokeDensity}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="flameHeight" className="text-slate-300">
                        Flame Height
                      </Label>
                      <Input
                        id="flameHeight"
                        name="flameHeight"
                        value={formData.flameHeight}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </>
                )}

                {section.id === 'd' && (
                  <>
                    <div>
                      <Label htmlFor="totalPersons" className="text-slate-300">
                        Total Persons in Building
                      </Label>
                      <Input
                        id="totalPersons"
                        name="totalPersons"
                        type="number"
                        value={formData.totalPersons}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobilityImpaired" className="text-slate-300">
                        Mobility Impaired
                      </Label>
                      <Input
                        id="mobilityImpaired"
                        name="mobilityImpaired"
                        type="number"
                        value={formData.mobilityImpaired}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="evacuationTime" className="text-slate-300">
                        Evacuation Time (minutes)
                      </Label>
                      <Input
                        id="evacuationTime"
                        name="evacuationTime"
                        type="number"
                        value={formData.evacuationTime}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="shelteringInPlace"
                        name="shelteringInPlace"
                        checked={formData.shelteringInPlace}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="shelteringInPlace" className="text-slate-300 cursor-pointer">
                        Sheltering In Place
                      </Label>
                    </div>
                  </>
                )}

                {section.id === 'e' && (
                  <>
                    <div>
                      <Label htmlFor="firetrucksDispatched" className="text-slate-300">
                        Fire Trucks Dispatched
                      </Label>
                      <Input
                        id="firetrucksDispatched"
                        name="firetrucksDispatched"
                        type="number"
                        value={formData.firetrucksDispatched}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="firefightersDeployed" className="text-slate-300">
                        Firefighters Deployed
                      </Label>
                      <Input
                        id="firefightersDeployed"
                        name="firefightersDeployed"
                        type="number"
                        value={formData.firefightersDeployed}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="responseTime" className="text-slate-300">
                        Response Time (minutes)
                      </Label>
                      <Input
                        id="responseTime"
                        name="responseTime"
                        type="number"
                        value={formData.responseTime}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waterSupply" className="text-slate-300">
                        Water Supply Source
                      </Label>
                      <Input
                        id="waterSupply"
                        name="waterSupply"
                        value={formData.waterSupply}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </>
                )}

                {section.id === 'f' && (
                  <>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="evacuationExecuted"
                        name="evacuationExecuted"
                        checked={formData.evacuationExecuted}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="evacuationExecuted" className="text-slate-300 cursor-pointer">
                        Evacuation Executed
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="alarmActivated"
                        name="alarmActivated"
                        checked={formData.alarmActivated}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="alarmActivated" className="text-slate-300 cursor-pointer">
                        Fire Alarm Activated
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="sprinklersActivated"
                        name="sprinklersActivated"
                        checked={formData.sprinklersActivated}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="sprinklersActivated" className="text-slate-300 cursor-pointer">
                        Sprinklers Activated
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor="ventilationControl" className="text-slate-300">
                        Ventilation Control
                      </Label>
                      <Input
                        id="ventilationControl"
                        name="ventilationControl"
                        value={formData.ventilationControl}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </>
                )}

                {section.id === 'g' && (
                  <>
                    <div>
                      <Label htmlFor="injuriesCount" className="text-slate-300">
                        Number of Injuries
                      </Label>
                      <Input
                        id="injuriesCount"
                        name="injuriesCount"
                        type="number"
                        value={formData.injuriesCount}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fatalitiesCount" className="text-slate-300">
                        Number of Fatalities
                      </Label>
                      <Input
                        id="fatalitiesCount"
                        name="fatalitiesCount"
                        type="number"
                        value={formData.fatalitiesCount}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyDamageEstimate" className="text-slate-300">
                        Property Damage Estimate ($)
                      </Label>
                      <Input
                        id="propertyDamageEstimate"
                        name="propertyDamageEstimate"
                        type="number"
                        value={formData.propertyDamageEstimate}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contentDamageEstimate" className="text-slate-300">
                        Content Damage Estimate ($)
                      </Label>
                      <Input
                        id="contentDamageEstimate"
                        name="contentDamageEstimate"
                        type="number"
                        value={formData.contentDamageEstimate}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </>
                )}

                {section.id === 'h' && (
                  <>
                    <div>
                      <Label htmlFor="rootCause" className="text-slate-300">
                        Root Cause Analysis
                      </Label>
                      <Textarea
                        id="rootCause"
                        name="rootCause"
                        value={formData.rootCause}
                        onChange={handleInputChange}
                        placeholder="Describe the root cause of the incident"
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="recommendedPrevention" className="text-slate-300">
                        Recommended Prevention Measures
                      </Label>
                      <Textarea
                        id="recommendedPrevention"
                        name="recommendedPrevention"
                        value={formData.recommendedPrevention}
                        onChange={handleInputChange}
                        placeholder="List preventive measures to avoid similar incidents"
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="investigationNotes" className="text-slate-300">
                        Investigation Notes
                      </Label>
                      <Textarea
                        id="investigationNotes"
                        name="investigationNotes"
                        value={formData.investigationNotes}
                        onChange={handleInputChange}
                        placeholder="Additional investigation findings and notes"
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="gap-2"
        >
          Back
        </Button>
        <Button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          {isGenerating && <Loader2 size={16} className="animate-spin" />}
          <Download size={16} />
          Generate PDF Report
        </Button>
      </div>
    </div>
  )
}
