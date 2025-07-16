import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Clock, TrendingUp, AlertTriangle, Users, LogOut } from "lucide-react"

interface MotorWayStatsProps {
  data: {
    currentVehicles: number
    avgSpentTime: string
    totalEntries: number
    totalExits: number
    peakHourEntries: number
    activeAlerts: number
  }
}

export function MotorWayStats({ data }: MotorWayStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Vehicles</CardTitle>
          <Car className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{data.currentVehicles}</div>
          <p className="text-xs text-muted-foreground">On motor way</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Spent Time</CardTitle>
          <Clock className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{data.avgSpentTime}</div>
          <p className="text-xs text-muted-foreground">Average duration</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{data.totalEntries}</div>
          <p className="text-xs text-muted-foreground">Today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Exits</CardTitle>
          <LogOut className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{data.totalExits}</div>
          <p className="text-xs text-muted-foreground">Today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{data.peakHourEntries}</div>
          <p className="text-xs text-muted-foreground">Entries/hour</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{data.activeAlerts}</div>
          <p className="text-xs text-muted-foreground">Requires attention</p>
        </CardContent>
      </Card>
    </div>
  )
}
