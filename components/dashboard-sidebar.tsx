"use client"

import { BarChart3, Car, TrendingUp, FileText, Home, AlertTriangle, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "vehicles", label: "Current Vehicles", icon: Car },
  { id: "entry-tracking", label: "Entry/Exit Log", icon: Users },
  { id: "time-analytics", label: "Time Analytics", icon: Clock },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "alerts", label: "Alerts", icon: AlertTriangle },
]

export function DashboardSidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-primary text-white min-h-screen flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">Motor Way Control</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-white/10",
                  activeTab === item.id && "bg-white/20",
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
