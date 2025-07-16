"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts"
import type { VehicleRecord } from "@/lib/csv-data"

interface TimeAnalyticsProps {
  vehicles: VehicleRecord[]
}

export function TimeAnalytics({ vehicles }: TimeAnalyticsProps) {
  // Process hourly entry/exit data
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const entries = vehicles.filter((v) => v.entryDate && v.entryDate.getHours() === hour).length
    const exits = vehicles.filter((v) => v.exitDate && v.exitDate.getHours() === hour).length
    return {
      hour: `${hour.toString().padStart(2, "0")}:00`,
      entries,
      exits,
    }
  })

  // Process spent time distribution
  const spentTimeRanges = [
    { range: "0-30min", min: 0, max: 30 },
    { range: "30-60min", min: 30, max: 60 },
    { range: "1-2h", min: 60, max: 120 },
    { range: "2-4h", min: 120, max: 240 },
    { range: "4-6h", min: 240, max: 360 },
    { range: "6h+", min: 360, max: Number.POSITIVE_INFINITY },
  ]

  const spentTimeDistributionData = spentTimeRanges.map((range) => {
    const count = vehicles.filter((v) => {
      if (!v.entryDate) return false
      const endTime = v.exitDate || new Date()
      const spentMinutes = (endTime.getTime() - v.entryDate.getTime()) / (1000 * 60)
      return spentMinutes >= range.min && spentMinutes < range.max
    }).length

    return {
      range: range.range,
      count,
    }
  })

  // Process weekly pattern data
  const weeklyPatternData = Array.from({ length: 7 }, (_, dayIndex) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dayEntries = vehicles.filter((v) => v.entryDate && v.entryDate.getDay() === dayIndex)
    const dayExits = vehicles.filter((v) => v.exitDate && v.exitDate.getDay() === dayIndex)

    // Calculate average spent time for this day
    const avgSpentTime =
      dayExits.length > 0
        ? dayExits.reduce((acc, v) => {
            if (v.entryDate && v.exitDate) {
              return acc + (v.exitDate.getTime() - v.entryDate.getTime()) / (1000 * 60)
            }
            return acc
          }, 0) / dayExits.length
        : 0

    return {
      day: dayNames[dayIndex],
      avgEntries: dayEntries.length,
      avgExits: dayExits.length,
      avgSpentTime: Math.round(avgSpentTime),
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Entry & Exit Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                entries: { label: "Entries", color: "#1e5a5a" },
                exits: { label: "Exits", color: "#f59e0b" },
              }}
              className="h-[300px]"
            >
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="entries"
                  stackId="1"
                  stroke="var(--color-entries)"
                  fill="var(--color-entries)"
                />
                <Area
                  type="monotone"
                  dataKey="exits"
                  stackId="1"
                  stroke="var(--color-exits)"
                  fill="var(--color-exits)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spent Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Vehicles", color: "#1e5a5a" },
              }}
              className="h-[300px]"
            >
              <BarChart data={spentTimeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Traffic Patterns & Average Spent Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              avgEntries: { label: "Entries", color: "#1e5a5a" },
              avgExits: { label: "Exits", color: "#f59e0b" },
              avgSpentTime: { label: "Avg Spent Time (min)", color: "#10b981" },
            }}
            className="h-[300px]"
          >
            <LineChart data={weeklyPatternData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="avgEntries" stroke="var(--color-avgEntries)" strokeWidth={2} />
              <Line type="monotone" dataKey="avgExits" stroke="var(--color-avgExits)" strokeWidth={2} />
              <Line type="monotone" dataKey="avgSpentTime" stroke="var(--color-avgSpentTime)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
