"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Printer, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { VehicleNumberPlate } from "./vehicle-number-plate"
import { Car } from "lucide-react"
import { type VehicleRecord, calculateSpentTime } from "@/lib/csv-data"

interface CurrentVehiclesProps {
  vehicles: VehicleRecord[]
}

export function CurrentVehicles({ vehicles }: CurrentVehiclesProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [vehicleList, setVehicleList] = useState(vehicles)
  const { toast } = useToast()

  useEffect(() => {
    setVehicleList(vehicles)
  }, [vehicles])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      // Update spent time for all vehicles still on motorway
      setVehicleList((prev) =>
        prev.map((vehicle) => ({
          ...vehicle,
          spentTime: vehicle.entryDate ? calculateSpentTime(vehicle.entryDate, vehicle.exitDate) : vehicle.spentTime,
        })),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePrintVehicleData = async (vehicle: VehicleRecord) => {
    setIsLoading(true)
    setSelectedVehicle(vehicle)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Send only the selected vehicle data to backend
      const dataToSend = {
        timestamp: new Date().toISOString(),
        vehicle: {
          plateNumber: vehicle.vehicleNumber,
          entryTime: vehicle.enteringTime,
          spentTime: vehicle.spentTime,
        },
      }

      console.log("Sending vehicle data to backend:", dataToSend)

      toast({
        title: "Vehicle Data Sent Successfully",
        description: `Data for vehicle ${vehicle.vehicleNumber} sent to backend for printing.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send vehicle data to backend. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setSelectedVehicle(null)
    }
  }

  // Filter only vehicles currently on motorway
  const currentVehicles = vehicleList.filter((v) => v.status === "on-motorway")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Car className="w-5 h-5 mr-2 text-primary" />
            Current Vehicles on Motor Way
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentVehicles.map((vehicle, index) => (
            <div
              key={`${vehicle.vehicleNumber}-${index}`}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <VehicleNumberPlate number={vehicle.vehicleNumber} size="lg" />
                <div>
                  <p className="text-sm text-gray-600">Entry Time: {vehicle.enteringTime}</p>
                  {vehicle.entryDate && (
                    <p className="text-sm text-gray-600">Entry Date: {vehicle.entryDate.toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Spent Time</p>
                  <p className="font-medium text-primary text-lg">{vehicle.spentTime}</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">Still on motor way</Badge>
                </div>

                <Button
                  onClick={() => handlePrintVehicleData(vehicle)}
                  disabled={isLoading && selectedVehicle?.vehicleNumber === vehicle.vehicleNumber}
                  className="bg-secondary hover:bg-secondary/90"
                  size="sm"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  {isLoading && selectedVehicle?.vehicleNumber === vehicle.vehicleNumber ? "Sending..." : "Print"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{currentVehicles.length} vehicles currently on motor way</span>
            <span className="text-gray-600">Last updated: {currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
