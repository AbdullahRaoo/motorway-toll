"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogIn, LogOut, Users, TrendingUp, Activity } from "lucide-react"
import { VehicleNumberPlate } from "./vehicle-number-plate"
import { type VehicleRecord, calculateSpentTime } from "@/lib/csv-data"

interface EntryExitLogProps {
  vehicles: VehicleRecord[]
}

export function EntryExitLog({ vehicles }: EntryExitLogProps) {
  const [vehicleLogs, setVehicleLogs] = useState<VehicleRecord[]>(vehicles)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setVehicleLogs(vehicles)
  }, [vehicles])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Update spent time for vehicles still on motorway
      setVehicleLogs((prev) =>
        prev.map((vehicle) => {
          if (vehicle.status === "on-motorway" && vehicle.entryDate) {
            const spentTime = calculateSpentTime(vehicle.entryDate, null)
            return { ...vehicle, spentTime }
          }
          return vehicle
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const onMotorwayVehicles = vehicleLogs.filter((v) => v.status === "on-motorway")
  const exitedVehicles = vehicleLogs.filter((v) => v.status === "exited")
  const totalEntries = vehicleLogs.length

  // Calculate average spent time for exited vehicles
  const avgSpentTime =
    exitedVehicles.length > 0
      ? exitedVehicles.reduce((acc, v) => {
          if (v.entryDate && v.exitDate) {
            const duration = v.exitDate.getTime() - v.entryDate.getTime()
            return acc + duration
          }
          return acc
        }, 0) /
        exitedVehicles.length /
        (1000 * 60) // Convert to minutes
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
                <p className="text-sm text-gray-600">On Motor Way</p>
                <p className="text-2xl font-bold text-green-600">{onMotorwayVehicles.length}</p>
              </div>
              <LogIn className="w-8 h-8 text-green-600/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Exited</p>
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
                <p className="text-sm text-gray-600">Avg Spent Time</p>
                <p className="text-2xl font-bold text-secondary">{Math.round(avgSpentTime)}min</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Entry/Exit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary" />
            Vehicle Entry & Exit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Vehicles ({totalEntries})</TabsTrigger>
              <TabsTrigger value="on-motorway">On Motor Way ({onMotorwayVehicles.length})</TabsTrigger>
              <TabsTrigger value="exited">Exited ({exitedVehicles.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {vehicleLogs.map((vehicle, index) => (
                    <VehicleLogItem key={`${vehicle.vehicleNumber}-${index}`} vehicle={vehicle} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="on-motorway">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {onMotorwayVehicles.map((vehicle, index) => (
                    <VehicleLogItem key={`${vehicle.vehicleNumber}-${index}`} vehicle={vehicle} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="exited">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {exitedVehicles.map((vehicle, index) => (
                    <VehicleLogItem key={`${vehicle.vehicleNumber}-${index}`} vehicle={vehicle} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Real-time tracking: {onMotorwayVehicles.length} vehicles currently on motor way
              </span>
              <span className="text-gray-600">Last updated: {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function VehicleLogItem({ vehicle }: { vehicle: VehicleRecord }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <VehicleNumberPlate number={vehicle.vehicleNumber} size="md" />
        <div>
          <p className="text-sm text-gray-600">Entry: {vehicle.enteringTime}</p>
          {vehicle.exitTime && vehicle.exitTime !== "" && (
            <p className="text-sm text-gray-600">Exit: {vehicle.exitTime}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">Spent Time</p>
          <p className="font-medium text-primary text-lg">{vehicle.spentTime}</p>
          <p className="text-xs text-gray-500">
            {vehicle.status === "on-motorway" ? "Still on motor way" : "Completed journey"}
          </p>
        </div>

        <Badge
          className={vehicle.status === "on-motorway" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
        >
          {vehicle.status === "on-motorway" ? "On Motor Way" : "Exited"}
        </Badge>
      </div>
    </div>
  )
}
