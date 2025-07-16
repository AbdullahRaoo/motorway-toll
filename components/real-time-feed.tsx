"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Train, AlertTriangle, CheckCircle } from "lucide-react"

interface FeedItem {
  id: string
  type: "entered" | "exited"
  message: string
  timestamp: string
  vehicleNumber?: string
  spentTime?: string
}

export function RealTimeFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: "1",
      type: "entered",
      message: "Vehicle ABC-2301 entered the motorway",
      timestamp: new Date().toLocaleTimeString(),
      vehicleNumber: "ABC-2301",
    },
    {
      id: "2",
      type: "exited",
      message: "Vehicle ABC-3401 exited the motorway",
      timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
      vehicleNumber: "ABC-3401",
      spentTime: "2h 15m",
    },
    {
      id: "3",
      type: "entered",
      message: "Vehicle ABC-1205 entered the motorway",
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
      vehicleNumber: "ABC-1205",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const vehicleNumber = `ABC-${Math.floor(Math.random() * 9000) + 1000}`
      const isExit = Math.random() > 0.5
      const spentTimeHours = Math.floor(Math.random() * 5) + 1
      const spentTimeMinutes = Math.floor(Math.random() * 60)
      const spentTime = spentTimeHours > 0 ? `${spentTimeHours}h ${spentTimeMinutes}m` : `${spentTimeMinutes}m`
      
      const newItem: FeedItem = {
        id: Date.now().toString(),
        type: isExit ? "exited" : "entered",
        message: `Vehicle ${vehicleNumber} ${isExit ? "exited the motorway" : "entered the motorway"}`,
        timestamp: new Date().toLocaleTimeString(),
        vehicleNumber,
        ...(isExit && { spentTime }),
      }

      setFeedItems((prev) => [newItem, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "entered":
        return <Train className="w-4 h-4 text-green-600" />
      case "exited":
        return <Train className="w-4 h-4 text-blue-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "entered":
        return "bg-green-100 text-green-800"
      case "exited":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          Real-Time Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {feedItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="mt-1">{getIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.message}</p>
                  {item.spentTime && (
                    <p className="text-xs text-blue-600 font-medium">Spent time: {item.spentTime}</p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                    <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
