"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"

const hourlyTrafficData = [
  { hour: "00:00", cars: 45, trucks: 12, motorcycles: 8, buses: 3 },
  { hour: "02:00", cars: 25, trucks: 8, motorcycles: 4, buses: 1 },
  { hour: "04:00", cars: 35, trucks: 15, motorcycles: 6, buses: 2 },
  { hour: "06:00", cars: 120, trucks: 35, motorcycles: 25, buses: 8 },
  { hour: "08:00", cars: 180, trucks: 45, motorcycles: 40, buses: 15 },
  { hour: "10:00", cars: 150, trucks: 40, motorcycles: 30, buses: 12 },
  { hour: "12:00", cars: 160, trucks: 38, motorcycles: 35, buses: 14 },
  { hour: "14:00", cars: 170, trucks: 42, motorcycles: 38, buses: 16 },
  { hour: "16:00", cars: 200, trucks: 50, motorcycles: 45, buses: 18 },
  { hour: "18:00", cars: 220, trucks: 55, motorcycles: 50, buses: 20 },
  { hour: "20:00", cars: 140, trucks: 30, motorcycles: 35, buses: 10 },
  { hour: "22:00", cars: 80, trucks: 20, motorcycles: 18, buses: 6 },
]

const speedDistributionData = [
  { range: "0-60", count: 45 },
  { range: "60-80", count: 120 },
  { range: "80-100", count: 180 },
  { range: "100-120", count: 95 },
  { range: "120+", count: 25 },
]

const spentTimeData = [
  { range: "0-30min", count: 85 },
  { range: "30-60min", count: 120 },
  { range: "1-2h", count: 95 },
  { range: "2-4h", count: 65 },
  { range: "4h+", count: 20 },
]

export function TrafficFlowAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Traffic Flow by Vehicle Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cars: { label: "Cars", color: "#1e5a5a" },
                trucks: { label: "Trucks", color: "#f59e0b" },
                motorcycles: { label: "Motorcycles", color: "#10b981" },
                buses: { label: "Buses", color: "#8b5cf6" },
              }}
              className="h-[300px]"
            >
              <AreaChart data={hourlyTrafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="cars" stackId="1" stroke="var(--color-cars)" fill="var(--color-cars)" />
                <Area
                  type="monotone"
                  dataKey="trucks"
                  stackId="1"
                  stroke="var(--color-trucks)"
                  fill="var(--color-trucks)"
                />
                <Area
                  type="monotone"
                  dataKey="motorcycles"
                  stackId="1"
                  stroke="var(--color-motorcycles)"
                  fill="var(--color-motorcycles)"
                />
                <Area
                  type="monotone"
                  dataKey="buses"
                  stackId="1"
                  stroke="var(--color-buses)"
                  fill="var(--color-buses)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Speed Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Vehicles", color: "#1e5a5a" },
              }}
              className="h-[300px]"
            >
              <BarChart data={speedDistributionData}>
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
          <CardTitle>Vehicle Spent Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: { label: "Vehicles", color: "#f59e0b" },
            }}
            className="h-[300px]"
          >
            <BarChart data={spentTimeData}>
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
  )
}
