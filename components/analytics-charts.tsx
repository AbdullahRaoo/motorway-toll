"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid } from "recharts"

const hourlyData = [
  { hour: "06:00", arrivals: 12, delays: 2 },
  { hour: "07:00", arrivals: 25, delays: 5 },
  { hour: "08:00", arrivals: 45, delays: 8 },
  { hour: "09:00", arrivals: 38, delays: 6 },
  { hour: "10:00", arrivals: 22, delays: 3 },
  { hour: "11:00", arrivals: 18, delays: 2 },
  { hour: "12:00", arrivals: 28, delays: 4 },
]

const performanceData = [
  { name: "On Time", value: 78, color: "#10b981" },
  { name: "Delayed", value: 18, color: "#f59e0b" },
  { name: "Early", value: 4, color: "#1e5a5a" },
]

const weeklyTrends = [
  { day: "Mon", onTime: 82, delayed: 15, early: 3 },
  { day: "Tue", onTime: 78, delayed: 18, early: 4 },
  { day: "Wed", onTime: 85, delayed: 12, early: 3 },
  { day: "Thu", onTime: 80, delayed: 16, early: 4 },
  { day: "Fri", onTime: 75, delayed: 20, early: 5 },
  { day: "Sat", onTime: 88, delayed: 10, early: 2 },
  { day: "Sun", onTime: 90, delayed: 8, early: 2 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Hourly Arrivals & Delays</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              arrivals: { label: "Arrivals", color: "#1e5a5a" },
              delays: { label: "Delays", color: "#f59e0b" },
            }}
            className="h-[300px]"
          >
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="arrivals" fill="var(--color-arrivals)" />
              <Bar dataKey="delays" fill="var(--color-delays)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              onTime: { label: "On Time", color: "#10b981" },
              delayed: { label: "Delayed", color: "#f59e0b" },
              early: { label: "Early", color: "#1e5a5a" },
            }}
            className="h-[300px]"
          >
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Weekly Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              onTime: { label: "On Time %", color: "#10b981" },
              delayed: { label: "Delayed %", color: "#f59e0b" },
              early: { label: "Early %", color: "#1e5a5a" },
            }}
            className="h-[300px]"
          >
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="onTime" stroke="var(--color-onTime)" strokeWidth={2} />
              <Line type="monotone" dataKey="delayed" stroke="var(--color-delayed)" strokeWidth={2} />
              <Line type="monotone" dataKey="early" stroke="var(--color-early)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
