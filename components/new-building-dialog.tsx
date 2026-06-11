'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface NewBuildingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => Promise<void>
  isLoading: boolean
}

const BUILDING_TYPES = [
  'Office',
  'Hospital',
  'School',
  'Residential',
  'Commercial',
  'Industrial',
  'Government',
  'Other',
]

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

export default function NewBuildingDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: NewBuildingDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    type: 'Office',
    totalFloors: '1',
    totalOccupancy: '100',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      ...formData,
      totalFloors: parseInt(formData.totalFloors),
      totalOccupancy: parseInt(formData.totalOccupancy),
    })
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      type: 'Office',
      totalFloors: '1',
      totalOccupancy: '100',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Building</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter building information to create a new facility
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-slate-300">
              Building Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Downtown Hospital"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-slate-300">
              Building Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {BUILDING_TYPES.map((type) => (
                  <SelectItem key={type} value={type} className="text-white">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address" className="text-slate-300">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main Street"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-slate-300">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-slate-300">
                State
              </Label>
              <Select value={formData.state} onValueChange={(value) => handleSelectChange('state', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {STATES.map((state) => (
                    <SelectItem key={state} value={state} className="text-white">
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="zipCode" className="text-slate-300">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="10001"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalFloors" className="text-slate-300">
                Total Floors
              </Label>
              <Input
                id="totalFloors"
                name="totalFloors"
                type="number"
                min="1"
                value={formData.totalFloors}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <Label htmlFor="totalOccupancy" className="text-slate-300">
                Total Capacity
              </Label>
              <Input
                id="totalOccupancy"
                name="totalOccupancy"
                type="number"
                min="1"
                value={formData.totalOccupancy}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gap-2" disabled={isLoading}>
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              Create Building
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
