"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Printer, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { VehicleNumberPlate } from "./vehicle-number-plate"

interface Vehicle {
  id: string
  number: string
  arrivalTime: string
  status: "on-time" | "delayed" | "early"
  delay: number
  route: string
  nextStation: string
}

interface VehicleTrackingProps {
  vehicles: Vehicle[]
}

export function VehicleTracking({ vehicles }: VehicleTrackingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePrintData = async () => {
    setIsLoading(true)

    // Simulate API call to backend
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real application, you would send the data to your backend
      const dataToSend = {
        timestamp: new Date().toISOString(),
        vehicles: vehicles,
        totalCount: vehicles.length,
      }

      console.log("Sending data to backend:", dataToSend)

      toast({
        title: "Data Sent Successfully",
        description: `${vehicles.length} vehicle records sent to backend for printing.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send data to backend. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-100 text-green-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      case "early":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Vehicle Tracking</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={handlePrintData}
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary/90"
              size="sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              {isLoading ? "Sending..." : "Print Data"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <VehicleNumberPlate number={vehicle.number} size="lg" />
                <div>
                  <h3 className="font-medium">{vehicle.route}</h3>
                  <p className="text-sm text-gray-600">Next: {vehicle.nextStation}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{vehicle.arrivalTime}</p>
                  {vehicle.delay > 0 && <p className="text-sm text-red-600">+{vehicle.delay}min delay</p>}
                </div>
                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Total Vehicles: {vehicles.length}</span>
            <span className="text-gray-600">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
