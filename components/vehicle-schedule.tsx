"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Plus, Settings } from "lucide-react"
import { VehicleNumberPlate } from "./vehicle-number-plate"

interface ScheduledVehicle {
  id: string
  number: string
  scheduledTime: string
  actualTime?: string
  status: "scheduled" | "arrived" | "delayed" | "cancelled"
  route: string
  platform: number
  delay?: number
}

export function VehicleSchedule() {
  const [scheduleData, setScheduleData] = useState<ScheduledVehicle[]>([
    {
      id: "1",
      number: "M-2301",
      scheduledTime: "14:30",
      actualTime: "14:25",
      status: "arrived",
      route: "Blue Line North",
      platform: 2,
    },
    {
      id: "2",
      number: "M-1205",
      scheduledTime: "14:35",
      status: "delayed",
      route: "Red Line East",
      platform: 1,
      delay: 5,
    },
    {
      id: "3",
      number: "M-3401",
      scheduledTime: "14:40",
      status: "scheduled",
      route: "Green Line South",
      platform: 3,
    },
    {
      id: "4",
      number: "M-4502",
      scheduledTime: "14:45",
      status: "scheduled",
      route: "Yellow Line West",
      platform: 4,
    },
    {
      id: "5",
      number: "M-5603",
      scheduledTime: "14:50",
      status: "scheduled",
      route: "Blue Line South",
      platform: 2,
    },
    {
      id: "6",
      number: "M-6704",
      scheduledTime: "14:55",
      status: "scheduled",
      route: "Red Line West",
      platform: 1,
    },
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "arrived":
        return "bg-green-100 text-green-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "arrived":
        return "✓"
      case "delayed":
        return "⚠"
      case "scheduled":
        return "⏱"
      case "cancelled":
        return "✕"
      default:
        return "?"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Vehicle Arrival Schedule
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">Current Time: {currentTime.toLocaleTimeString()}</div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {scheduleData.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <VehicleNumberPlate number={vehicle.number} size="md" />
                    <div>
                      <h3 className="font-medium text-gray-900">{vehicle.route}</h3>
                      <p className="text-sm text-gray-600">Platform {vehicle.platform}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Scheduled</p>
                      <p className="font-medium">{vehicle.scheduledTime}</p>
                    </div>

                    {vehicle.actualTime && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Actual</p>
                        <p className="font-medium text-green-600">{vehicle.actualTime}</p>
                      </div>
                    )}

                    {vehicle.delay && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Delay</p>
                        <p className="font-medium text-red-600">+{vehicle.delay}min</p>
                      </div>
                    )}

                    <Badge className={`${getStatusColor(vehicle.status)} flex items-center space-x-1`}>
                      <span>{getStatusIcon(vehicle.status)}</span>
                      <span>{vehicle.status}</span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {scheduleData.filter((v) => v.status === "arrived").length}
              </p>
              <p className="text-xs text-gray-600">Arrived</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {scheduleData.filter((v) => v.status === "scheduled").length}
              </p>
              <p className="text-xs text-gray-600">Scheduled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {scheduleData.filter((v) => v.status === "delayed").length}
              </p>
              <p className="text-xs text-gray-600">Delayed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {scheduleData.filter((v) => v.status === "cancelled").length}
              </p>
              <p className="text-xs text-gray-600">Cancelled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
