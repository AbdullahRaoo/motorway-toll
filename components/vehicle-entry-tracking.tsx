"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogIn, LogOut, Clock, Users, TrendingUp } from "lucide-react"
import { VehicleNumberPlate } from "./vehicle-number-plate"

interface VehicleEntry {
  id: string
  number: string
  entryTime: Date
  exitTime?: Date
  status: "present" | "exited"
  duration?: string
  route: string
}

export function VehicleEntryTracking() {
  const [vehicleEntries, setVehicleEntries] = useState<VehicleEntry[]>([
    {
      id: "1",
      number: "M-2301",
      entryTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "present",
      route: "Blue Line North",
    },
    {
      id: "2",
      number: "M-1205",
      entryTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      exitTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "exited",
      route: "Red Line East",
    },
    {
      id: "3",
      number: "M-3401",
      entryTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      status: "present",
      route: "Green Line South",
    },
    {
      id: "4",
      number: "M-4502",
      entryTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      exitTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "exited",
      route: "Yellow Line West",
    },
    {
      id: "5",
      number: "M-5603",
      entryTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "present",
      route: "Blue Line South",
    },
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Update durations for present vehicles
      setVehicleEntries((prev) =>
        prev.map((vehicle) => {
          if (vehicle.status === "present") {
            const duration = calculateDuration(vehicle.entryTime, currentTime)
            return { ...vehicle, duration }
          }
          return vehicle
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [currentTime])

  const calculateDuration = (entryTime: Date, currentTime: Date) => {
    const diffMs = currentTime.getTime() - entryTime.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getTotalDuration = (entryTime: Date, exitTime: Date) => {
    const diffMs = exitTime.getTime() - entryTime.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const presentVehicles = vehicleEntries.filter((v) => v.status === "present")
  const exitedVehicles = vehicleEntries.filter((v) => v.status === "exited")
  const totalEntries = vehicleEntries.length
  const avgDuration =
    exitedVehicles.length > 0
      ? exitedVehicles.reduce((acc, v) => {
          if (v.exitTime) {
            const duration = v.exitTime.getTime() - v.entryTime.getTime()
            return acc + duration
          }
          return acc
        }, 0) /
        exitedVehicles.length /
        (1000 * 60 * 60) // Convert to hours
      : 0

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-primary">{totalEntries}</p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Currently Present</p>
                <p className="text-2xl font-bold text-green-600">{presentVehicles.length}</p>
              </div>
              <LogIn className="w-8 h-8 text-green-600/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Exited Today</p>
                <p className="text-2xl font-bold text-blue-600">{exitedVehicles.length}</p>
              </div>
              <LogOut className="w-8 h-8 text-blue-600/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-secondary">{avgDuration.toFixed(1)}h</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Entry List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            Vehicle Entry & Exit Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {vehicleEntries.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <VehicleNumberPlate number={vehicle.number} size="md" />
                    <div>
                      <h3 className="font-medium text-gray-900">{vehicle.route}</h3>
                      <p className="text-sm text-gray-600">Entry: {vehicle.entryTime.toLocaleTimeString()}</p>
                      {vehicle.exitTime && (
                        <p className="text-sm text-gray-600">Exit: {vehicle.exitTime.toLocaleTimeString()}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">
                        {vehicle.status === "present"
                          ? vehicle.duration || calculateDuration(vehicle.entryTime, currentTime)
                          : vehicle.exitTime
                            ? getTotalDuration(vehicle.entryTime, vehicle.exitTime)
                            : "N/A"}
                      </p>
                    </div>

                    <Badge
                      className={
                        vehicle.status === "present" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {vehicle.status === "present" ? "Still Present" : "Exited"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Real-time tracking: {presentVehicles.length} vehicles currently in station
              </span>
              <span className="text-gray-600">Last updated: {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
