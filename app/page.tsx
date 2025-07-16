"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MotorWayStats } from "@/components/motor-way-stats"
import { CurrentVehicles } from "@/components/current-vehicles"
import { EntryExitLog } from "@/components/entry-exit-log"
import { TimeAnalytics } from "@/components/time-analytics"
import { RealTimeFeed } from "@/components/real-time-feed"
import { Toaster } from "@/components/ui/toaster"
import { fetchVehicleData, getVehicleStats, type VehicleRecord } from "@/lib/csv-data"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const data = await fetchVehicleData()
        setVehicleData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load vehicle data")
        console.error("Error loading data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading vehicle data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const statsData = getVehicleStats(vehicleData)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <MotorWayStats data={statsData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CurrentVehicles vehicles={vehicleData} />
              </div>
              <div>
                <RealTimeFeed />
              </div>
            </div>
          </div>
        )
      case "vehicles":
        return <CurrentVehicles vehicles={vehicleData} />
      case "entry-tracking":
        return <EntryExitLog vehicles={vehicleData} />
      case "time-analytics":
        return <TimeAnalytics vehicles={vehicleData} />
      case "analytics":
        return <TimeAnalytics vehicles={vehicleData} />
      case "performance":
        return (
          <div className="space-y-6">
            <MotorWayStats data={statsData} />
            <TimeAnalytics vehicles={vehicleData} />
          </div>
        )
      case "reports":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reports & Documentation</h2>
            <p className="text-gray-600">Total Records: {vehicleData.length}</p>
            <p className="text-gray-600">
              Currently on Motor Way: {vehicleData.filter((v) => v.status === "on-motorway").length}
            </p>
            <p className="text-gray-600">Exited: {vehicleData.filter((v) => v.status === "exited").length}</p>
          </div>
        )
      case "alerts":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Alert Management</h2>
            <p className="text-gray-600">Alert management features coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
      <Toaster />
    </div>
  )
}
